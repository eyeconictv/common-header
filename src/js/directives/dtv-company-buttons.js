"use strict";

angular.module("risevision.common.header")
  .directive("companyButtons", ["$templateCache",
    function ($templateCache) {
      return {
        restrict: "E",
        scope: false,
        replace: true,
        template: $templateCache.get("company-buttons-menu.html"),
        link: function () {
        } //link()
      };
    }
  ]);