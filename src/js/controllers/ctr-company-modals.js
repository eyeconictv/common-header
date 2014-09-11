angular.module("risevision.common.header")
.controller("SubCompanyModalCtrl", ["$scope", "$modalInstance", "$modal",
  "$templateCache", "createCompany", "COUNTRIES", "REGIONS_CA", "REGIONS_US",
  function($scope, $modalInstance, $modal, $templateCache, createCompany, COUNTRIES, REGIONS_CA, REGIONS_US) {

    $scope.company = {};
    $scope.countries = COUNTRIES;
    $scope.regionsCA = REGIONS_CA;
    $scope.regionsUS = REGIONS_US;


    $scope.closeModal = function() {
      $modalInstance.dismiss("cancel");
    };
    $scope.save = function () {
      createCompany($scope.company).then(function () {
        $modalInstance.close("success");
      });
    };
    // Show Move Company Modal
    $scope.moveCompany = function(size) {
      // var modalInstance =
      $modal.open({
        template: $templateCache.get("move-company-modal.html"),
        controller: "MoveCompanyModalCtrl",
        size: size
      });
    };
  }
])

.controller("MoveCompanyModalCtrl", ["$scope", "$modalInstance", "moveCompany",
  function($scope, $modalInstance, moveCompany) {

    $scope.company = {};

    $scope.closeModal = function() {
      $modalInstance.dismiss("cancel");
    };

    $scope.moveCompany = function () {
      moveCompany($scope.companyId, $scope.parentCompanyId).then(function () {
        alert("Success. The company has been moved under your company.");
        $modalInstance.close("success");
      }, function (err) {alert("Error: "  + err); });
    };

    $scope.getCompany = function () {

    };
  }
])

.controller("CompanySettingsModalCtrl", ["$scope", "$modalInstance",
  "companyService", "companyId", "COUNTRIES", "REGIONS_CA", "REGIONS_US",
  function($scope, $modalInstance, companyService, companyId,
  COUNTRIES, REGIONS_CA, REGIONS_US) {
    $scope.company = {id: companyId};
    $scope.countries = COUNTRIES;
    $scope.regionsCA = REGIONS_CA;
    $scope.regionsUS = REGIONS_US;

    if(companyId) {
      companyService.getCompany(companyId).then(
        function (company) {
          $scope.company = company;
        },
        function (resp) {
          alert("An error has occurred.", resp.error);
        });
    }
    $scope.closeModal = function() {
      $modalInstance.dismiss("cancel");
    };
    $scope.save = function () {
      companyService.updateCompany($scope.company).then(
        function () {
          $modalInstance.close("success");
        },
      function (error) {
        alert("Error", error);
      });
    };
  }
])

.controller("companySelectorCtr", ["$scope", "$modalInstance",
    "companyService", "companyId", "BaseList",
    function ($scope, $modalInstance, companyService,
      companyId, BaseList) {

    var DB_MAX_COUNT = 20; //number of records to load at a time

    $scope.companies = new BaseList(DB_MAX_COUNT);
    $scope.search = {
        searchString: ""
    };

    $scope.closeModal = function () {
        $modalInstance.dismiss("cancel");
    };

    function loadCompanies() {
      if (!$scope.companies.endOfList) {
        companyService.getCompanies(
          companyId, $scope.search.searchString,
          $scope.companies.cursor, DB_MAX_COUNT, null).then(function (result) {
          if (result && result.items) {
            $scope.companies.add(result.items, result.cursor);
          }
        });
      }
    }

    if ($scope.companies.list.length === 0) {
      loadCompanies();
    }

    $scope.doSearch = function () {
      $scope.companies.clear();
      loadCompanies();
    };

    $scope.setCompany = function (company) {
      $modalInstance.close(company);
    };

    $scope.handleScroll = function (event, isEndEvent) {
      // console.log(event.target.scrollTop + " / " + event.target.scrollHeight + " / " + isEndEvent);
      if (isEndEvent) {
        if ((event.target.scrollHeight - event.target.clientHeight - event.target.scrollTop) < 20) {
          //load more rows if less than 20px left to the bottom
          loadCompanies();
        }
      }
    };
}
]);