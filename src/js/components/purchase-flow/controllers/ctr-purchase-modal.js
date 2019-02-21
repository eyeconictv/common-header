angular.module("risevision.common.components.purchase-flow")

.value("PURCHASE_STEPS", [{
  name: "Subscription Details",
  index: 0,
  formName: "reviewSubscriptionForm"
}, {
  name: "Billing Address",
  index: 1,
  formName: "billingAddressForm"
}, {
  name: "Shipping Address",
  index: 2,
  formName: "shippingAddressForm"
}, {
  name: "Payment Method",
  index: 3,
  formName: "paymentMethodsForm"
}, {
  name: "Purchase Review",
  index: 4
}])

.controller("PurchaseModalCtrl", [
  "$scope", "$modalInstance", "$loading", "purchaseFactory", "addressFactory", "PURCHASE_STEPS",
  function ($scope, $modalInstance, $loading, purchaseFactory, addressFactory, PURCHASE_STEPS) {

    $scope.form = {};
    $scope.factory = purchaseFactory;

    $scope.PURCHASE_STEPS = PURCHASE_STEPS;
    $scope.currentStep = 0;
    $scope.finalStep = false;

    $scope.$watch("factory.loading", function (loading) {
      if (loading) {
        $loading.start("purchase-modal");
      } else {
        $loading.stop("purchase-modal");
      }
    });

    var _isFormValid = function () {
      var step = PURCHASE_STEPS[$scope.currentStep];
      var formName = step.formName;
      var form = $scope.form[formName];

      return !form || form.$valid;
    };

    $scope.validateAddress = function (addressObject, contactObject, isShipping) {
      if (!_isFormValid()) {
        return;
      }

      purchaseFactory.loading = true;

      addressFactory.validateAddress(addressObject)
        .finally(function () {
          purchaseFactory.loading = false;

          if (!addressObject.validationError) {
            addressFactory.updateContact(contactObject);
            addressFactory.updateAddress(addressObject, contactObject, isShipping);

            $scope.setNextStep();
          }
        });
    };

    $scope.validatePaymentMethod = function () {
      if (!_isFormValid()) {
        return;
      }

      purchaseFactory.validatePaymentMethod()
        .then($scope.setNextStep);
    };

    $scope.completePayment = function () {
      purchaseFactory.completePayment()
        .then(function () {
          if (!purchaseFactory.purchase.checkoutError) {
            $scope.setNextStep();
          }
        });
    };

    $scope.setNextStep = function () {
      if (!_isFormValid()) {
        return;
      }

      if (($scope.finalStep && $scope.currentStep < 3) || $scope.currentStep === 3) {
        $scope.currentStep = 4;

        $scope.finalStep = true;

        purchaseFactory.getEstimate();
      } else {
        $scope.currentStep++;
      }

    };

    $scope.setPreviousStep = function () {
      if ($scope.currentStep > 0) {
        $scope.currentStep--;
      }
    };

    $scope.setCurrentStep = function (index) {
      purchaseFactory.purchase.checkoutError = null;

      $scope.currentStep = index;
    };

    $scope.close = function () {
      if (!purchaseFactory.purchase.reloadingCompany) {
        $modalInstance.close("success");
      } else {
        purchaseFactory.loading = true;

        $scope.$watch("factory.purchase.reloadingCompany", function (loading) {
          if (!loading) {
            purchaseFactory.loading = false;

            $modalInstance.close("success");
          }
        });
      }
    };

    $scope.dismiss = function () {
      $modalInstance.dismiss("cancel");
    };

  }

]);