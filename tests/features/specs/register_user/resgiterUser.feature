@run

Feature: Register User

  @register_user
  Scenario: Register a new user successfully and delete the account
    Given user is on web app
    Given user navigates to "https://automationexercise.com"
    And Verify and element "automation exercise home logo" is present
    And user clicks on "signup login link"
    And user verifies that the "new user signup title" should have text as "New User Signup!"
    And user enters "Sonam User" into input "signup name input"
    And user enters "$user_1.email" into input "signup email input"
    And user clicks on "signup button"
    And user verifies that the "enter account information title" should have text as "Enter Account Information"
    And user selects radio box option "title mr radio"
    And user enters "Sonam User" into input "account name input"
    And user enters "Test@12345" into input "account password input"
    And user selects option "10" from the dropdown "birth day dropdown"
    And user selects option "5" from the dropdown "birth month dropdown"
    And user selects option "1995" from the dropdown "birth year dropdown"
    And user selects checkbox option "newsletter checkbox"
    And user selects checkbox option "offers checkbox"
    And user enters "Sonam" into input "first name input"
    And user enters "Kumar" into input "last name input"
    And user enters "Example Corp" into input "company input"
    And user enters "Street 1, Building A" into input "address line1 input"
    And user enters "Near City Center" into input "address line2 input"
    And user selects option "India" from the dropdown "country dropdown"
    And user enters "Maharashtra" into input "state input"
    And user enters "Mumbai" into input "city input"
    And user enters "400001" into input "zipcode input"
    And user enters "9999999999" into input "mobile number input"
    And user clicks on "create account button"
    And user verifies that the "account created title" should have text as "ACCOUNT CREATED!"
    And user clicks on "continue button"
    And user verifies that the "logged in as text" should have partial text as "Logged in as"
    And user clicks on "delete account link"
    And user verifies that the "account deleted title" should have text as "ACCOUNT DELETED!"
    And user clicks on "continue button"