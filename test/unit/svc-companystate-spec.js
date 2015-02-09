/*jshint expr:true */
"use strict";

describe("Services: company state", function() {

  beforeEach(module("risevision.common.companystate"));
  beforeEach(module(function ($provide) {
    //stub services
    $provide.service("$q", function() {return Q;});
    $provide.value("$location", {
      search: function () {
        if (subCompany) {
          return {"cid": "RV_subcompany_id"};
        }
        else {
          return {};
        }
      }
    });
    $provide.factory("gapiLoader", [function () {

    }]);
    $provide.factory("getCompany", [function () {
      return function(companyId) {
        var deferred = Q.defer();
        
        apiCount++;
        if (companyId) {
          expect(companyId).to.equal("RV_subcompany_id");
          
          deferred.resolve({
            "id": "RV_subcompany_id",
            "parentId": "RV_parent_id",
            "name": "Sub Company"
          });
        }
        else {
          deferred.resolve({
            "id": "RV_parent_id",
            "parentId": "fb788f1f",
            "name": "Parent Company",
            "country": "CA"
          });
        }
        return deferred.promise;
      };
    }]);
  }));
  
  var companyState, subCompany, apiCount;
  
  beforeEach(function() {
    apiCount = 0;
  });
  
  describe("no selected company: ",function(){
    beforeEach(function(done){
      subCompany = false;
      
      inject(function($injector){
        companyState = $injector.get("companyState");
      });
      
      companyState.init();
      
      setTimeout(function() {
        done();
      }, 10);
    });
    
    it("should exist, also methods", function() {
      expect(companyState.init).to.be.ok;
      expect(companyState.switchCompany).to.be.ok;
      expect(companyState.updateCompanySettings).to.be.ok;
      ["init", "switchCompany", "updateCompanySettings", "resetCompany",
      "resetCompanyState", "getUserCompanyId", "getSelectedCompanyId", 
      "getSelectedCompanyName", "getSelectedCompanyCountry",
      "getCopyOfUserCompany", "getCopyOfSelectedCompany",
      "isSubcompanySelected", "isTestCompanySelected", "isSeller"].forEach(
      function (method) {
        expect(companyState).to.have.property(method);
        expect(companyState[method]).to.be.a("function");
      });
    });

    it("should initialize without selected company", function(done) {
      expect(apiCount).to.equal(1);
      expect(companyState.getUserCompanyId()).to.equal("RV_parent_id");
      expect(companyState.getSelectedCompanyId()).to.equal("RV_parent_id");
      expect(companyState.getSelectedCompanyName()).to.equal("Parent Company");
      expect(companyState.getSelectedCompanyCountry()).to.equal("CA");
      expect(companyState.isSubcompanySelected()).to.be.false;

      done();
    });
    
    it("should switch company", function(done) {
      companyState.switchCompany("RV_subcompany_id");
      
      setTimeout(function() {
        expect(apiCount).to.equal(2);
        expect(companyState.getUserCompanyId()).to.equal("RV_parent_id");
        expect(companyState.getSelectedCompanyId()).to.equal("RV_subcompany_id");
        expect(companyState.getSelectedCompanyName()).to.equal("Sub Company");
        expect(companyState.isSubcompanySelected()).to.be.true;
        
        done();
      },10);
    });
    
    it("should reset company", function(done) {
      companyState.switchCompany("RV_subcompany_id");
      
      setTimeout(function() {
        expect(companyState.getSelectedCompanyId()).to.equal("RV_subcompany_id");
        expect(companyState.isSubcompanySelected()).to.be.true;
        
        companyState.resetCompany();
        
        expect(apiCount).to.equal(2);
        expect(companyState.getSelectedCompanyId()).to.equal("RV_parent_id");
        expect(companyState.isSubcompanySelected()).to.be.false;
        
        done();
      },10);
    });
    
    it("should not make an extra api call if parent is used", function() {
      companyState.switchCompany("RV_parent_id");
      
      expect(apiCount).to.equal(1);
      expect(companyState.getSelectedCompanyId()).to.equal("RV_parent_id");
      expect(companyState.isSubcompanySelected()).to.be.false;
    });
  });
  
  describe("selected company: ", function() {
    beforeEach(function(){
      subCompany = true;
      
      inject(function($injector){
        companyState = $injector.get("companyState");
      });
    });
    
    it("should initialize with selected company", function(done) {
      subCompany = true;
      
      companyState.init();
      
      setTimeout(function() {
        expect(apiCount).to.equal(2);
        expect(companyState.getUserCompanyId()).to.equal("RV_parent_id");
        expect(companyState.getSelectedCompanyId()).to.equal("RV_subcompany_id");
        expect(companyState.getSelectedCompanyName()).to.equal("Sub Company");
        expect(companyState.isSubcompanySelected()).to.be.true;
        
        done();
      },10);
    });
  });

});