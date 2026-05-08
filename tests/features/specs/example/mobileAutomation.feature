
Feature: User signup on psoriasis app

Background: Initiate the mobile app & allow notification
Given user is on mobile app
# And user clicks on "allow"
# And user waits for 10 milliseconds

# @run
Scenario: Sign in using registered number and OTP
And user clicks on "signupButton"
And user clicks on "mobile"
And user navigates backward

# @run
Scenario: Testing 
And user clicks on "signupButton"
And user clicks on "mobile"
And user enters "12345679" into input "mobile"
