require 'rails_helper'

RSpec.describe User, type: :model do
  subject(:user) { User.create(username: "alex", password: "123456") }
  
  it { should validate_presence_of(:username)}
  it { should validate_presence_of(:session_token)}
  it { should validate_presence_of(:password_digest)}
  it { should validate_length_of(:password).is_at_least(6)}
  it { should validate_uniqueness_of(:username) }
  it { should validate_uniqueness_of(:session_token) }

  it { should have_many(:goals) }

  describe "::find_by_credentials" do
    before(:each) { user }
    username = "alex"

    it "should return a user when given valid credentials" do
      expect(User.find_by_credentials(username, "123456")).to eq(user)
    end

    it "should return nil when not provided valid credentials" do
      expect(User.find_by_credentials(username, "123789")).to eq(nil)
    end

  end

end
