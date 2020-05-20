require 'rails_helper'

RSpec.describe User, type: :model do
  subject(:user) { User.new(email: 'test@test.com', password: '123456') }

  describe "Confirm Validations" do 
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:password_digest) }
    it { should validate_length_of(:password).is_at_least(6) }
  end

  describe "#is_password?" do
    context "password matches stored digest" do
      it "should return true" do
        expect(user.is_password?('123456')).to be true
      end
    end

    context "password does not match stored digest" do
      it "should return false when different passwords are given" do
        expect(user.is_password?('123465')).to be false
      end
    end
  end

  describe "#reset_session_token!" do
    it "should set a new session token for the user" do
      prev_token = user.session_token
      user.reset_session_token!
      expect(user.session_token).not_to eq(prev_token)
    end

    it "should return the new session token" do
      expect(user.reset_session_token!).to eq(user.session_token)
    end
  end

  describe "::find_by_credentials" do
    before { user.save! }

    it "should return a user based on their credentials" do 
      expect(User.find_by_credentials('test@test.com', '123456')).to eq(user)
    end
    
    it "should return nil if no user matches the given credentials" do
      expect(User.find_by_credentials('test@test.com', '123465')).to eq(nil)
    end
  end
end
