(function() {

  "use strict";

  var expect = require('rv-common-e2e').expect;
  var assert = require('rv-common-e2e').assert;
  var CommonHeaderPage = require('rv-common-e2e').commonHeaderPage;
  var CommonHeaderMenuPage = require('./pages/commonHeaderMenuPage.js');
  var helper = require('rv-common-e2e').helper;

  browser.driver.manage().window().setSize(1280, 768);

  describe("Authentication", function() {
    this.timeout(2000);// to allow for protactor to load the seperate page
    var commonHeaderPage, commonHeaderMenuPage;
    before(function (){
      commonHeaderPage = new CommonHeaderPage();
      commonHeaderMenuPage = new CommonHeaderMenuPage();

      browser.get("http://localhost:8099/test/e2e");
    });

    it("should not show system message icon when not logged in", function() {
      assert.eventually.isTrue(commonHeaderPage.getSignInButton().isDisplayed(), "Sign in button should show");

      assert.eventually.isFalse(commonHeaderMenuPage.getSystemMessagesButton().isDisplayed(), "Should not show system messages icon");
      assert.eventually.strictEqual(commonHeaderMenuPage.getSystemMessagesBadge().getText(), "", "Should not show system message badge");
    });

    // No system messages - should mock API response
    xit("should show system messages when logged in", function() {
      //log in
      helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader').then(function () {
        commonHeaderPage.signin();
      });

      assert.eventually.isTrue(commonHeaderMenuPage.getSystemMessagesButton().isDisplayed(), "Should show system messages icon");
      assert.eventually.strictEqual(commonHeaderMenuPage.getSystemMessagesBadge().getText(), "14", "Badge should show correct number of system messages");
    });

    xit("should hide system messages icon when there are no messages", function() {
      element(by.id("clear-system-messages-button")).click();
      browser.refresh();
      
      helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader');

      assert.eventually.isFalse(commonHeaderMenuPage.getSystemMessagesButton().isDisplayed(), "Should hide system messages icon");
    });
  });
})();
