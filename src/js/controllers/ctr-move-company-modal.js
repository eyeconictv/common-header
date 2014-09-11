angular.module("risevision.common.header")

.controller("MoveCompanyModalCtrl", ["$scope", "$modalInstance", "moveCompany", "getCompany",
  function($scope, $modalInstance, moveCompany, getCompany) {

    $scope.company = {};
    $scope.errors = [];
    $scope.messages = [];

    $scope.closeModal = function() {
      $modalInstance.dismiss("cancel");
    };

    $scope.moveCompany = function () {
      $scope.messages = [];
      moveCompany($scope.company.authKey).then(function () {
        $scope.messages.push("Success. The company has been moved under your company.");
      }, function (err) {$scope.errors.push("Error: "  + JSON.stringify(err)); });
    };

    $scope.getCompany = function () {
      $scope.errors = []; $scope.messages = [];
      getCompany({authKey: $scope.company.authKey}).then(function (resp) {
        angular.extend($scope.company, resp);
      }, function (resp) {
        $scope.errors.push("Failed to retrieve company. " + resp.message);
      });
    };
  }
]);
