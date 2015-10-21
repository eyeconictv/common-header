/*jshint expr:true */

describe("Services: Support Factory", function() {
  beforeEach(module("risevision.widget.common.subscription-status"));
  beforeEach(module("risevision.common.support"));
  var supportFactory, startTrialCallWentOkay, subscriptionStatusGetCallWentOkay, subscriptionStatus, modalObject, intercomSpy, userId, identifyObject;

  beforeEach(module(function ($provide, $translateProvider) {
    //stub services
    $provide.service("$q", function() {return Q;});
    $provide.factory("userState", [function () {
      return {
        getUsername: function () {return "John"; },
        getSelectedCompanyId : function () {return "companyId";}
      };
    }]);

    $provide.service("subscriptionStatusService", function () {
      return {
        get : function(){
          var deferred = Q.defer();
          if(subscriptionStatusGetCallWentOkay){
            deferred.resolve(subscriptionStatus);
          } else{
            deferred.reject({});
          }
          return deferred.promise;
        }
      };
    });

    $provide.service("segmentAnalytics", function () {
      return {
        identify : function(id, obj){
          userId = id;
          identifyObject = obj;
        }
      };
    });

    $provide.service("$modal",function(){
      return {
        open : function(obj){

          var deferred = Q.defer();

          modalObject = obj;

          deferred.resolve({});

          return {
            result: deferred.promise
          };
        }
      };
    });

    $provide.service("$window",function(){
      return {
        Intercom : function(){
        }
      };
    });

    $provide.service("$http",function(){
      return {
        get : function(){
            var deferred = Q.defer();
            if(startTrialCallWentOkay){
              deferred.resolve({});
            } else{
              deferred.reject({});
            }
            return deferred.promise;
        }
      };
    });

    $provide.factory("customLoader", function () {
      return function () {
        var deferred = Q.defer();
        deferred.resolve({});
        return deferred.promise;
      };
    });

    $translateProvider.useLoader("customLoader");

    $provide.value("SUPPORT_PRODUCT_CODE", "product_code");
    $provide.value("STORE_SERVER_URL", "store_server_url");


  }));

  beforeEach(function() {
    subscriptionStatus = {};
    modalObject = {};
    inject(function($injector, $window){
      intercomSpy = sinon.spy($window, "Intercom");
      supportFactory = $injector.get("supportFactory");

    });
  });

  it("should exist", function() {
    expect(supportFactory).to.be.truely;

    expect(supportFactory.handlePrioritySupportAction).to.be.a("function");
    expect(supportFactory.openIntercomChat).to.be.a("function");
    expect(supportFactory.initiateTrial).to.be.a("function");
    expect(supportFactory.handleSendUsANote).to.be.a("function");
  });

  describe("Priority Support:", function() {
    it("should open trial support modal when is subscribed and on trial", function (done) {
      subscriptionStatusGetCallWentOkay = true;
      subscriptionStatus.statusCode = "on-trial";
      supportFactory.handlePrioritySupportAction();

      setTimeout(function () {
        expect(modalObject.controller).to.be.equal("HelpPrioritySupportModalCtrl");

        done();
      }, 10);
    });

    it("should open trial support modal and the intercom chat when is subscribed and on trial", function (done) {
      subscriptionStatusGetCallWentOkay = true;
      subscriptionStatus.statusCode = "on-trial";
      supportFactory.handlePrioritySupportAction();

      setTimeout(function () {
        expect(modalObject.controller).to.be.equal("HelpPrioritySupportModalCtrl");
        intercomSpy.should.have.been.calledWith("showNewMessage");

        expect(userId).to.be.equal("John");
        expect(identifyObject.plan).to.equal("Trial");
        done();
      }, 10);
    });

    it("should not open trial support modal when is subscribed but not on trial", function (done) {
      subscriptionStatusGetCallWentOkay = true;
      subscriptionStatus.statusCode = "subscribed";
      supportFactory.handlePrioritySupportAction();

      setTimeout(function () {
        expect(modalObject).to.be.empty;
        intercomSpy.should.have.been.calledWith("showNewMessage");
        expect(userId).to.be.equal("John");
        expect(identifyObject.plan).to.equal("Premium");
        done();
      }, 10);
    });

    it("should open trial support modal but not the intercom chat when subscription was cancelled", function (done) {
      subscriptionStatusGetCallWentOkay = true;
      subscriptionStatus.statusCode = "cancelled";
      supportFactory.handlePrioritySupportAction();

      setTimeout(function () {
        expect(modalObject.controller).to.be.equal("HelpPrioritySupportModalCtrl");
        intercomSpy.should.not.have.been.calledWith("showNewMessage");
        expect(userId).to.be.equal("John");
        expect(identifyObject.plan).to.equal("Free");
        done();
      }, 10);
    });

    it("should open trial support modal but not the intercom chat when not subscribed", function (done) {
      subscriptionStatusGetCallWentOkay = true;
      subscriptionStatus.statusCode = "not-subscribed";
      supportFactory.handlePrioritySupportAction();

      setTimeout(function () {
        expect(modalObject.controller).to.be.equal("HelpPrioritySupportModalCtrl");
        intercomSpy.should.not.have.been.calledWith("showNewMessage");
        expect(userId).to.be.equal("John");
        expect(identifyObject.plan).to.equal("Free");
        done();
      }, 10);
    });

    it("should open trial support modal but not the intercom chat when subscription was suspended", function (done) {
      subscriptionStatusGetCallWentOkay = true;
      subscriptionStatus.statusCode = "suspended";
      supportFactory.handlePrioritySupportAction();

      setTimeout(function () {
        expect(modalObject.controller).to.be.equal("HelpPrioritySupportModalCtrl");
        intercomSpy.should.not.have.been.calledWith("showNewMessage");
        expect(userId).to.be.equal("John");
        expect(identifyObject.plan).to.equal("Free");
        done();
      }, 10);
    });

    it("should open trial support modal but not the intercom chat when trial is expired", function (done) {
      subscriptionStatusGetCallWentOkay = true;
      subscriptionStatus.statusCode = "trial-expired";
      supportFactory.handlePrioritySupportAction();

      setTimeout(function () {
        expect(modalObject.controller).to.be.equal("HelpPrioritySupportModalCtrl");
        intercomSpy.should.not.have.been.calledWith("showNewMessage");
        expect(userId).to.be.equal("John");
        expect(identifyObject.plan).to.equal("Free");
        done();
      }, 10);
    });

    it("should open trial support modal but not the intercom chat when trial is available", function (done) {
      subscriptionStatusGetCallWentOkay = true;
      subscriptionStatus.statusCode = "trial-available";
      supportFactory.handlePrioritySupportAction();

      setTimeout(function () {
        expect(modalObject.controller).to.be.equal("HelpPrioritySupportModalCtrl");
        intercomSpy.should.not.have.been.calledWith("showNewMessage");
        expect(userId).to.be.equal("John");
        expect(identifyObject.plan).to.equal("Free");
        done();
      }, 10);
    });
  });

  describe("Intercom Chat:", function() {

    it("should open the intercom chat", function (done) {
      supportFactory.openIntercomChat();

      setTimeout(function () {
        intercomSpy.should.have.been.calledWith("showNewMessage");
        done();
      }, 10);
    });
  });

  describe("Initiate Trial:", function() {
    it("should open priority support modal after initiating trial", function (done){
      subscriptionStatusGetCallWentOkay = true;
      subscriptionStatus.statusCode = "on-trial";
      startTrialCallWentOkay = true;
      supportFactory.initiateTrial();

      setTimeout(function () {
        expect(modalObject.controller).to.be.equal("HelpPrioritySupportModalCtrl");

        done();
      }, 10);
    });

    it("should not open priority support modal when initiating trial call fails", function (done){
      startTrialCallWentOkay = false;
      supportFactory.initiateTrial();

      setTimeout(function () {
        expect(modalObject).to.be.empty;

        done();
      }, 10);
    });
  });


  describe("Send us a note:", function() {
    it("should open send us a note modal when subscribed", function (done){
      subscriptionStatusGetCallWentOkay = true;
      subscriptionStatus.statusCode = "subscribed";
      supportFactory.handleSendUsANote();

      setTimeout(function () {
        expect(modalObject.controller).to.be.equal("HelpSendUsANoteModalCtrl");

        done();
      }, 10);
    });

    it("should open send us a note modal when not subscribed", function (done){
      subscriptionStatusGetCallWentOkay = true;
      subscriptionStatus.statusCode = "not-subscribed";
      supportFactory.handleSendUsANote();

      setTimeout(function () {
        expect(modalObject.controller).to.be.equal("HelpSendUsANoteModalCtrl");

        done();
      }, 10);
    });
  });

});
