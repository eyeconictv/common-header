/*globals element, by */
(function(module) {
  'use strict';

  var HomePage = function () {
    var url = "http://localhost:8099/test/e2e";
    
    var registerUserButton = element(by.css(".register-user-menu-button"));
    
    var userSettingsButton = element(by.css(".dropdown-menu .user-settings-button"));
    var companyUsersButton = element(by.css(".dropdown-menu .company-users-menu-button"));
    var companySettingsButton = element(by.css(".dropdown-menu .company-settings-menu-button"));
    var addSubcompanyButton = element(by.css(".dropdown-menu .add-subcompany-menu-button"));
    var selectSubcompanyButton = element(by.id("select-subcompany-button"));
    var changeSubcompanyButton = element(by.id("change-subcompany-button"));
    var resetSubcompanyButton = element(by.id("reset-subcompany-button"));
    
    var systemMessagesButton = element(by.css(".dropdown .system-messages-button"));
    var systemMessagesBadge = element(by.css(".dropdown .system-messages-badge"));
    
    var subcompanyAlert = element(by.css(".common-header-alert.sub-company-alert"));
    var testCompanyAlert = element(by.css(".sub-company-alert.test-company-alert"));

    this.get = function() {
      browser.get(url);
    };

    this.getRegisterUserButton = function() {
      return registerUserButton;
    };
    
    this.getUserSettingsButton = function() {
      return userSettingsButton;
    };
    
    this.getCompanyUsersButton = function() {
      return companyUsersButton;
    };
    
    this.getCompanySettingsButton = function() {
      return companySettingsButton;
    };
    
    this.getAddSubcompanyButton = function() {
      return addSubcompanyButton;
    };
    
    this.getSelectSubcompanyButton = function() {
      return selectSubcompanyButton;
    };
    
    this.getChangeSubcompanyButton = function() {
      return changeSubcompanyButton;
    };

    this.getResetSubcompanyButton = function() {
      return resetSubcompanyButton;
    };
    
    this.getSystemMessagesButton = function() {
      return systemMessagesButton;
    };
    
    this.getSystemMessagesBadge = function() {
      return systemMessagesBadge;
    };
    
    this.getSubcompanyAlert = function() {
      return subcompanyAlert;
    };
    
    this.getTestCompanyAlert = function() {
      return testCompanyAlert;
    };

  };

  module.exports = HomePage;
})(module);
