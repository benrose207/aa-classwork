require 'spec_helper'
require 'rails_helper'

feature 'the signup process' do
    background :each do
        visit new_user_url
    end

  scenario 'has a new user page' do
    expect(page).to have_content("Sign up")
  end

  feature 'signing up a user' do
    
    scenario 'shows username on the homepage after signup' do
        fill_in 'Username', with: 'alex'
        fill_in 'Password', with: '123456'
        click_button 'Sign up!'

        user = User.find_by(username: 'alex')
        expect(page).to have_content('alex')
        expect(current_url).to eq(user_url(user))
    end

  end
end

feature 'logging in' do
  scenario 'shows username on the homepage after login' do
    User.create(username: 'Bob', password: 'password')
    
    visit new_session_url
    fill_in 'Username', with: 'Bob'
    fill_in 'Password', with: 'password'
    click_button 'Sign in!'

    expect(page).to have_content('Welcome Back, Bob!')
    user = User.find_by(username: 'Bob')
    expect(current_url).to eq(users_url)
  end
end

feature 'logging out' do
  scenario 'begins with a logged out state'

  scenario 'doesn\'t show username on the homepage after logout'

end