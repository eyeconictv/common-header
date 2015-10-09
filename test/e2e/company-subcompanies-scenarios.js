(function() {

  "use strict";

  var expect = require('rv-common-e2e').expect;
  var assert = require('rv-common-e2e').assert;
  var CommonHeaderPage = require('rv-common-e2e').commonHeaderPage;
  var CommonHeaderMenuPage = require('./pages/commonHeaderMenuPage.js');
  var AddSubcompanyModalPage = require('./pages/addSubcompanyModalPage.js');
  var SelectSubcompanyModalPage = require('./pages/selectSubcompanyModalPage.js');
  var CompanySettingsModalPage = require('./pages/companySettingsModalPage.js');
  var MoveCompanyModalPage = require('./pages/moveCompanyModalPage.js');
  var helper = require('rv-common-e2e').helper;

  browser.driver.manage().window().setSize(1280, 768);

  describe("Companies Settings", function() {
    this.timeout(2000);// to allow for protactor to load the seperate page
    var commonHeaderPage, 
      commonHeaderMenuPage,
      addSubcompanyModalPage,
      selectSubcompanyModalPage,
      companySettingsModalPage,
      moveCompanyModalPage;
      
    var companyUrl, subCompanyUrl, subCompanyCount;  
      
    before(function (){
      commonHeaderPage = new CommonHeaderPage();
      commonHeaderMenuPage = new CommonHeaderMenuPage();
      addSubcompanyModalPage = new AddSubcompanyModalPage();
      selectSubcompanyModalPage = new SelectSubcompanyModalPage();
      companySettingsModalPage = new CompanySettingsModalPage();
      moveCompanyModalPage = new MoveCompanyModalPage();

      browser.get("http://localhost:8099/test/e2e");

      //sign in, wait for spinner to go away
      helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader').then(function () {
        commonHeaderPage.signin();
      });
    });
    
    describe("Add subcompany", function () {
      before("Get company url", function(done) {
        browser.getCurrentUrl().then(function(value) {
          companyUrl = value;
          
          done();
        });  
      });
      
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
        addSubcompanyModalPage.getNameField().sendKeys("e2e test sub-company");
        addSubcompanyModalPage.getSaveButton().click();
        
        helper.waitRemoved(addSubcompanyModalPage.getAddSubcompanyModal(), "Sub-Company modal should hide");
      });
    });

    describe("Select Subcompany", function () {
      it("Opens select subcompany dialog", function (done) {
        commonHeaderMenuPage.getProfilePic().click();

        assert.eventually.isTrue(commonHeaderMenuPage.getSelectSubcompanyButton().isDisplayed(),
          "Select subcompany menu item should present");
        commonHeaderMenuPage.getSelectSubcompanyButton().click();
        
        helper.wait(selectSubcompanyModalPage.getSelectSubcompanyModal(), "Select Subcompany Modal");

        assert.eventually.isTrue(selectSubcompanyModalPage.getSelectSubcompanyModal().isDisplayed(),
          "Select subcompany dialog should show");
          
        helper.waitDisappear(selectSubcompanyModalPage.getLoader(), "Load Companies");

        selectSubcompanyModalPage.getCompanies().count().then(function(count) {
          subCompanyCount = count;
          
          done();            
        });
      });
      
      it("Switches to subcompany", function (done) {
        // assume first Company
        selectSubcompanyModalPage.getCompanies().get(0).click();
        
        helper.wait(commonHeaderMenuPage.getSubcompanyAlert(), "Subcompany Alert");

        assert.eventually.isTrue(commonHeaderMenuPage.getSubcompanyAlert().isDisplayed(),
          "Sub-company alert should show");
        expect(browser.getCurrentUrl()).to.eventually.not.equal(companyUrl);
        
        browser.getCurrentUrl().then(function(value) {
          subCompanyUrl = value;
          
          done();
        });
      });
      
      it("Shows sub-company details", function() {
        commonHeaderMenuPage.getProfilePic().click();

        assert.eventually.isFalse(commonHeaderMenuPage.getSelectSubcompanyButton().isDisplayed(),
          "Select subcompany menu item should not be present");
        assert.eventually.isTrue(commonHeaderMenuPage.getChangeSubcompanyButton().isDisplayed(),
          "Change subcompany menu item should be present");
        assert.eventually.isTrue(commonHeaderMenuPage.getResetSubcompanyButton().isDisplayed(),
          "Reset subcompany menu item should be present");
      });

      it("Switches back to parent company", function () {
        commonHeaderMenuPage.getResetSubcompanyButton().click();
        
        helper.waitDisappear(commonHeaderMenuPage.getSubcompanyAlert(), "Subcompany Alert");

        assert.eventually.isFalse(commonHeaderMenuPage.getSubcompanyAlert().isDisplayed(),
          "Sub-company alert should hide");

        expect(browser.getCurrentUrl()).to.eventually.equal(companyUrl);
      });

      it("Can specify subcompany via URL parameter", function () {
        browser.get(subCompanyUrl);
        
        helper.wait(commonHeaderMenuPage.getSubcompanyAlert(), "Subcompany Alert");

        assert.eventually.isTrue(commonHeaderMenuPage.getSubcompanyAlert().isDisplayed(),
          "Sub-company alert should show");
        assert.eventually.isFalse(commonHeaderMenuPage.getTestCompanyAlert().isDisplayed(),
          "Test company alert should not show");
      });
    });
    
    describe("Move company", function () {
      var subCompanyClaimId;
      
      it("Add another sub company", function(done) {
        helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader');

        commonHeaderMenuPage.getProfilePic().click();
        commonHeaderMenuPage.getAddSubcompanyButton().click();

        helper.wait(addSubcompanyModalPage.getAddSubcompanyModal(), "Add Subcompany Modal");

        addSubcompanyModalPage.getNameField().sendKeys("e2e test sub-sub-company");
        addSubcompanyModalPage.getSaveButton().click();
        
        helper.waitRemoved(addSubcompanyModalPage.getAddSubcompanyModal(), "Sub-Company modal should hide");
        
        commonHeaderMenuPage.getProfilePic().click();
        commonHeaderMenuPage.getChangeSubcompanyButton().click();
        
        helper.wait(selectSubcompanyModalPage.getSelectSubcompanyModal(), "Select Subcompany Modal");
        helper.waitDisappear(selectSubcompanyModalPage.getLoader(), "Load Companies");

        // assume first
        selectSubcompanyModalPage.getCompanies().get(0).click();
        
        helper.wait(commonHeaderMenuPage.getSubcompanyAlert(), "Subcompany Alert");
        
        commonHeaderMenuPage.getProfilePic().click();
        commonHeaderMenuPage.getCompanySettingsButton().click();
        
        helper.wait(companySettingsModalPage.getCompanySettingsModal(), "Comapny Settings Modal");        
        helper.waitDisappear(companySettingsModalPage.getLoader(), "Load Company Settings");
        
        companySettingsModalPage.getAuthKeyField().getText().then(function(value) {
          subCompanyClaimId = value;
          
          browser.get(companyUrl);
          
          done();
        });        
      });
      
      it("Opens Move Company Dialog", function() {
        helper.waitDisappear(commonHeaderMenuPage.getSubcompanyAlert(), "Subcompany Alert");
        helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader');

        commonHeaderMenuPage.getProfilePic().click();
        commonHeaderMenuPage.getAddSubcompanyButton().click();

        helper.wait(addSubcompanyModalPage.getAddSubcompanyModal(), "Add Subcompany Modal");

        assert.eventually.isTrue(addSubcompanyModalPage.getMoveButton().isDisplayed(),
          "Move company button should show");

        browser.sleep(500);

        addSubcompanyModalPage.getMoveButton().click();
        
        helper.wait(moveCompanyModalPage.getMoveCompanyModal(), "Move Company Modal");

        assert.eventually.isTrue(moveCompanyModalPage.getMoveCompanyModal().isDisplayed(),
          "Move company dialog should show");
      });

      it("Shows error on invalid auth key", function () {
        moveCompanyModalPage.getAuthKeyField().clear();
        moveCompanyModalPage.getAuthKeyField().sendKeys("invalid-auth-key");
        
        moveCompanyModalPage.getRetrieveDetailsButton().click();
        
        helper.waitDisappear(moveCompanyModalPage.getLoader(), "Move Company Loader");
        
        assert.eventually.isTrue(moveCompanyModalPage.getNotFoundMessage().isDisplayed(),
          "Error message should show");
        assert.eventually.isFalse(moveCompanyModalPage.getMoveButton().isDisplayed(),
          "Move company button should hide");
      });

      it("Retrieves Company Info", function () {
        moveCompanyModalPage.getAuthKeyField().clear();
        moveCompanyModalPage.getAuthKeyField().sendKeys(subCompanyClaimId);

        moveCompanyModalPage.getRetrieveDetailsButton().click();
        
        helper.waitDisappear(moveCompanyModalPage.getLoader(), "Move Company Loader");
        
        assert.eventually.isFalse(moveCompanyModalPage.getNotFoundMessage().isPresent(),
          "Error message should not show");
        assert.eventually.isTrue(moveCompanyModalPage.getMoveButton().isDisplayed(),
          "Move company button should show");
        assert.eventually.isTrue(moveCompanyModalPage.getCompanyDetailsMessage().isDisplayed(),
          "Company details info should show");
      });
      
      it("Should Move Company", function () {
        moveCompanyModalPage.getMoveButton().click();

        helper.waitDisappear(moveCompanyModalPage.getLoader(), "Move Company Loader");

        assert.eventually.isTrue(moveCompanyModalPage.getSuccessMessage().isDisplayed(),
          "Success message should show");
        assert.eventually.isFalse(moveCompanyModalPage.getMoveButton().isDisplayed(),
          "Move company button should hide");
      });

      it("Move Company Dialog Should Close", function () {
        moveCompanyModalPage.getCloseButton().click();
        
        helper.waitDisappear(moveCompanyModalPage.getMoveCompanyModal(), "Move Company Modal");
        
        assert.eventually.isFalse(moveCompanyModalPage.getMoveCompanyModal().isPresent(),
          "Move company dialog should hide");
      });

      it("Closes Add subcompany Dialog", function () {
        addSubcompanyModalPage.getCloseButton().click();
        
        assert.eventually.isFalse(addSubcompanyModalPage.getAddSubcompanyModal().isPresent(),
          "Add subcompany dialog should hide");
      });

      it("Verify there are 2 sub-companies", function() {
        commonHeaderMenuPage.getProfilePic().click();
        commonHeaderMenuPage.getSelectSubcompanyButton().click();
        
        helper.wait(selectSubcompanyModalPage.getSelectSubcompanyModal(), "Select Subcompany Modal");
        helper.waitDisappear(selectSubcompanyModalPage.getLoader(), "Load Companies");

        assert.eventually.equal(selectSubcompanyModalPage.getCompanies().count(), subCompanyCount + 1,
          "Company should now have 2 sub-companies");
      });

      after("Close sub-company modal dialog", function() {
        selectSubcompanyModalPage.getCloseButton().click();
      });
    });
    
    describe("Delete Company", function () {
      it("Switch to sub-company", function() {
        commonHeaderMenuPage.getProfilePic().click();
        commonHeaderMenuPage.getSelectSubcompanyButton().click();
        
        helper.wait(selectSubcompanyModalPage.getSelectSubcompanyModal(), "Select Subcompany Modal");
        helper.waitDisappear(selectSubcompanyModalPage.getLoader(), "Load Companies");

        // pick first
        selectSubcompanyModalPage.getCompanies().get(0).click();

        helper.wait(commonHeaderMenuPage.getSubcompanyAlert(), "Subcompany Alert");
      });
      
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

    after("Clean up remaining companies", function() {
      for (var i = 0; i < subCompanyCount - 1; i++) {
        commonHeaderMenuPage.getProfilePic().click();
        commonHeaderMenuPage.getSelectSubcompanyButton().click();
        
        helper.wait(selectSubcompanyModalPage.getSelectSubcompanyModal(), "Select Subcompany Modal");
        helper.waitDisappear(selectSubcompanyModalPage.getLoader(), "Load Companies");
    
        // pick first
        selectSubcompanyModalPage.getCompanies().get(0).click();
        
        helper.wait(commonHeaderMenuPage.getSubcompanyAlert(), "Subcompany Alert");
    
        commonHeaderMenuPage.getProfilePic().click();
        commonHeaderMenuPage.getCompanySettingsButton().click();        
        
        helper.wait(companySettingsModalPage.getCompanySettingsModal(), "Comapny Settings Modal");
        helper.waitDisappear(companySettingsModalPage.getLoader(), "Load Company Settings");
        
        companySettingsModalPage.getDeleteButton().click();
    
        // confirm delete
        browser.switchTo().alert().then(function (prompt){ prompt.accept(); });
    
        helper.waitDisappear(commonHeaderMenuPage.getSubcompanyAlert(), "Subcompany Alert");
      }
    });

  });
})();
