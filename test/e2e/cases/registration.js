(function() {

  "use strict";

  var expect = require('rv-common-e2e').expect;
  var assert = require('rv-common-e2e').assert;
  var CommonHeaderPage = require('rv-common-e2e').commonHeaderPage;
  var HomePage = require('./../pages/homepage.js');
  var RegistrationModalPage = require('./../pages/registrationModalPage.js');
  var helper = require('rv-common-e2e').helper;

  var RegistrationScenarios = function() {

    describe("Registration", function() {
      this.timeout(2000);// to allow for protactor to load the seperate page
      var commonHeaderPage, 
        homepage, 
        registrationModalPage;
        
      before(function (){
        commonHeaderPage = new CommonHeaderPage();
        homepage = new HomePage();
        registrationModalPage = new RegistrationModalPage();

        homepage.get();
      });

      it("should show T&C Dialog on new Google Account", function() {
        //sign in, wait for spinner to go away
        helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader').then(function () {
          commonHeaderPage.signin();
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
        assert.eventually.isTrue(homepage.getRegisterUserButton().isDisplayed(), "Create Account button should show");
        homepage.getRegisterUserButton().click();
        
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
        assert.eventually.isTrue(commonHeaderPage.getProfilePic().isDisplayed(), "profile pic should show");
      });

    });
  };

  module.exports = RegistrationScenarios;

})();
