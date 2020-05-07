require 'sqlite3'
require 'singleton'
require 'active_support/inflector'
require 'byebug'

class QuestionsDBConnection < SQLite3::Database
    include Singleton

    def initialize
        super('questions.db')
        self.type_translation = true
        self.results_as_hash = true
    end

end

class ModelBase

    def self.find_by_id(id)
        result_array = QuestionsDBConnection.instance.execute(<<-SQL, id)
            SELECT
                *
            FROM
                #{self.to_s.tableize}
            WHERE
                id = ?
        SQL
        return nil if result_array.length == 0
        self.new(result_array.first)
    end

    def self.all
        result_array = QuestionsDBConnection.instance.execute(<<-SQL)
            SELECT
                *
            FROM
                #{self.to_s.tableize}
            SQL
        return nil if result_array.length == 0
        result_array.map { |datum| self.new(datum) }      
    end

    def save
        variable_arr = self.instance_variables
        if self.id
            set_string = ""
            variable_arr.each_with_index do |symbol, idx|
                debugger
                variable_name = symbol.to_s[1..-1]
                set_string += variable_name + " = " + self.variable_name.to_s
                set_string += "," unless idx == variable_arr.length - 1
            end
            QuestionsDBConnection.instance.execute(<<-SQL, self.id)
                UPDATE
                    #{self.to_s.tableize}
                SET
                    #{set_string}
                WHERE
                    id = ?
            SQL
        else
            insert_str = "("
            values_str = "("
            variable_arr.each_with_index do |symbol, idx|
                variable_name = symbol.to_s[1..-1]
                insert_str += variable_name
                insert_str += ", " unless idx == variable_arr.length - 1
                values_str += self.variable_name.to_s
                values_str += ", " unless idx == variable_arr.length - 1
            end
            insert_str += ")"
            values_str += ")"
            QuestionsDBConnection.instance.execute(<<-SQL)
                INSERT INTO
                    #{self.to_s.tableize} #{insert_str}
                VALUES
                    #{values_str}
            SQL
            self.id = QuestionsDBConnection.instance.last_insert_row_id
        end
    end    

end

class Question < ModelBase
    attr_accessor :id, :title, :body, :user_id

    def self.find_by_author_id(author_id)
        questions = QuestionsDBConnection.instance.execute(<<-SQL, author_id)
            SELECT
                *
            FROM
                questions
            WHERE
                user_id = ?
        SQL
        return nil if questions.length == 0
        questions.map {|question| Question.new(question) }
    end

    def self.most_followed(n)
        QuestionFollow.most_followed_questions(n)
    end

    def initialize(values)
        @id = values["id"]
        @title = values["title"]
        @body = values["body"]
        @user_id = values["user_id"]
    end

    def author
        User.find_by_id(self.user_id)
    end

    def replies
        Reply.find_by_question_id(self.id)
    end

    def followers
        QuestionFollow.followers_for_question_id(self.id)
    end

    # def save
    #     if self.id
    #         QuestionsDBConnection.instance.execute(<<-SQL, self.title, self.body, self.user_id, self.id)
    #             UPDATE
    #                 questions
    #             SET
    #                 title = ?, body = ?, user_id = ?
    #             WHERE
    #                 id = ?
    #         SQL
    #     else
    #         QuestionsDBConnection.instance.execute(<<-SQL, self.title, self.body, self.user_id)
    #             INSERT INTO
    #                 questions (title, body, user_id)
    #             VALUES
    #                 (?, ?, ?)
    #         SQL
    #         self.id = QuestionsDBConnection.instance.last_insert_row_id
    #     end
    #     QuestionFollow.follow_question(self.user_id, self.id)
    # end

end

class User < ModelBase
    attr_accessor :id, :fname, :lname 

    def self.find_by_name(fname, lname)
        user = QuestionsDBConnection.instance.execute(<<-SQL, fname, lname)
            SELECT
                *
            FROM
                users
            WHERE
                fname = ? AND lname = ?
        SQL
        return nil if user.length == 0
        User.new(user.first)
    end

    def initialize(values)
        @id = values["id"]
        @fname = values["fname"]
        @lname = values["lname"]
    end

    def authored_questions
        Question.find_by_author_id(self.id)
    end

    def authored_replies
        Reply.find_by_user_id(self.id)
    end

    def followed_questions
        QuestionFollow.followed_questions_for_user_id(self.id)
    end

    def save
        if self.id
            QuestionsDBConnection.instance.execute(<<-SQL, self.fname, self.lname, self.id)
                UPDATE
                    users
                SET
                    fname = ?, lname = ?
                WHERE
                    id = ?
            SQL
        else
            QuestionsDBConnection.instance.execute(<<-SQL, self.fname, self.lname)
                INSERT INTO
                    users (fname, lname)
                VALUES
                    (?, ?)
            SQL
            self.id = QuestionsDBConnection.instance.last_insert_row_id
        end
    end

