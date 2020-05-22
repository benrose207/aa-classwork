# == Schema Information
#
# Table name: posts
#
#  id         :bigint           not null, primary key
#  title      :string           not null
#  url        :string
#  content    :string
#  sub_id     :integer
#  author_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Post < ApplicationRecord

    validates :subs, presence: true
    validates :title, presence: true

    # belongs_to :sub,
    #     foreign_key: :sub_id,
    #     class_name: :Sub

    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User

    has_many :post_subs, dependent: :destroy, inverse_of: :post
    has_many :subs, through: :post_subs

    has_many :comments,
        foreign_key: :post_id,
        class_name: :Comment

end
