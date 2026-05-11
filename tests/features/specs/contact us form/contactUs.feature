Feature: Contact us form

  @run
  Scenario: Submit contact us form successfully
    Given user is on web app
    And user navigates to "http://automationexercise.com"
    And Verify and element "img[alt='Website for automation practice']" is present
    And user clicks on "a[href='/contact_us']"
    And user verifies that the "div.contact-form h2.title.text-center" should have text as "Get In Touch"
    And user enters "Sonam User" into input "input[data-qa='name']"
    And user enters "sonam@example.com" into input "input[data-qa='email']"
    And user enters "Automation Contact Subject" into input "input[data-qa='subject']"
    And user enters "This is a sample message for contact us form test." into input "textarea[data-qa='message']"
    And user uploads file "/home/sonam/Personal/playwright-cucmber-javascript/tests/data/user-data/default.json" at "input[name='upload_file']"
    And user accepts alert
    And user clicks on "input[data-qa='submit-button']"
    And user verifies that the "div.status.alert.alert-success" should have text as "Success! Your details have been submitted successfully."
    And user clicks on "a.btn.btn-success"
    And Verify and element "img[alt='Website for automation practice']" is present
