(function() {

  "use strict";

  var expect = require('rv-common-e2e').expect;
  var assert = require('rv-common-e2e').assert;
  var CommonHeaderPage = require('rv-common-e2e').commonHeaderPage;
  var CommonHeaderMenuPage = require('./pages/commonHeaderMenuPage.js');
  var RegistrationModalPage = require('./pages/registrationModalPage.js');
  var CompanySettingsModalPage = require('./pages/companySettingsModalPage.js');
  var helper = require('rv-common-e2e').helper;

  browser.driver.manage().window().setSize(1280, 768);

  describe("Registration", function() {
    this.timeout(2000);// to allow for protactor to load the seperate page
    var commonHeaderPage, 
      commonHeaderMenuPage, 
      registrationModalPage,
      companySettingsModalPage;
      
    var username = browser.params.login.user2;
    var password = browser.params.login.pass2;
      
    before(function (){
      commonHeaderPage = new CommonHeaderPage();
      commonHeaderMenuPage = new CommonHeaderMenuPage();
      registrationModalPage = new RegistrationModalPage();
      companySettingsModalPage = new CompanySettingsModalPage();

      browser.get("http://localhost:8099/test/e2e");

    });

    it("should show T&C Dialog on new Google Account", function() {      
      //sign in, wait for spinner to go away
      helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader').then(function () {
        commonHeaderPage.signin(username, password);
      });
      
      helper.wait(registrationModalPage.getRegistrationModal(), "Registration Modal");
      
      //dialog shows
      assert.eventually.isTrue(registrationModalPage.getRegistrationModal().isPresent(), 
        "registration dialog should show");

      //fill in email address
    });

    it("should not bug me again when I click 'cancel', even after a refresh (limbo state)", function() {
      registrationModalPage.getCancelButton().click();
      browser.refresh();
      
      helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader');
      
      assert.eventually.isFalse(commonHeaderPage.getSignInButton().isDisplayed(), 
        "sign in button should not show");
      assert.eventually.isFalse(registrationModalPage.getRegistrationModal().isPresent(), 
        "registration dialog should hide");
    });

    it("allow me to register when I've changed my mind", function() {
      assert.eventually.isTrue(commonHeaderMenuPage.getRegisterUserButton().isDisplayed(), "Create Account button should show");
      commonHeaderMenuPage.getRegisterUserButton().click();
      
      helper.wait(registrationModalPage.getRegistrationModal(), "Registration Modal");
      
      //dialog shows
      assert.eventually.isTrue(registrationModalPage.getRegistrationModal().isPresent(), 
        "registration dialog should show");
    });

    it("should show validation errors if i have not agreed to terms and entered an email", function () {
      registrationModalPage.getSaveButton().click();
      
      assert.eventually.isTrue(registrationModalPage.getValidationTermsAccepted().isPresent(), "t&c validation error should show");
      assert.eventually.isTrue(registrationModalPage.getValidationFirstName().isPresent(), "first name validation error should show");
      assert.eventually.isTrue(registrationModalPage.getValidationLastName().isPresent(), "last name validation error should show");
      assert.eventually.isTrue(registrationModalPage.getValidationEmail().isPresent(), "email validation error should show");
    });

    it("should complete the registration process", function () {
      registrationModalPage.getFirstNameField().sendKeys("John");
      registrationModalPage.getLastNameField().sendKeys("Doe");
      registrationModalPage.getEmailField().sendKeys("john.doe@awesomecompany.io");
      //click authorize
      registrationModalPage.getTermsCheckbox().click();
      
      // No need to sign up for newsletter
      // registrationModalPage.getNewsletterCheckbox().click();
      registrationModalPage.getSaveButton().click();
      
      helper.waitRemoved(registrationModalPage.getRegistrationModal(), "Registration Modal");

      assert.eventually.isFalse(registrationModalPage.getRegistrationModal().isPresent(), "registration dialog should hide");
    });

    it("should update auth button", function () {
      assert.eventually.isTrue(commonHeaderMenuPage.getProfilePic().isDisplayed(), "profile pic should show");
    });

    it("Deletes company", function() {
      commonHeaderMenuPage.getProfilePic().click();
      commonHeaderMenuPage.getCompanySettingsButton().click();        
      
      helper.wait(companySettingsModalPage.getCompanySettingsModal(), "Comapny Settings Modal");
      helper.waitDisappear(companySettingsModalPage.getLoader(), "Load Company Settings");
      
      companySettingsModalPage.getDeleteButton().click();
  
      // confirm delete
      browser.switchTo().alert().then(function (prompt){ prompt.accept(); });
      
      helper.waitRemoved(companySettingsModalPage.getCompanySettingsModal(), "Company Settings Modal");
    });
    
    it("Signs user out when deleting company", function() {
      helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader');
      
      assert.eventually.isTrue(commonHeaderPage.getSignInButton().isDisplayed(), "Should be signed out");
    });
  });
})();
