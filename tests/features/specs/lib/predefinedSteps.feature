Feature: Predefined steps
 
Scenario: pre defined steps for browser action
Given user is on web app 
Given user is on mobile app  
Given user navigates to "https://fs2.formsite.com/meherpavan/form2/index.html?1537702596407"
Given user navigates forward
Given user navigates backward
Given user refreshes page
Given user opens a new page "page 2" and switches to it
Given user switches to page "page 2" 
#first page name is opening page

Given user enters "kjk" into input "jjj"
Given user enters "" into input "" and presses enter
Given user clears input field "[name='q']"

Given user waits for 10 milliseconds
Given user presses Enter key on element ""

Given user clicks on ""
Given user double clicks on ""
Given user right clicks on ""
Given user hovers on ""
Given user drags element "" to the locator ""


Given user selects radio box option ""
Given user selects checkbox option ""
Given user unselects checkbox option ""
Given user selects option "" from the dropdown ""
Given Verify radio button "#female" is selected
Given Verify checkbox "input.Automation" is checked
Given Verify and element "#not-exist" is present


Given user dismisses alert box
Given user accepts alert
Given user verifies that the alert text should be ""

Given user verifies that the "" should have text as ""
Given user verifies that the "" should have partial text as ""
Given user verifies that the "" is diabled
Given user verifies that the "" is enabled
Given user veriffies that the page has title as ""
Given user verifies that the page has url as ""
Given user scrolls the page by 10 pixels
Given user takes a screenshot of the page and save with name "screenshot.png"
Given user saves value of  "vpo id element" with key "vpoId"

Given user uploads file "tests/data/user-data/sonam.json" at "#RESULT_FileUpload-10"









