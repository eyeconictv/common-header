(function() {

  "use strict";
  
  var expect = require('rv-common-e2e').expect;
  var assert = require('rv-common-e2e').assert;
  var CommonHeaderPage = require('rv-common-e2e').commonHeaderPage;
  var CommonHeaderMenuPage = require('./pages/commonHeaderMenuPage.js');
  var UserSettingsModalPage = require('./pages/userSettingsModalPage.js');
  var helper = require('rv-common-e2e').helper;

  browser.driver.manage().window().setSize(1280, 768);

  describe("User Settings", function() {
    this.timeout(2000);// to allow for protactor to load the seperate page
    var commonHeaderPage, 
      commonHeaderMenuPage, 
      userSettingsModalPage;
      
    before(function (){
      commonHeaderPage = new CommonHeaderPage();
      commonHeaderMenuPage = new CommonHeaderMenuPage();
      userSettingsModalPage = new UserSettingsModalPage();

      browser.get("http://localhost:8099/test/e2e");

      //sign in, wait for spinner to go away
      helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader').then(function () {
        commonHeaderPage.signin();
      });
    });

    it("should show user settings modal", function() {
      commonHeaderMenuPage.getProfilePic().click();
      
      assert.eventually.isTrue(commonHeaderMenuPage.getUserSettingsButton().isDisplayed(), "User settings menu item should show");

      //click on user settings button
      commonHeaderMenuPage.getUserSettingsButton().click();
      
      helper.wait(userSettingsModalPage.getUserSettingsModal(), "User Settings Modal");

      assert.eventually.isTrue(userSettingsModalPage.getUserSettingsModal()
        .isDisplayed(), "User settings modal should show after clicking on menu item");
    });
    
    it("should update settings", function() {
      userSettingsModalPage.getFirstNameField().clear();
      userSettingsModalPage.getFirstNameField().sendKeys("John");

      userSettingsModalPage.getLastNameField().clear();
      userSettingsModalPage.getLastNameField().sendKeys("Doe");

      userSettingsModalPage.getPhoneField().clear();
      userSettingsModalPage.getPhoneField().sendKeys("000-000-0000");

      userSettingsModalPage.getEmailField().clear();
      userSettingsModalPage.getEmailField().sendKeys("testmail@testmail.com");

      if ( !userSettingsModalPage.getCeCheckbox().isSelected() )
      {
         userSettingsModalPage.getCeCheckbox().click();
      }

      if ( userSettingsModalPage.getPuCheckbox().isSelected() )
      {
         userSettingsModalPage.getPuCheckbox().click();
      }

      if ( !userSettingsModalPage.getDaCheckbox().isSelected() )
      {
         userSettingsModalPage.getDaCheckbox().click();
      }

      //click save button
      userSettingsModalPage.getSaveButton().click();
      
      helper.waitRemoved(userSettingsModalPage.getUserSettingsModal(), "User Settings Modal");
      
    });
    
    it("should show updated information", function() {
      commonHeaderMenuPage.getProfilePic().click();
      commonHeaderMenuPage.getUserSettingsButton().click();
      
      helper.wait(userSettingsModalPage.getUserSettingsModal(), "User Settings Modal");

      expect(userSettingsModalPage.getFirstNameField().getAttribute('value')).to.eventually.equal("John");
      expect(userSettingsModalPage.getLastNameField().getAttribute('value')).to.eventually.equal("Doe");
      expect(userSettingsModalPage.getEmailField().getAttribute('value')).to.eventually.equal("testmail@testmail.com");
      expect(userSettingsModalPage.getPhoneField().getAttribute('value')).to.eventually.equal("000-000-0000");

      expect(userSettingsModalPage.getCeCheckbox().isSelected()).to.eventually.equal.true;
      expect(userSettingsModalPage.getPuCheckbox().isSelected()).to.eventually.equal.false;
      expect(userSettingsModalPage.getDaCheckbox().isSelected()).to.eventually.equal.true;
    });

    // username should be shown here instead of email
    // however that's not an editable field
    xit("should immediately update fixes", function () {
      assert.eventually.equal(element(
        by.css("span.username")).getText(), "testmail@testmail.com",
          "Username should update");
    });
  });
})();
