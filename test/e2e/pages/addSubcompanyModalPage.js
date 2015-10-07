/*globals element, by */
(function(module) {
  'use strict';

  var AddSubcompanyModalPage = function () {
    var addSubcompanyModal = element(by.css(".add-subcompany-modal"));
    var loader = element(by.xpath('//div[@spinner-key="add-subcompany-modal"]'));
    var nameField = element(by.id("company-settings-name"));
    
    var saveButton = element(by.css(".add-subcompany-save-button"));
    var closeButton = element(by.css(".cancel-add-subcompany-button"));
    var moveButton = element(by.css(".move-subcompany-button"));
    
    this.getAddSubcompanyModal = function() {
      return addSubcompanyModal;
    };
    
    this.getLoader = function() {
      return loader;
    };
    
    this.getNameField = function() {
      return nameField;
    };

    this.getSaveButton = function() {
      return saveButton;
    };
    
    this.getCloseButton = function() {
      return closeButton;
    };
    
    this.getMoveButton = function() {
      return moveButton;
    };
    
  };

  module.exports = AddSubcompanyModalPage;
})(module);
