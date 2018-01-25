/*jshint expr:true */

"use strict";

describe("Services: googleAuthFactory", function() {
  var path = "";

  beforeEach(module("risevision.common.components.userstate"));

  beforeEach(module(function ($provide) {
    //stub services
    $provide.service("$q", function() {return Q;});
    $provide.value("$location", {
      search: function () {
        return {};
      },
      path: sinon.spy(function () {
        return path;
      }),
      protocol: function () {
        return "protocol";
      },
      url: function() {
        return "";
      },
      $$html5: true
    });
    $provide.value("$stateParams", {
      state: "someState"
    });
    $provide.service("getBaseDomain", function() {
      return function() {
        return "domain";
      };
    });
    $provide.service("userState", function() {
      return userState = {
        _state: {
          inRVAFrame: false,
          userToken: {
            email: "username@test.com"
          },
          params: {
            access_token: "testToken"
          }
        },
        refreshProfile: sinon.spy(function() { return Q.resolve(); }),
        _setUserToken: sinon.spy(),
        _persistState: sinon.spy(),
        _restoreState: sinon.spy()
      };
    });
    $provide.service("uiFlowManager", function() {
      return uiFlowManager = {
        persist: sinon.spy()
      };
    });
    $provide.value("$rootScope", $rootScope = {
      redirectToRoot: true,
      $on: function() {}
    });
    $provide.service("urlStateService", function() {
      return urlStateService = {
        clearStatePath: function() {
          return "clearedPath";
        },
        redirectToState: sinon.spy()
      };
    });

    authInstance = {
      isSignedIn: {
        get: sinon.spy(function() {
          return isSignedIn;
        })
      },
      signIn: sinon.spy(function() {
        if (isSignedIn) {
          return Q.resolve();
        } else {
          return Q.reject("popup closed");
        }
      })
    };

    $provide.service("auth2APILoader", function () {
      return auth2APILoader = sinon.spy(function() {
        return Q.resolve({
          getAuthInstance: function() {
            return authInstance;
          }
        });
      });
    });

    $provide.service("getOAuthUserInfo", function() {
      return function() {
        var deferred = Q.defer();
        if (failOAuthUser) {
          deferred.reject("oauth failure");
        } else {
          deferred.resolve({
            email: "someuser@awesome.io"
          });
        }
        
        return deferred.promise;
      };
    });

  }));
  
  var googleAuthFactory, userState, uiFlowManager, $window, $rootScope, 
    urlStateService, auth2APILoader, authInstance;
    
  var isSignedIn, failOAuthUser;
  
  describe("authenticate: ", function() {
    beforeEach(function() {
      isSignedIn = true;
      failOAuthUser = false;

      inject(function($injector){
        $window = $injector.get("$window");
        googleAuthFactory = $injector.get("googleAuthFactory");
      });
    });

    it("should exist, return a promise", function() {
      expect(googleAuthFactory.authenticate).to.be.ok;
      expect(googleAuthFactory.authenticate).to.be.a("function");

      expect(googleAuthFactory.authenticate().then).to.be.a("function");
      expect(googleAuthFactory.authenticate(true).then).to.be.a("function");
    });

    describe("_gapiAuthorize: ", function() {
      it("should load gapi.auth2 and attempt to authorize user", function(done) {
        googleAuthFactory.authenticate();
        
        setTimeout(function() {
          auth2APILoader.should.have.been.called;
          authInstance.isSignedIn.get.should.have.been.called;

          done();
        }, 10);
      });
      
      it("should handle authorization failure", function(done) {
        isSignedIn = false;

        googleAuthFactory.authenticate()
        .then(done)
        .then(null, function(error) {
          expect(error).to.equal("failed to authorize user");
          done();
        })
        .then(null,done);
      });
    });
    
    describe("getOAuthUserInfo: ", function() {
      it("should handle failure to retrieve oauthUserInfo", function(done) {
        failOAuthUser = true;

        googleAuthFactory.authenticate().then(function(resp) {
          done(resp);
        })
        .then(null, function(error) {
          expect(error).to.equal("oauth failure");
          done();
        })
        .then(null,done);
      });

      it("should retrieve oauthUserInfo correctly", function(done) {
        googleAuthFactory.authenticate().then(function(resp) {
          urlStateService.redirectToState.should.not.have.been.called;

          expect(resp).to.deep.equal({ email: "someuser@awesome.io" });

          done();
        })
        .then(null,done);
      });
      
      it("should redirect and clear state if present", function(done) {
        userState._state.redirectState = "someState";

        googleAuthFactory.authenticate().then(function() {
          urlStateService.redirectToState.should.have.been.calledWith("someState");

          expect(userState._state.redirectState).to.be.undefined;

          done();
        })
        .then(null,done);
      });
    });
  });

  describe("forceAuthenticate", function() {
    beforeEach(module(function ($provide) {
      $provide.value("$window", {
        location: {
          href: "http://localhost:8000/editor/list?cid=companyId#somehash",
          origin: "http://localhost:8000",
          pathname: "/editor/list",
          search: "?cid=companyId",
          hash: ""
        }
      });
    }));

    beforeEach(function() {
      inject(function($injector){
        $window = $injector.get("$window");
        googleAuthFactory = $injector.get("googleAuthFactory");
      });
    });

    it("should save current state variables", function() {
      googleAuthFactory.authenticate(true);

      expect(userState._state.redirectState).to.equal("someState");
      
      userState._persistState.should.have.been.called;
      uiFlowManager.persist.should.have.been.called;
    });

    it("should authenticate with the default options", function(done) {
      isSignedIn = true;

      googleAuthFactory.authenticate(true);
      
      setTimeout(function() {
        auth2APILoader.should.have.been.called;
        authInstance.signIn.should.have.been.called;
        authInstance.isSignedIn.get.should.not.have.been.called;

        expect(authInstance.signIn.args[0][0]).to.deep.equal({
          "response_type":"token",
          "prompt":"select_account",
          "cookie_policy":"protocol://domain",
          "ux_mode":"redirect",
          "redirect_uri":"http://localhost:8000/"
        });

        done();
      }, 10);
    });
    
    it("should strip params for redirect_uri", function(done) {
      $rootScope.redirectToRoot = false;

      googleAuthFactory.authenticate(true);
      
      setTimeout(function() {
        expect(userState._state.redirectState).to.equal("clearedPath");
        
        expect(authInstance.signIn.args[0][0]).to.deep.equal({
          "response_type":"token",
          "prompt":"select_account",
          "cookie_policy":"protocol://domain",
          "ux_mode":"redirect",
          "redirect_uri":"http://localhost:8000/editor/list?cid=companyId"
        });

        done();
      }, 10);
    });

    it("should authenticate with popup via select_account", function(done) {
      userState._state.inRVAFrame = true;

      googleAuthFactory.authenticate(true);
      
      setTimeout(function() {
        expect(authInstance.signIn.args[0][0]).to.deep.equal({
          "response_type":"token",
          "prompt":"select_account",
          "cookie_policy":"protocol://domain",
          "ux_mode":"popup",
          "redirect_uri":"http://localhost:8000/"
        });

        done();
      }, 10);
    });
    
    it("should authenticate with popup via select_account if in iframe", function(done) {
      $window.self = 1;
      $window.top = 0;
      googleAuthFactory.authenticate(true);
      
      setTimeout(function() {
        expect(authInstance.signIn.args[0][0]).to.deep.equal({
          "response_type":"token",
          "prompt":"select_account",
          "cookie_policy":"protocol://domain",
          "ux_mode":"popup",
          "redirect_uri":"http://localhost:8000/"
        });

        done();
      }, 10);
    });
    
    it("should authorize user after popup authentication", function(done) {
      userState._state.inRVAFrame = true;

      isSignedIn = true;
      failOAuthUser = false;

      googleAuthFactory.authenticate(true).then(function(resp) {
        authInstance.signIn.should.have.been.called;
        authInstance.isSignedIn.get.should.have.been.called;

        expect(resp).to.deep.equal({ email: "someuser@awesome.io" });

        done();
      })
      .then(null,done);
    });

    it("should reject if user closes popup authentication", function(done) {
      userState._state.inRVAFrame = true;

      isSignedIn = false;

      googleAuthFactory.authenticate(true)
        .then(done)
        .then(null, function(error) {
          authInstance.signIn.should.have.been.called;
          authInstance.isSignedIn.get.should.not.have.been.called;

          expect(error).to.equal("popup closed");
          done();
        })
        .then(null,done);
    });


  });

});
