Feature: Filling qa demo form 

  # @run
  Scenario: fill in valid details 
    Given user is on web app
    And user navigates to "https://qavalidation.com/demo-form/"
    
    
    
  # @run
  Scenario: Implementation 
    Given user is on web app
    And user enters "$user_1.full_name" into input "Full name"
    And user enters "$user.email" into input "email"
    And user enters "7358686185" into input "phone number"
    And user selects option "Female" from the dropdown "gender"
    And user selects radio box option "3 years of experience"
    And user selects checkbox option "db testing"
    And user selects option "Appium" from the dropdown "qa tools"
    And user enters "test form" into input "other details"
    And user clicks on "submit button"
    And user verifies that the "success message" should have text as "Your message has been sent"

  
  # @run
  Scenario: Verify
    Given user is on web app
    And user verifies that the "Full Name After Submit" should have text as "$user_1.full_name"
    
