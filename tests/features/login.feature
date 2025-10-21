# @smoke
Feature: login for mercury newtours

# Background: 
#       Given providing valid url

@regression
Scenario: login with valid username and password pass value in step
    Given providing valid url
    When providing valid username as "ahmad.support", password as "123" and submit 
    Then checking is Login Successfully find
    And  select inventory dropdown and select Sales invoice option
    And  enter sale no 57 and press enter seacrh button
    And  click new button to create new sales invoice
    And  enter one item and press post button to save sales invoice
    And press list button to go sales invoice list page
    And filter out that sale which you created just now and verify it exists in list page
    And logout from application
    And again login with same user
