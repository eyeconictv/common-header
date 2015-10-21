"use strict";

/*jshint -W030 */
/*global sinon*/

describe("controller: help send us a note modal ", function() {
  beforeEach(module("risevision.common.header"));
  beforeEach(module(function ($provide, $translateProvider) {

    $provide.factory("supportFactory", function ($q) {
      return {
        initiateTrial : function() {
          var deferred = $q.defer();
          deferred.resolve({});
          return deferred.promise;
        },
        openIntercomChat : function() {
          return;
        }
      };
    });

    $provide.service("$modalInstance",function(){
      return {
        dismiss : function(){
          return;
        }
      };
    });

    $provide.factory("subscriptionStatus", function () {
      return {
      };
    });

    $provide.value("SUPPORT_PRODUCT_URL", function (){
      return;
    });

    $provide.factory("customLoader", function ($q) {
      return function () {
        var deferred = $q.defer();
        deferred.resolve({});
        return deferred.promise;
      };
    });

    $translateProvider.useLoader("customLoader");
        
  }));
  var $scope, initiateTrialSpy, modalInstanceDismissSpy, openIntercomChatSpy;
  
  beforeEach(function() {

    inject(function($injector,$rootScope, $controller, supportFactory, $modalInstance, subscriptionStatus, SUPPORT_PRODUCT_URL){
      $scope = $rootScope.$new();
      initiateTrialSpy = sinon.spy(supportFactory, "initiateTrial");
      openIntercomChatSpy = sinon.spy(supportFactory, "openIntercomChat");
      modalInstanceDismissSpy = sinon.spy($modalInstance, "dismiss");

      $controller("HelpSendUsANoteModalCtrl", {
        $scope : $scope,
        $modalInstance: $modalInstance,
        subscriptionStatus: subscriptionStatus,
        supportFactory: supportFactory,
        SUPPORT_PRODUCT_URL: SUPPORT_PRODUCT_URL
      });
      $scope.$digest();
    });
  });
  
  it("should initialize",function(){
    expect($scope).to.be.truely;
    expect($scope.startTrial).to.exist;
    expect($scope.sendUsANote).to.exist;
    expect($scope.prioritySupport).to.exist;
    expect($scope.dismiss).to.exist;
  });

  describe("start trial: ", function() {
    it("should call initiateTrial and dismiss the modal",function(){
      $scope.startTrial();
      $scope.$digest();
      initiateTrialSpy.should.have.been.called;
      modalInstanceDismissSpy.should.have.been.called;
    });
  });

  describe("dismiss the modal: ", function() {

    it("should dismiss the modal",function(){
      $scope.dismiss();
      modalInstanceDismissSpy.should.have.been.called;
    });
  });

  describe("send us a note: ", function() {

    it("should open the intercom chat",function(){
      $scope.sendUsANote();
      openIntercomChatSpy.should.have.been.called;
      modalInstanceDismissSpy.should.have.been.called;
    });
  });

  describe("priority support: ", function() {

    it("should open the intercom chat",function(){
      $scope.prioritySupport();
      openIntercomChatSpy.should.have.been.called;
      modalInstanceDismissSpy.should.have.been.called;
    });
  });
});
  
