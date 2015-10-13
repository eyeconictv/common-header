/*globals element, by */
(function(module) {
  'use strict';

  var CommonHeaderMenuPage = function () {
    var registerUserButton = element(by.css(".register-user-menu-button"));
    var profilePic = element(by.css(".user-profile-dropdown img.profile-pic"));
    
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
    
    var signOutButton = element(by.css(".dropdown-menu .sign-out-button"));
    var signOutModal = element(by.css(".sign-out-modal"));
    var signOutRvOnlyButton = element(by.css(".sign-out-modal .sign-out-rv-only-button"));

    this.getRegisterUserButton = function() {
      return registerUserButton;
    };
    
    this.getProfilePic = function() {
      return profilePic;
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
    
    this.getSignOutButton = function() {
      return signOutButton;
    };
    
    this.getSignOutModal = function() {
      return signOutModal;
    };
    
    this.getSignOutRvOnlyButton = function() {
      return signOutRvOnlyButton;
    };

  };

  module.exports = CommonHeaderMenuPage;
})(module);