end

class QuestionLike < ModelBase
    attr_accessor :id, :user_id, :question_id 

    def self.likers_for_question_id(question_id)
        likers = QuestionsDBConnection.instance.execute(<<-SQL, question_id)
            SELECT
                *
            FROM
                users
            JOIN
                question_likes ON question_likes.user_id = users.id
            WHERE
                question_likes.question_id = ?
        SQL
        return nil if likers.length == 0
        likers.map { |liker| User.new(liker) }
    end

    def initialize(values)
        @id = values["id"]
        @user_id = values["user_id"]
        @question_id = values["question_id"]
    end

end

class Reply < ModelBase
    attr_accessor :id, :body, :user_id, :question_id, :parent_reply_id 

    def self.find_by_user_id(user_id)
       replies = QuestionsDBConnection.instance.execute(<<-SQL, user_id)
            SELECT
                *
            FROM
                replies
            WHERE
                user_id = ?
        SQL
        return nil if replies.length == 0
        replies.map { |reply| Reply.new(reply) }
    end

    def self.find_by_question_id(question_id)
       replies = QuestionsDBConnection.instance.execute(<<-SQL, question_id)
            SELECT
                *
            FROM
                replies
            WHERE
                question_id = ?
        SQL
        return nil if replies.length == 0
        replies.map { |reply| Reply.new(reply) }
    end

    def initialize(values)
        @id = values["id"]
        @user_id = values["user_id"]
        @question_id = values["question_id"]
        @body = values["body"]
        @parent_reply_id = values["parent_reply_id"]
    end

    def author
        User.find_by_id(self.user_id)
    end

    def question
        Question.find_by_id(self.question_id)
    end

    def parent_reply
        Reply.find_by_id(self.parent_reply_id)
    end

    def child_replies
        child_replies = QuestionsDBConnection.instance.execute(<<-SQL, self.id)
            SELECT
                *
            FROM
                replies
            WHERE
                parent_reply_id = ?
        SQL
        return nil if child_replies.length == 0
        child_replies.map { |reply| Reply.new(reply) }
    end

    def save
        if self.id
            QuestionsDBConnection.instance.execute(<<-SQL, self.user_id, self.question_id, self.body, self.parent_reply_id, self.id)
                UPDATE
                    replies
                SET
                    user_id = ?, question_id = ?, body = ?, parent_reply_id = ? 
                WHERE
                    id = ?
            SQL
        else
            QuestionsDBConnection.instance.execute(<<-SQL, self.user_id, self.question_id, self.body, self.parent_reply_id)
                INSERT INTO
                    replies (user_id, question_id, body, parent_reply_id)
                VALUES
                    (?, ?, ?, ?)
            SQL
            self.id = QuestionsDBConnection.instance.last_insert_row_id
        end
        QuestionFollow.follow_question(self.user_id, self.question_id)
    end

end

class QuestionFollow
    # attr_accessor :id, :user_id, :question_id

    def self.followers_for_question_id(question_id)
        followers = QuestionsDBConnection.instance.execute(<<-SQL, question_id)
            SELECT
                *
            FROM
                users
            JOIN
                question_follows ON users.id = question_follows.user_id
            WHERE
                question_follows.question_id = ?
        SQL
        return nil if followers.length == 0
        followers.map {|follower| User.new(follower) }
    end

    def self.followed_questions_for_user_id(user_id)
        f_questions = QuestionsDBConnection.instance.execute(<<-SQL, user_id)
            SELECT
                *
            FROM
                questions
            JOIN
                question_follows ON questions.id = question_follows.question_id
            WHERE
                question_follows.user_id = ?
        SQL
        return nil if f_questions.length == 0
        f_questions.map {|question| Question.new(question) }        
    end

    def self.follow_question(user_id, question_id)
        QuestionsDBConnection.instance.execute(<<-SQL, user_id, question_id)
            INSERT INTO
                question_follows (user_id, question_id)
            VALUES
                (?, ?)
        SQL
    end

    def self.most_followed_questions(n)
        most_followed = QuestionsDBConnection.instance.execute(<<-SQL, n)
            SELECT
                *
            FROM
                questions
            JOIN
                question_follows ON question_follows.question_id = questions.id
            GROUP BY
                questions.id
            ORDER BY
                COUNT(questions.id) DESC
            LIMIT
                ?
        SQL
        return nil if most_followed.length == 0
        most_followed.map {|question| Question.new(question) }  
    end

    # def initialize(values)
    #     @id = values["id"]
    #     @user_id = values["user_id"]
    #     @question_id = values["question_id"]
    # end

end