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

    it("should show sign in button", function() {
      assert.eventually.isTrue(commonHeaderPage.getSignInButton().isDisplayed(), "Sign in button should show");
    });
    
    it("should sign in user", function() {
      //wait for spinner to go away.
      helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader').then(function () {
        commonHeaderPage.signin();
      });
    });

    it("should retain auth status upon refresh", function () {
      browser.refresh();
      
      helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader');

      assert.eventually.isFalse(commonHeaderPage.getSignInButton().isDisplayed(), "sign in button should not show");
      assert.eventually.isTrue(commonHeaderMenuPage.getProfilePic().isDisplayed(), "profile pic should show");
      assert.eventually.isFalse(commonHeaderMenuPage.getSignOutButton().isDisplayed(), "sign out button should not show");
    });

    it("should log out", function() {
      commonHeaderMenuPage.getProfilePic().click();

      //shows sign-out menu item
      expect(commonHeaderMenuPage.getSignOutButton().isDisplayed()).to.eventually.be.true;

      //click sign out
      commonHeaderMenuPage.getSignOutButton().click();
      
      helper.wait(commonHeaderMenuPage.getSignOutModal(), 'Sign Out Modal');
      
      assert.eventually.isTrue(commonHeaderMenuPage.getSignOutModal().isDisplayed(), "sign-out dialog should show");
      commonHeaderMenuPage.getSignOutRvOnlyButton().click();

      //signed out; sign-in button shows
      expect(commonHeaderPage.getSignInButton().isDisplayed()).to.eventually.equal(true);

    });

  });
})();
