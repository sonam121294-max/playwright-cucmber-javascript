Feature: Admin sign-in redirect

  @run
  Scenario: Verify admin sign-in redirects to users page
    Given user is on web app
    And user navigates to "http://localhost:4001/signin"
    And user enters "admin@admin.com" into input "admin signin email input"
    And user clicks on "admin signin continue with email button"
    And user enters "123456" as otp one by one in input "admin signin otp input"
    And user clicks on "admin signin verify button"
    And user verifies that the page has url as "http://localhost:4001/users"
