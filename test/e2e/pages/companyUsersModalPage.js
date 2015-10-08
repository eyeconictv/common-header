/*globals element, by */
(function(module) {
  'use strict';

  var CompanyUsersModalPage = function () {
    var companyUsersModal = element(by.css(".company-users-modal"));
    var loader = element(by.xpath('//div[@spinner-key="company-users-list"]'));

    var usersList = element.all(by.css(".company-users-list-item"));
    var users = element.all(by.css(".company-users-list-item .list-group-item-text"));
    
    var addUserButton = element(by.css("button.add-company-user-button"));
    var closeButton = element(by.css("button.close-company-users-button"));
    
    this.getCompanyUsersModal = function() {
      return companyUsersModal;
    };
    
    this.getLoader = function() {
      return loader;
    };
    
    this.getUsersList = function() {
      return usersList;
    };
    
    this.getUsers = function() {
      return users;
    };
    
    this.getAddUserButton = function() {
      return addUserButton;
    };
    
    this.getCloseButton = function() {
      return closeButton;
    };
    
  };

  module.exports = CompanyUsersModalPage;
})(module);
