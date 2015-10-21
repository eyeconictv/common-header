/*globals element, by */
(function(module) {
  'use strict';

  var HelpDropdownPage = function () {
    var helpDropdownButton = element(by.id("helpDropdownButton"));
    var askCommunityButton = element(by.id("askCommunityButton"));
    var prioritySupportButton = element(by.id("prioritySupportButton"));
    var sendUsANoteButton = element(by.id("sendUsANoteButton"));
    var signUpForTrainingButton = element(by.id("signUpForTrainingButton"));
    var documentationButton = element(by.id("documentationButton"));

    var prioritySupportModal = element(by.id("prioritySupportModal"));
    var prioritySupportModalCloseButton = element(by.id("prioritySupportModalCloseButton"));

    var intercomMessenger = element(by.id("intercom-messenger"));

    this.getHelpDropdownButton = function() {
      return helpDropdownButton;
    };

    this.getAskCommunityButton = function() {
      return askCommunityButton;
    };

    this.getPrioritySupportButton = function() {
      return prioritySupportButton;
    };

    this.getSendUsANoteButton = function() {
      return sendUsANoteButton;
    };

    this.getSignUpForTrainingButton = function() {
      return signUpForTrainingButton;
    };

    this.getDocumentationButton = function() {
      return documentationButton;
    };

    this.getPrioritySupportModal = function() {
      return prioritySupportModal;
    };

    this.getPrioritySupportModalCloseButton = function() {
      return prioritySupportModalCloseButton;
    };

    this.getIntercomMessenger = function() {
      return intercomMessenger;
    };
  };

  module.exports = HelpDropdownPage;
})(module);
