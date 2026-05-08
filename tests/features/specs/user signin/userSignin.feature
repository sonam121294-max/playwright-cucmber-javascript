Feature: User sign in

  @run
  Scenario: Login with valid credentials and delete account
    Given user is on web app
    And user navigates to "http://automationexercise.com"
    And Verify and element "img[alt='Website for automation practice']" is present
    And user clicks on "a[href='/login']"
    And user verifies that the ".login-form h2" should have text as "Login to your account"
    And user enters "your_registered_email@example.com" into input "input[data-qa='login-email']"
    And user enters "your_password" into input "input[data-qa='login-password']"
    And user clicks on "button[data-qa='login-button']"
    And user verifies that the "a:has-text('Logged in as')" should have partial text as "Logged in as"
    And user clicks on "a[href='/delete_account']"
    And user verifies that the "h2[data-qa='account-deleted'] b" should have text as "ACCOUNT DELETED!"
