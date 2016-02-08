"use strict";

/*jshint -W030 */

describe("controller: signout button ", function() {
  beforeEach(module("risevision.common.header"));
  beforeEach(module(function ($provide, $translateProvider) {
    $provide.factory("uiFlowManager", function(){
      return {
        invalidateStatus : function(status){
          invalidatedStatus = status;
        }
      };
    });
    
    $provide.service("$modal",function(){
      return {
        open : function(obj){
          expect(obj).to.be.ok;
          var deferred = Q.defer();
          if(confirmResponse){
            deferred.resolve();
          }else{
            deferred.reject();
          }
          
          return {
            result: deferred.promise
          };
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
  var $scope, invalidatedStatus, confirmResponse;
  
  beforeEach(function() {
    confirmResponse = true;
    invalidatedStatus = undefined;
    inject(function($injector, $rootScope, $controller){
      $scope = $rootScope.$new();

      $controller("SignOutButtonCtrl", {
        $scope : $scope,
        $modal : $injector.get("$modal"),
        uiFlowManager: $injector.get("uiFlowManager")
      });
      $scope.$digest();
    });
  });
  
  it("should initialize",function(){
    expect($scope).to.be.truely;
    expect($scope.logout).to.exist;
  });

  it("should sign out user: ", function(done) {
    $scope.logout();

    setTimeout(function() {
      expect(invalidatedStatus).to.equal("registrationComplete");

      done();
    }, 10);
  });

});
  
