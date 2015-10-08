(function() {

  "use strict";

  var expect = require('rv-common-e2e').expect;
  var assert = require('rv-common-e2e').assert;
  var CommonHeaderPage = require('rv-common-e2e').commonHeaderPage;
  var CommonHeaderMenuPage = require('./pages/commonHeaderMenuPage.js');
  var AddSubcompanyModalPage = require('./pages/addSubcompanyModalPage.js');
  var SelectSubcompanyModalPage = require('./pages/selectSubcompanyModalPage.js');
  var CompanySettingsModalPage = require('./pages/companySettingsModalPage.js');
  var helper = require('rv-common-e2e').helper;

  browser.driver.manage().window().setSize(1280, 768);

  describe("Companies Settings", function() {
    this.timeout(2000);// to allow for protactor to load the seperate page
    var commonHeaderPage, 
      commonHeaderMenuPage,
      addSubcompanyModalPage,
      selectSubcompanyModalPage,
      companySettingsModalPage;
      
    before(function (){
      commonHeaderPage = new CommonHeaderPage();
      commonHeaderMenuPage = new CommonHeaderMenuPage();
      addSubcompanyModalPage = new AddSubcompanyModalPage();
      selectSubcompanyModalPage = new SelectSubcompanyModalPage();
      companySettingsModalPage = new CompanySettingsModalPage();

      browser.get("http://localhost:8099/test/e2e");

      //sign in, wait for spinner to go away
      helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader').then(function () {
        commonHeaderPage.signin();
      });
    });
    
    describe("Add subcompany", function () {
      it("Opens Add Subcompany dialog", function () {
        commonHeaderMenuPage.getProfilePic().click();
        
        assert.eventually.isTrue(commonHeaderMenuPage.getAddSubcompanyButton().isDisplayed(),
          "Add subcompany menu item should show");
        commonHeaderMenuPage.getAddSubcompanyButton().click();

        helper.wait(addSubcompanyModalPage.getAddSubcompanyModal(), "Add Subcompany Modal");

        assert.eventually.isTrue(addSubcompanyModalPage.getAddSubcompanyModal().isDisplayed(),
          "Add subcompany dialog should show");
      });
      
      it("Add new company", function() {
        var modal = addSubcompanyModalPage.getAddSubcompanyModal();
        addSubcompanyModalPage.getNameField().sendKeys("e2e test sub-company");
        addSubcompanyModalPage.getSaveButton().click();
        
        helper.waitRemoved(modal, "Sub-Company modal should hide");
      });
    });

    describe("Select Subcompany", function () {
      it("Opens select subcompany dialog", function () {
        commonHeaderMenuPage.getProfilePic().click();

        assert.eventually.isTrue(commonHeaderMenuPage.getSelectSubcompanyButton().isDisplayed(),
          "Select subcompany menu item should present");
        commonHeaderMenuPage.getSelectSubcompanyButton().click();
        
        helper.wait(selectSubcompanyModalPage.getSelectSubcompanyModal(), "Select Subcompany Modal");

        assert.eventually.isTrue(selectSubcompanyModalPage.getSelectSubcompanyModal().isDisplayed(),
          "Select subcompany dialog should show");
      });
      
      it("Switches to subcompany", function () {
        var currentUrl = browser.getCurrentUrl();
        
        helper.waitDisappear(selectSubcompanyModalPage.getLoader(), "Load Companies");

        // assume first user
        selectSubcompanyModalPage.getCompanies().get(0).click();
        
        helper.wait(commonHeaderMenuPage.getSubcompanyAlert(), "Subcompany Alert");

        assert.eventually.isTrue(commonHeaderMenuPage.getSubcompanyAlert().isDisplayed(),
          "Sub-company alert should show");
        expect(browser.getCurrentUrl()).to.eventually.not.equal("currentUrl:" + currentUrl);
      });
      
      it("Shows sub-company details", function() {
        commonHeaderMenuPage.getProfilePic().click();

        assert.eventually.isFalse(commonHeaderMenuPage.getSelectSubcompanyButton().isDisplayed(),
          "Select subcompany menu item should not be present");
        assert.eventually.isTrue(commonHeaderMenuPage.getChangeSubcompanyButton().isDisplayed(),
          "Change subcompany menu item should be present");
        assert.eventually.isTrue(commonHeaderMenuPage.getResetSubcompanyButton().isDisplayed(),
          "Reset subcompany menu item should be present");
          
        commonHeaderMenuPage.getProfilePic().click();  
      });

      xit("Switches back to parent company", function () {
        //TODO
      });

      xit("can specify subcompany via URL parameter", function () {

        browser.get("/test/e2e/index.html#/shopping-cart?cid=" +
          "bfaf9b18-fd5b-475b-afe1-a511cd73662f");
        assert.eventually.isTrue(element(by.css(".common-header-alert.sub-company-alert")).isDisplayed(),
          "subcompany alert should show");
        assert.eventually.isFalse(element(by.css(".sub-company-alert.test-company-alert")).isDisplayed(),
          "test company alert should not show");
          
        browser.get("/test/e2e/index.html#/shopping-cart");
        browser.refresh();
        browser.sleep(500);
        assert.eventually.isFalse(element(by.css(".common-header-alert.sub-company-alert")).isPresent() &&
          element(by.css(".common-header-alert.sub-company-alert")).isDisplayed(),
          "subcompany alert should hide");
      });
    });
    
    describe("Delete Company", function () {
      it("Opens Company Settings Dialog", function() {
        commonHeaderMenuPage.getProfilePic().click();
        
        commonHeaderMenuPage.getCompanySettingsButton().click();        
        
        helper.wait(companySettingsModalPage.getCompanySettingsModal(), "Comapny Settings Modal");
        
        assert.eventually.isTrue(companySettingsModalPage.getCompanySettingsModal().isDisplayed(),
          "Company settings dialog should show");
          
        helper.waitDisappear(companySettingsModalPage.getLoader(), "Load Company Settings");
        
        assert.eventually.equal(companySettingsModalPage.getNameField().getAttribute('value'), "e2e test sub-company",
          "Should have correct name");
      });
      
      it("Should delete the company and return to parent company", function() {
        companySettingsModalPage.getDeleteButton().click();

        // confirm delete
        browser.switchTo().alert().then(function (prompt){ prompt.accept(); });

        helper.waitDisappear(commonHeaderMenuPage.getSubcompanyAlert(), "Subcompany Alert");

        assert.eventually.isFalse(commonHeaderMenuPage.getSubcompanyAlert().isDisplayed(),
          "Sub-company alert should be hidden");
      });
    });

    xdescribe("Move company", function () {
      it("Opens Move Company Dialog", function() {
        element(by.css(".move-subcompany-button")).click();
        browser.sleep(500);
        assert.eventually.isTrue(element(by.css(".move-company-modal")).isDisplayed(),
          "Move company dialog should show");
      });

      it("Shows error on invalid auth key", function () {
        element(by.id("auth-key")).clear();
        element(by.id("auth-key")).sendKeys("invalid-auth-key");
        element(by.css(".retrieve-company-details-button")).click();
        assert.eventually.isTrue(element(by.css(".alert.alert-danger")).isDisplayed(),
          "Error message should show");
      });

      it("Retrieves Company Info", function () {
        element(by.id("auth-key")).clear();
        element(by.id("auth-key")).sendKeys("3509cd9b-e9ba-47d2-84bb-f954db4641b1");
        element(by.css(".retrieve-company-details-button")).click();

        assert.eventually.isTrue(element(by.css(".company-details-info")).isDisplayed(),
          "Company details info should show");
      });
      
      it("Should Move Company", function () {
        element(by.css(".move-company-button")).click();
        browser.sleep(500);
        assert.eventually.isTrue(element(by.css(".alert.alert-success")).isDisplayed(),
          "Success message should show");
        assert.eventually.isFalse(element(by.css(".move-company-button")).isDisplayed(),
          "Move company button should hide");

      });

      it("Move Company Dialog Should Close", function () {
        element(by.css("button.close-move-company-button")).click();
        assert.eventually.isFalse(element(by.css(".move-company-modal")).isPresent(),
          "Move company dialog should hide");
      });

      it("Closes Add subcompany Dialog", function () {
        element(by.css(".cancel-add-subcompany-button")).click();
        assert.eventually.isFalse(element(by.css(".add-subcompany-modal")).isPresent(),
          "Add subcompany dialog should hide");
      });
    });
  });
})();
