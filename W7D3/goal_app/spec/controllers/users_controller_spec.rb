require 'rails_helper'

RSpec.describe UsersController, type: :controller do
    subject(:user) {User.create(username: 'updateuser', password: '123456')}


    describe "GET #index" do
        it "should render the index page" do
            get :index
            expect(response).to render_template(:index)
        end
    end

    describe "GET #show" do
        it "should render the show page" do
            get :show, params: {id: user.id}
            expect(response).to render_template(:show)
        end
    end

    describe "GET #new" do
        it "should render the new page" do
            get :new
            expect(response).to render_template(:new)
        end
    end

    describe "GET #edit" do
        it "should render the edit page" do
            get :edit, params: {id: user.id}
            expect(response).to render_template(:edit)
        end
    end

    describe "POST #create" do

        context "with valid params" do
            it "logs in the user" do
                post :create, params: {user: {
                    username: 'test',
                    password: '123456'
                    }}

                user = User.find_by(username: 'test')
                expect(response).to redirect_to(user_url(user))
                expect(session[:session_token]).to eq(user.session_token)
            end
        end

        context "with invalid params" do
            it "valids the presence of a password and renders new template with errors" do
                post :create, params: {user: {
                    username: 'test',
                    password: ''
                    }}

                expect(response).to render_template(:new)
                expect(flash[:errors]).to be_present
            end
        end
    end

    describe "PATCH #update" do
        # let(:user) {User.create(username: 'updateuser', password: '123456')}

        context "with valid params" do
            it "should edit the user and redirect to the show page" do
                # test = User.find_by(username: 'updateuser')
                patch :update, params: {user: {
                    username: 'newusername',
                    password: '123456'
                    }, id: user.id}
                
                expect(User.find_by(username: 'newusername')).not_to be_nil
                expect(response).to redirect_to(user_url(user))
                
            end
            
        end

        context "with invalid params" do 
            it "should render the edit page and display errors" do
                # test = User.find_by(username: 'updateuser')
                patch :update, params: {user: {
                    username: 'updateuser',
                    password: ''
                    }, id: user.id}

                expect(response).to render_template(:edit)
                expect(flash[:errors]).to be_present
            end

        end

    end

end
