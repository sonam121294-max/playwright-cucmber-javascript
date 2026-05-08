Feature: User sign in

#   @run
  Scenario: Login with valid credentials and delete account
    Given user is on web app
    And user navigates to "http://automationexercise.com"
    And Verify and element "img[alt='Website for automation practice']" is present
    And user clicks on "a[href='/login']"
    And user verifies that the ".login-form h2" should have text as "Login to your account"
    And user enters "sonam@napses.com" into input "input[data-qa='login-email']"
    And user enters "Test@12345" into input "input[data-qa='login-password']"
    And user clicks on "button[data-qa='login-button']"
    And user verifies that the "a:has-text('Logged in as')" should have partial text as "Logged in as"
    And user clicks on "a[href='/delete_account']"
    And user verifies that the "h2[data-qa='account-deleted'] b" should have text as "Account Deleted!"

#   @run
  Scenario: Login with incorrect credentials shows error message
    Given user is on web app
    And user navigates to "http://automationexercise.com"
    And Verify and element "img[alt='Website for automation practice']" is present
    And user clicks on "a[href='/login']"
    And user verifies that the ".login-form h2" should have text as "Login to your account"
    And user enters "invalid.user@example.com" into input "input[data-qa='login-email']"
    And user enters "Invalid@12345" into input "input[data-qa='login-password']"
    And user clicks on "button[data-qa='login-button']"
    And user verifies that the ".login-form p" should have text as "Your email or password is incorrect!"

  @run
  Scenario: Login with valid credentials and logout successfully
    Given user is on web app
    And user navigates to "http://automationexercise.com"
    And Verify and element "img[alt='Website for automation practice']" is present
    And user clicks on "a[href='/login']"
    And user verifies that the ".login-form h2" should have text as "Login to your account"
    And user enters "sonam@napses.com" into input "input[data-qa='login-email']"
    And user enters "Test@12345" into input "input[data-qa='login-password']"
    And user clicks on "button[data-qa='login-button']"
    And user verifies that the "a:has-text('Logged in as')" should have partial text as "Logged in as"
    And user clicks on "a[href='/logout']"
    And user verifies that the ".login-form h2" should have text as "Login to your account"
