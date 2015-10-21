"use strict";

/*jshint -W030 */
/*global sinon*/

describe("controller: help buttons ", function() {
  beforeEach(module("risevision.common.header"));
  beforeEach(module(function ($provide, $translateProvider) {

    $provide.service("userState", function(){
      return {
        isLoggedIn : function(){
          return isLoggedInValue;
        },
        isRiseVisionUser : function() {
          return isRiseVisionUser;
        },
        _restoreState: function () {

        }
      };
    });

    $provide.factory("supportFactory", function () {
      return {
        handlePrioritySupportAction : function(){
          return;
        },
        handleSendUsANote : function(){
          return;
        }
      };
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
  var $scope, isLoggedInValue, isRiseVisionUser, handlePrioritySupportActionSpy, handleSendUsANoteSpy;
  
  beforeEach(function() {

    isLoggedInValue = false;
    isRiseVisionUser = false;
    inject(function($injector,$rootScope, $controller, userState, supportFactory){
      $scope = $rootScope.$new();
      handlePrioritySupportActionSpy = sinon.spy(supportFactory, "handlePrioritySupportAction");
      handleSendUsANoteSpy = sinon.spy(supportFactory, "handleSendUsANote");

      $controller("HelpDropdownButtonCtrl", {
        $scope : $scope,
        userState : userState,
        supportFactory: supportFactory
      });
      $scope.$digest();
    });
  });
  
  it("should initialize",function(){
    expect($scope).to.be.truely;
    expect($scope.isLoggedIn).to.exist;
    expect($scope.isRiseVisionUser).to.exist;
    expect($scope.openPrioritySupport).to.exist;
    expect($scope.openSendUsANote).to.exist;
  });

  describe("logged in user: ", function() {

    it("should get that the user is logged in", function() {
      isLoggedInValue = true;
      $scope.$digest();
      expect( $scope.isLoggedIn).to.be.true;
    });

    it("should get that the user is risevision user", function() {
      isRiseVisionUser = true;
      $scope.$digest();
      expect( $scope.isRiseVisionUser).to.be.true;
    });
  });

  describe("handle button actions: ", function() {
    it("should call the handlePrioritySupportAction when running the open priority support", function() {
      $scope.openPrioritySupport();
      handlePrioritySupportActionSpy.should.have.been.called;
    });

    it("should call the handleSendUsANote when running the open send us a note", function() {
      $scope.openSendUsANote();
      handleSendUsANoteSpy.should.have.been.called;
    });
  });
});
  
