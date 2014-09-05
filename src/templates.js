(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("auth-buttons.html",
    "<!-- If User NOT Authenticated -->\n" +
    "<ul class=\"nav navbar-nav navbar-right actions-nav\"\n" +
    "  style=\"min-width: 80px; min-height: 41px;\">\n" +
    "\n" +
    "  <li class=\"dropdown\" ng-show=\"userState.user.profile\">\n" +
    "    <a href=\"\" class=\"dropdown-toggle\">\n" +
    "      <img ng-src=\"{{userState.user.profile.picture}}\"\n" +
    "        class=\"profile-pic\" width=\"30\" height=\"30\" alt=\"User\" />\n" +
    "    </a>\n" +
    "    <ul class=\"dropdown-menu\">\n" +
    "      <li class=\"dropdown-header dropdown-title\">\n" +
    "        {{userState.user.profile.firstName}} {{userState.user.profile.lastName}}\n" +
    "      </li>\n" +
    "      <li class=\"dropdown-header\">\n" +
    "        {{userState.user.profile.email}}\n" +
    "      </li>\n" +
    "      <li ng-show=\"!userState.user.profile.username\">\n" +
    "        <a href=\"\" ng-click=\"register()\">\n" +
    "          <i class=\"glyphicons user_add\"></i>\n" +
    "          <span class=\"item-name\">Register</span>\n" +
    "        </a>\n" +
    "      </li>\n" +
    "      <li class=\"divider\"></li>\n" +
    "      <li ng-show=\"userState.user.profile.username\">\n" +
    "        <a href=\"\" ng-click=\"userSettings()\" class=\"user-settings-button\">\n" +
    "          <i class=\"glyphicons cogwheels\"></i>\n" +
    "          <span class=\"item-name\">User Settings</span>\n" +
    "        </a>\n" +
    "      </li>\n" +
    "      <li class=\"divider\"></li>\n" +
    "      <li ng-show=\"userState.user.profile.username\">\n" +
    "        <a href=\"\" ng-click=\"paymentMethods()\">\n" +
    "          <i class=\"glyphicons usd\"></i>\n" +
    "          <span class=\"item-name\">Payment Methods</span>\n" +
    "        </a>\n" +
    "      </li>\n" +
    "      <li class=\"divider\"></li>\n" +
    "      <li ng-show=\"userState.user.profile\">\n" +
    "        <a href=\"\" ng-click=\"logout()\" class=\"sign-out-button\">\n" +
    "          <i class=\"glyphicons log_out\"></i>\n" +
    "          <span class=\"item-name\">Sign Out</span>\n" +
    "        </a>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </li>\n" +
    "  <li ng-show=\"!userState.user.profile\">\n" +
    "    <a href=\"\" class=\"sign-in\" ng-click=\"loginModal()\">\n" +
    "      <span>Sign In</span>\n" +
    "      <i class=\"glyphicons log_in\"></i>\n" +
    "    </a>\n" +
    "  </li>\n" +
    "</ul>\n" +
    "</li>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("authorization-modal.html",
    "<div class=\"modal-header\">\n" +
    "  <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\" ng-click=\"closeModal()\">\n" +
    "  		<i class=\"glyphicons remove_2\"></i>\n" +
    "  	</button>\n" +
    "</div>\n" +
    "<div class=\"modal-body authorization-modal\">\n" +
    "  <img src=\"http://rise-vision.github.io/style-guide/img/avatar_2x.jpg\" class=\"profile-img\">\n" +
    "  <p>Please authorize your Google Account to register with Rise Vision.</p>\n" +
    "  <button type=\"button\" ng-click=\"authenticate(true)\" class=\"btn btn-success btn-lg btn-block authorize-button\">Authorize</button>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("common-header.html",
    "<!-- Common Header Navbar -->\n" +
    "<nav class=\"navbar navbar-default navbar-static-top\"\n" +
    "	ng-class=\"{'double-margin': userState.subCompanySelected}\" role=\"navigation\">\n" +
    "	<div class=\"container\">\n" +
    "		<div class=\"navbar-header\">\n" +
    "			<button type=\"button\" class=\"navbar-toggle\" ng-click=\"navCollapsed = !navCollapsed\">\n" +
    "				<span class=\"sr-only\">Toggle navigation</span>\n" +
    "				<div class=\"icon-bar-container\">\n" +
    "					<span class=\"icon-bar\"></span>\n" +
    "					<span class=\"icon-bar\"></span>\n" +
    "					<span class=\"icon-bar\"></span>\n" +
    "				</div>\n" +
    "			</button>\n" +
    "			<a class=\"navbar-brand\" href=\"http://www.risevision.com/\">\n" +
    "				<img src=\"//s3.amazonaws.com/rise-common/images/logo-small.png\" class=\"img-responsive logo-small\" width=\"113\" height=\"42\" alt=\"Rise Vision\">\n" +
    "			</a>\n" +
    "		</div>\n" +
    "		<div class=\"collapse navbar-collapse navbar-left\" collapse=\"navCollapsed\">\n" +
    "			<ul class=\"nav navbar-nav\">\n" +
    "				<li ng-repeat=\"opt in navOptions\">\n" +
    "					<a ng-href=\"{{opt.link}}\" target=\"{{opt.target}}\">{{opt.title}}</a>\n" +
    "				</li>\n" +
    "				<li class=\"dropdown\">\n" +
    "					<a href=\"\" class=\"dropdown-toggle remove-radius\">\n" +
    "						Help\n" +
    "					</a>\n" +
    "					<ul class=\"dropdown-menu\">\n" +
    "						<li>\n" +
    "							<a href=\"http://community.risevision.com/rise_vision_inc\" class=\"item-name\" target=\"_blank\">Community</a>\n" +
    "						</li>\n" +
    "						<li class=\"divider\"></li>\n" +
    "						<li>\n" +
    "							<a href=\"http://www.risevision.com/user-training/\" class=\"item-name\" target=\"_blank\">Training</a>\n" +
    "						</li>\n" +
    "						<li class=\"divider\"></li>\n" +
    "						<li>\n" +
    "							<a href=\"http://www.risevision.com/help/users/\" class=\"item-name\" target=\"_blank\">Documentation</a>\n" +
    "						</li>\n" +
    "					</ul>\n" +
    "				</li>\n" +
    "			</ul>\n" +
    "		</div>\n" +
    "\n" +
    "		<!-- If User Authenticated -->\n" +
    "		<ul class=\"nav navbar-nav navbar-right actions-nav\">\n" +
    "			<!-- Notifications -->\n" +
    "			<li class=\"dropdown\" class=\"system-messages\"\n" +
    "			  ng-show=\"userState.user.profile.username\"\n" +
    "				ng-controller=\"SystemMessagesButtonCtrl\"\n" +
    "				ng-include=\"'system-messages-button.html'\">\n" +
    "			</li>\n" +
    "			<!-- Shopping Cart -->\n" +
    "			<li class=\"shopping-cart\"\n" +
    "			  ng-controller=\"ShoppingCartButtonCtrl\"\n" +
    "				ng-show=\"userState.shoppingCart.items !== null\"\n" +
    "				ng-include=\"'shoppingcart-button.html'\">\n" +
    "			</li>\n" +
    "			<!-- Current App -->\n" +
    "			<li class=\"dropdown\" ng-show=\"userState.user.profile\">\n" +
    "				<a href=\"\" class=\"dropdown-toggle\">\n" +
    "					<i class=\"glyphicons show_thumbnails\"></i>\n" +
    "				</a>\n" +
    "				<ul class=\"dropdown-menu company-menu\">\n" +
    "					<li class=\"dropdown-header dropdown-title\">\n" +
    "						Current App\n" +
    "					</li>\n" +
    "					<li class=\"dropdown-header\">\n" +
    "						<i class=\"glyphicons shop\"></i> Store\n" +
    "					</li>\n" +
    "					<li class=\"divider\"></li>\n" +
    "					<li>\n" +
    "						<div class=\"menu-box pull-left\">\n" +
    "							<a href=\"\">\n" +
    "								<i class=\"glyphicons picture\"></i>\n" +
    "								<span>Displays</span>\n" +
    "							</a>\n" +
    "						</div>\n" +
    "						<div class=\"menu-box pull-right\">\n" +
    "							<a href=\"\">\n" +
    "								<i class=\"glyphicons picture\"></i>\n" +
    "								<span>Scheduler</span>\n" +
    "							</a>\n" +
    "						</div>\n" +
    "					</li>\n" +
    "					<li>\n" +
    "						<div class=\"menu-box pull-left\">\n" +
    "							<a href=\"\">\n" +
    "								<i class=\"glyphicons picture\"></i>\n" +
    "								<span>Editor</span>\n" +
    "							</a>\n" +
    "						</div>\n" +
    "						<div class=\"menu-box pull-right\">\n" +
    "							<a href=\"\">\n" +
    "								<i class=\"glyphicons picture\"></i>\n" +
    "								<span>Storage</span>\n" +
    "							</a>\n" +
    "						</div>\n" +
    "					</li>\n" +
    "					<li>\n" +
    "						<div class=\"menu-box pull-left\">\n" +
    "							<a href=\"\">\n" +
    "								<i class=\"glyphicons picture\"></i>\n" +
    "								<span>Bulletin</span>\n" +
    "							</a>\n" +
    "						</div>\n" +
    "						<div class=\"menu-box pull-right\">\n" +
    "							<a href=\"\">\n" +
    "								<i class=\"glyphicons picture\"></i>\n" +
    "								<span>Player</span>\n" +
    "							</a>\n" +
    "						</div>\n" +
    "					</li>\n" +
    "				</ul>\n" +
    "			</li>\n" +
    "			<!-- END Current App -->\n" +
    "			<!-- Company Dropdown -->\n" +
    "			<li class=\"dropdown\" ng-show=\"userState.user.profile.username\"\n" +
    "				ng-controller=\"CompanyButtonsCtrl\"\n" +
    "				ng-include=\"'company-buttons.html'\"\n" +
    "			></li>\n" +
    "\n" +
    "			<li\n" +
    "			  ng-controller=\"AuthButtonsCtr\"\n" +
    "				ng-include=\"'auth-buttons.html'\"\n" +
    "				rv-spinner=\"spinnerOptions\"\n" +
    "				rv-spinner-key=\"auth-buttons\"\n" +
    "				rv-spinner-start-active=\"1\"\n" +
    "			></li>\n" +
    "		</ul>\n" +
    "\n" +
    "	</div>\n" +
    "	<div ng-if=\"userState.subCompanySelected\"\n" +
    "	  class=\"sub-company-alert\">\n" +
    "		You’re in a Sub-Company of your Company. Current Company - {{userState.selectedCompanyName}}\n" +
    "	</div>\n" +
    "</nav>\n" +
    "<!-- END Common Header Navbar -->\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("company-buttons.html",
    "<a href=\"\" class=\"dropdown-toggle\">\n" +
    "  <i class=\"glyphicons cogwheel\"></i>\n" +
    "</a>\n" +
    "<ul class=\"dropdown-menu\">\n" +
    "  <li class=\"dropdown-header dropdown-title\"\n" +
    "    ng-show=\"userState.user.company\">\n" +
    "    Current Company\n" +
    "  </li>\n" +
    "  <li class=\"dropdown-header\" ng-show=\"userState.user.company\">\n" +
    "    <!-- home -->\n" +
    "    <i ng-if=\"!userState.subCompanySelected\" class=\"glyphicons home\"></i>\n" +
    "    <!-- warning -->\n" +
    "    <i ng-if=\"userState.subCompanySelected\" class=\"glyphicons warning_sign glyphicon-danger\"></i>\n" +
    "    {{userState.selectedCompanyName}}\n" +
    "    <div ng-if=\"userState.subCompanySelected\" class=\"danger\">This is a Sub-Company of your Company.</div>\n" +
    "  </li>\n" +
    "  <li ng-if=\"userState.subCompanySelected\" class=\"divider\"></li>\n" +
    "  <li ng-show=\"!userState.user.company\">\n" +
    "    <a href=\"\" data-toggle=\"modal\" data-target=\"#subcompany-modal\"\n" +
    "      ng-click=\"companySettings()\">\n" +
    "      <i class=\"glyphicons plus\"></i>\n" +
    "      <span class=\"item-name\">Create a Company</span>\n" +
    "    </a>\n" +
    "  </li>\n" +
    "  <li ng-if=\"userState.subCompanySelected\">\n" +
    "    <a href=\"\" ng-click=\"resetCompany()\">\n" +
    "      <i class=\"glyphicons home\"></i>\n" +
    "      <span class=\"item-name\">Switch To My Company</span>\n" +
    "    </a>\n" +
    "  </li>\n" +
    "  <li class=\"divider\"></li>\n" +
    "  <li ng-show=\"userState.user.company\">\n" +
    "    <a href=\"\" ng-click=\"switchCompany()\">\n" +
    "      <i class=\"glyphicons new_window\"></i>\n" +
    "      <span class=\"item-name\">Select Sub-Company</span>\n" +
    "    </a>\n" +
    "  </li>\n" +
    "  <li ng-if=\"userState.roleMap.sa\" class=\"divider\"></li>\n" +
    "  <li ng-if=\"userState.roleMap.sa\">\n" +
    "    <a href=\"\" data-toggle=\"modal\" data-target=\"#subcompany-modal\" ng-click=\"addSubCompany()\">\n" +
    "      <i class=\"glyphicons plus\"></i>\n" +
    "      <span class=\"item-name\">Add Sub-Company</span>\n" +
    "    </a>\n" +
    "  </li>\n" +
    "  <li ng-if=\"userState.roleMap.sa\" class=\"divider\"></li>\n" +
    "  <li ng-if=\"userState.roleMap.sa\">\n" +
    "    <a href=\"\" ng-click=\"companySettings()\">\n" +
    "      <i class=\"glyphicons cogwheels\"></i>\n" +
    "      <span class=\"item-name\">Company Settings</span>\n" +
    "    </a>\n" +
    "  </li>\n" +
    "  <li ng-if=\"userState.roleMap.sa\" class=\"divider\"></li>\n" +
    "  <li ng-show=\"userState.roleMap.sa\">\n" +
    "    <a href=\"\" data-toggle=\"modal\"\n" +
    "    data-target=\"#company-users-modal\" ng-click=\"companyUsers()\">\n" +
    "      <i class=\"glyphicons group\"></i>\n" +
    "      <span class=\"item-name\">Company Users</span>\n" +
    "    </a>\n" +
    "  </li>\n" +
    "</ul>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("company-selector-modal.html",
    "<form role=\"form\">\n" +
    "	<div class=\"modal-header\">\n" +
    "		<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\" ng-click=\"closeModal()\">\n" +
    "			<i class=\"glyphicons remove_2\"></i>\n" +
    "		</button>\n" +
    "		<h2 id=\"switch-company\" class=\"modal-title\">\n" +
    "			Select Sub-Company\n" +
    "		</h2>\n" +
    "		<div class=\"input-group company-search\">\n" +
    "			<input id=\"csSearch\" type=\"text\" class=\"form-control\" placeholder=\"Search Companies\" ng-model=\"searchString\" ng-enter=\"doSearch()\">\n" +
    "			<span class=\"input-group-btn\">\n" +
    "				<button class=\"btn btn-primary\" type=\"submit\" ng-click=\"doSearch()\">\n" +
    "					<i class=\"glyphicon glyphicon-search\"></i>\n" +
    "				</button>\n" +
    "			</span>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div class=\"modal-body jfk-scrollbar\" ng-scroll-event=\"handleScroll($event, isEndEvent)\">\n" +
    "		<div class=\"list-group scrollable-list\">\n" +
    "			<a href=\"#\" class=\"list-group-item\" ng-repeat=\"company in companies.list\" ng-click=\"setCompany(company)\">\n" +
    "				<div class=\"row\">\n" +
    "					<div class=\"col-md-7\">\n" +
    "						{{company.name}}\n" +
    "					</div>\n" +
    "					<div class=\"col-md-5 text-right\">\n" +
    "						{{company.fullAddress}}\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</a>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div class=\"modal-footer\">\n" +
    "		<button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" aria-hidden=\"true\" ng-click=\"closeModal()\">Cancel\n" +
    "			<i class=\"glyphicons white remove_2 icon-right\"></i>\n" +
    "		</button>\n" +
    "	</div>\n" +
    "</form>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("company-settings-modal.html",
    "<div class=\"modal-header\">\n" +
    "  <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\" ng-click=\"closeModal()\">\n" +
    "    <i class=\"glyphicons remove_2\"></i>\n" +
    "  </button>\n" +
    "  <h2 id=\"company-settings-label\" class=\"modal-title\">Company Settings</h2>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <form role=\"form\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"company-settings-name\">\n" +
    "        Name\n" +
    "      </label>\n" +
    "      <input id=\"company-settings-name\" type=\"text\" class=\"form-control\" ng-model=\"company.name\" />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"company-settings-street\">\n" +
    "        Street\n" +
    "      </label>\n" +
    "      <input id=\"company-settings-street\" type=\"text\" class=\"form-control\" ng-model=\"company.street\" />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"company-settings-unit\">\n" +
    "        Unit\n" +
    "      </label>\n" +
    "      <input id=\"company-settings-unit\" type=\"text\" class=\"form-control\" ng-model=\"company.unit\" />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"company-settings-city\">\n" +
    "        City\n" +
    "      </label>\n" +
    "      <input id=\"company-settings-city\" type=\"text\" class=\"form-control\" ng-model=\"company.city\" />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"company-settings-country\">\n" +
    "        Country\n" +
    "      </label>\n" +
    "      <select id=\"company-settings-country\" class=\"form-control selectpicker\"\n" +
    "        ng-model=\"company.country\" ng-options=\"c[1] as c[0] for c in countries\">\n" +
    "        <option value=\"\">&lt; Select Country &gt;</option>\n" +
    "      </select>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"company-settings-state\">\n" +
    "        State / Province\n" +
    "      </label>\n" +
    "      <!-- <input id=\"company-settings-state\" type=\"text\" class=\"form-control\" ng-model=\"company.province\" ng-hide=\"company.country == 'US' || company.country == 'CA'\" /> -->\n" +
    "      <select class=\"form-control selectpicker\" ng-model=\"company.province\" ng-options=\"c[1] as c[0] for c in regionsCA\" ng-show=\"company.country == 'CA'\">\n" +
    "        <option value=\"\">&lt; Select Province &gt;</option>\n" +
    "      </select>\n" +
    "      <!-- <select class=\"form-control selectpicker\" ng-model=\"company.province\" ng-options=\"c[1] as c[0] for c in regionsUS\" ng-show=\"company.country == 'US'\">\n" +
    "        <option value=\"\">&lt; Select State &gt;</option>\n" +
    "      </select> -->\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"company-settings-zip\">\n" +
    "        Zip / Postal Code\n" +
    "      </label>\n" +
    "      <input id=\"company-settings-zip\" type=\"text\" class=\"form-control\" ng-model=\"company.postalCode\" />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"company-settings-phone\">\n" +
    "        Telephone\n" +
    "      </label>\n" +
    "      <input id=\"company-settings-phone\" type=\"tel\" class=\"form-control\" />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"company-settings-monitoring\">\n" +
    "        Send Monitoring Emails To\n" +
    "      </label>\n" +
    "      <input id=\"company-settings-monitoring\" type=\"email\" class=\"form-control\" />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label>\n" +
    "        Authentication Key\n" +
    "      </label>\n" +
    "      <a class=\"action-link\" href=\"\">Reset</a>\n" +
    "      <div>\n" +
    "        authKey\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label>\n" +
    "        Claim ID\n" +
    "      </label>\n" +
    "      <a class=\"action-link\" href=\"\">Reset</a>\n" +
    "      <div>\n" +
    "        abc123\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label>\n" +
    "        Sub-Company Home Page Presentation\n" +
    "      </label>\n" +
    "      <a class=\"action-link\" href=\"\" ng-click=\"showSelector()\">Select</a>\n" +
    "      <a class=\"action-link\" href=\"\">Default</a>\n" +
    "      <div id=\"presentation-name\">Rise Vision Default (ID=a6789044-ae4a-48c7-b6fd-b5d4ffea2f24)</div>\n" +
    "      <div class=\"presentation-selector\" ng-show=\"isSelectorVisible\">\n" +
    "        <div class=\"panel panel-default\">\n" +
    "          <ul class=\"list-unstyled selector-header\">\n" +
    "            <li ng-class=\"{active : selected == 'list'}\">\n" +
    "              <a href=\"\" ng-click=\"showPresentationView($event, 'list')\">Search Presentations</a>\n" +
    "            </li>\n" +
    "            <li ng-class=\"{active : selected == 'search'}\">\n" +
    "              <a href=\"\" ng-click=\"showPresentationView($event, 'search')\">Enter Presentation ID</a>\n" +
    "            </li>\n" +
    "            <li class=\"close-button\">\n" +
    "              <button type=\"button\" class=\"close\" aria-hidden=\"true\" ng-click=\"closeSelector()\">\n" +
    "                <i class=\"glyphicons remove_2\"></i>\n" +
    "              </button>\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "          <div class=\"panel-body\">\n" +
    "            <div class=\"presentation-list\" ng-show=\"selected == 'list'\">\n" +
    "              <div class=\"input-group search\">\n" +
    "                <input type=\"text\" class=\"form-control\" placeholder=\"Search Presentations\">\n" +
    "                <span class=\"input-group-btn\">\n" +
    "                  <button class=\"btn btn-primary\" type=\"submit\">\n" +
    "                    <i class=\"glyphicon glyphicon-search\"></i>\n" +
    "                  </button>\n" +
    "                </span>\n" +
    "              </div>\n" +
    "              <div class=\"list-group scrollable-list\">\n" +
    "                <a href=\"\" class=\"list-group-item\" ng-click=\"setPresentation($event, 'Demo Presentation')\">\n" +
    "                  Demo Presentation\n" +
    "                </a>\n" +
    "                <a href=\"\" class=\"list-group-item\" ng-click=\"setPresentation($event, 'My First Presentation')\">\n" +
    "                  My First Presentation\n" +
    "                </a>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"presentation-search\" ng-show=\"selected == 'search'\">\n" +
    "              <form role=\"form\">\n" +
    "                <div class=\"form-group\">\n" +
    "                  <input id=\"presentation-id\" type=\"text\" class=\"form-control\" placeholder=\"Enter Presentation ID\" />\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                  <a href=\"\" ng-click=\"setPresentation($event)\">Retrieve Presentation</a>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"form-group\">\n" +
    "        <label for=\"company-settings-community-url\">\n" +
    "          Sub-Company Community URL\n" +
    "        </label>\n" +
    "        <a class=\"action-link\" href=\"\">Default</a>\n" +
    "        <input id=\"company-settings-community-url\" type=\"url\" class=\"form-control\" />\n" +
    "      </div>\n" +
    "      <div class=\"form-group\">\n" +
    "        <label for=\"company-settings-support-url\">\n" +
    "          Sub-Company Support URL\n" +
    "        </label>\n" +
    "        <a class=\"action-link\" href=\"\">Default</a>\n" +
    "        <input id=\"company-settings-support-url\" type=\"url\" class=\"form-control\" />\n" +
    "      </div>\n" +
    "      <div class=\"form-group\">\n" +
    "        <label>\n" +
    "          Seller ID\n" +
    "        </label>\n" +
    "        <div>\n" +
    "          123456\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"form-group\">\n" +
    "        <label for=\"company-settings-status\">\n" +
    "          Status\n" +
    "        </label>\n" +
    "        <select id=\"company-settings-status\" class=\"form-control selectpicker\">\n" +
    "          <option value=\"active\">Active</option>\n" +
    "          <option value=\"inactive\">Inactive</option>\n" +
    "        </select>\n" +
    "      </div>\n" +
    "    </form>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button type=\"button\" class=\"btn btn-primary btn-fixed-width\" ng-click=\"save()\">Save\n" +
    "      <i class=\"glyphicons white ok_2 icon-right\"></i>\n" +
    "    </button>\n" +
    "    <button type=\"button\" class=\"btn btn-danger btn-fixed-width\" ng-show=\"!isDeletingCompany\" ng-click=\"deleteCompany()\">\n" +
    "      Delete <i class=\"glyphicons white bin icon-right\"></i>\n" +
    "    </button>\n" +
    "    <button type=\"button\" class=\"btn btn-danger btn-confirm-delete\" data-dismiss=\"modal\" ng-show=\"isDeletingCompany\" ng-click=\"closeModal()\">\n" +
    "      Confirm Deletion <i class=\"glyphicons white warning_sign icon-right\"></i>\n" +
    "    </button>\n" +
    "    <button type=\"button\" class=\"btn btn-primary btn-fixed-width\" data-dismiss=\"modal\" ng-click=\"closeModal()\">Cancel\n" +
    "      <i class=\"glyphicons white remove_2 icon-right\"></i>\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("company-users-modal.html",
    "<div class=\"modal-header\">\n" +
    "  <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">\n" +
    "    <i class=\"glyphicons remove_2\"></i>\n" +
    "  </button>\n" +
    "  <h2 id=\"company-users-label\" class=\"modal-title\">Company Users</h2>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"row action-bar\">\n" +
    "    <div class=\"col-md-8 sort\">\n" +
    "      <a href=\"\">\n" +
    "        Username\n" +
    "        <span class=\"caret\"></span>\n" +
    "      </a>\n" +
    "      <a href=\"\">Name</a>\n" +
    "      <a href=\"\">Status</a>\n" +
    "      <a href=\"\">Last Login</a>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-4 text-right\">\n" +
    "      <a href=\"\">Download to CSV</a>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"list-group scrollable-list\">\n" +
    "    <div class=\"list-group-item\">\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-sm-10\">\n" +
    "          <h3 class=\"list-group-item-heading\">\n" +
    "            <a href=\"\" data-toggle=\"modal\" data-target=\"#user-settings-modal\">\n" +
    "              bld@riseholdings.com\n" +
    "            </a>\n" +
    "          </h3>\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-2 edit\">\n" +
    "          <a href=\"\" data-dismiss=\"modal\" data-toggle=\"modal\" data-target=\"#user-settings-modal\">\n" +
    "            Edit\n" +
    "          </a>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"list-group-item-text\">\n" +
    "        Byron Darlison\n" +
    "        Editor, Publisher, Display, Administrator, System\n" +
    "        Last Logged In 03/24/14 6:35PM\n" +
    "        Active\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"list-group-item\">\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-sm-10\">\n" +
    "          <h3 class=\"list-group-item-heading\">\n" +
    "            <a href=\"\" data-toggle=\"modal\" data-target=\"#user-settings-modal\">\n" +
    "              robb.price@risevision.com\n" +
    "            </a>\n" +
    "          </h3>\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-2 edit\">\n" +
    "          <a href=\"\" data-dismiss=\"modal\" data-toggle=\"modal\" data-target=\"#user-settings-modal\">\n" +
    "            Edit\n" +
    "          </a>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"list-group-item-text\">\n" +
    "        Robb Price\n" +
    "        Editor, Publisher, Display\n" +
    "        Last Logged In >12/05/13 9:01AM\n" +
    "        Inactive\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" data-toggle=\"modal\" data-target=\"#user-settings-modal\">Add User\n" +
    "    <i class=\"glyphicons white plus icon-right\"></i>\n" +
    "  </button>\n" +
    "  <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\">\n" +
    "    Cancel <i class=\"glyphicons white remove_2 icon-right\"></i>\n" +
    "  </button>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("credit-cards-modal.html",
    "<div class=\"modal-header\">\n" +
    "  <button type=\"button\" class=\"close\" ng-click=\"closeModal()\">\n" +
    "    <i class=\"glyphicons remove_2\"></i>\n" +
    "  </button>\n" +
    "  <h2 id=\"pay-now-label\" class=\"modal-title\">Credit Cards</h2>\n" +
    "</div>\n" +
    "<div class=\"modal-body\" ng-scroll-event=\"handleScroll($event, isEndEvent)\">\n" +
    "  <form role=\"form\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"card-number\">Card Number</label>\n" +
    "      <input id=\"card-number\" data-stripe=\"number\" class=\"form-control\" type=\"text\" ng-model=\"card.number\"/>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"card-name\">Cardholder Name</label>\n" +
    "      <input id=\"card-name\" data-stripe=\"name\" class=\"form-control\" type=\"text\" ng-model=\"card.name\"/>\n" +
    "    </div>\n" +
    "    <div class=\"row form-group\">\n" +
    "      <div class=\"col-md-3\">\n" +
    "        <label for=\"expiry-month\">Exp. Month</label>\n" +
    "        <select id=\"expiry-month\" data-stripe=\"exp-month\" class=\"form-control selectpicker\" ng-model=\"card.expMonth\">\n" +
    "          <option value=\"1\">01</option>\n" +
    "          <option value=\"2\">02</option>\n" +
    "          <option value=\"3\">03</option>\n" +
    "          <option value=\"4\" selected>04</option>\n" +
    "          <option value=\"5\">05</option>\n" +
    "          <option value=\"6\">06</option>\n" +
    "          <option value=\"7\">07</option>\n" +
    "          <option value=\"8\">08</option>\n" +
    "          <option value=\"9\">09</option>\n" +
    "          <option value=\"10\">10</option>\n" +
    "          <option value=\"11\">11</option>\n" +
    "          <option value=\"12\">12</option>\n" +
    "        </select>\n" +
    "      </div>\n" +
    "      <div class=\"col-md-3\">\n" +
    "        <label for=\"expiry-year\">Exp. Year</label>\n" +
    "        <select id=\"expiry-year\" data-stripe=\"exp-year\" class=\"form-control selectpicker\" ng-model=\"card.expYear\">\n" +
    "          <option value=\"2014\" selected>2014</option>\n" +
    "          <option value=\"2015\">2015</option>\n" +
    "          <option value=\"2016\">2016</option>\n" +
    "          <option value=\"2017\">2017</option>\n" +
    "          <option value=\"2018\">2018</option>\n" +
    "          <option value=\"2019\">2019</option>\n" +
    "          <option value=\"2020\">2020</option>\n" +
    "          <option value=\"2021\">2021</option>\n" +
    "          <option value=\"2022\">2022</option>\n" +
    "          <option value=\"2023\">2023</option>\n" +
    "          <option value=\"2024\">2024</option>\n" +
    "        </select>\n" +
    "      </div>\n" +
    "      <div class=\"col-md-3\">\n" +
    "        <label for=\"cvc\">Security Code</label>\n" +
    "        <input id=\"cvc\" data-stripe=\"cvc\" class=\"form-control\" type=\"text\" size=\"4\" ng-model=\"card.cvc\">\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <!-- Address -->\n" +
    "    <h3>Billing Address</h3>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"street\">Street</label>\n" +
    "      <input id=\"street\" type=\"text\" class=\"form-control\" ng-model=\"addr.address1\" />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"unit\">Street (Line 2)</label>\n" +
    "      <input id=\"unit\" type=\"text\" class=\"form-control\" ng-model=\"addr.address2\" />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"city\">City</label>\n" +
    "      <input id=\"city\" type=\"text\" class=\"form-control\" ng-model=\"addr.city\" />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"country\">Country</label>\n" +
    "      <select id=\"country\" class=\"form-control selectpicker\" ng-model=\"addr.country\" ng-options=\"c[1] as c[0] for c in countries\">\n" +
    "        <option value=\"\">&lt; Select Country &gt;</option>\n" +
    "      </select>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"province\">State / Province</label>\n" +
    "      <!-- <input id=\"province\" type=\"text\" class=\"form-control\" ng-model=\"addr.province\" ng-hide=\"addr.country == 'US' || addr.country == 'CA'\" /> -->\n" +
    "      <select class=\"form-control selectpicker\" ng-model=\"addr.province\" ng-options=\"c[1] as c[0] for c in regionsCA\" ng-show=\"addr.country == 'CA'\">\n" +
    "        <option value=\"\">&lt; Select Province &gt;</option>\n" +
    "      </select>\n" +
    "      <!-- <select class=\"form-control selectpicker\" ng-model=\"addr.province\" ng-options=\"c[1] as c[0] for c in regionsUS\" ng-show=\"addr.country == 'US'\">\n" +
    "        <option value=\"\">&lt; Select State &gt;</option>\n" +
    "      </select> -->\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"zip\">Zip / Postal Code</label>\n" +
    "      <input id=\"zip\" type=\"text\" class=\"form-control\" ng-model=\"addr.postalCode\" />\n" +
    "    </div>\n" +
    "    <!-- End Address-->\n" +
    "    <div class=\"form-group danger\" ng-show=\"isDeletingCard\">\n" +
    "      Warning! If you delete this credit card from your account all subscription renewals paid on this card will fail at the time of renewal resulting in potential loss of service. Please confirm you wish to proceed with deleting this card by typing \"DELETE\" into the box below and clicking on the Confirm Deletion button.\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-sm-4\">\n" +
    "          <input type=\"text\" class=\"form-control\" />\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-sm-3\">\n" +
    "      <a href=\"https://stripe.com/\" target=\"_blank\">\n" +
    "        <img src=\"img/powered-by-stripe.png\" class=\"stripe\" width=\"119\" height=\"26\" alt=\"Powered by Stripe\">\n" +
    "      </a>\n" +
    "    </div>\n" +
    "    <div class=\"col-sm-9\">\n" +
    "      <button type=\"button\" class=\"btn btn-primary btn-fixed-width\" data-dismiss=\"modal\" ng-click=\"closeModal()\">Save\n" +
    "        <i class=\"glyphicons white ok_2 icon-right\"></i>\n" +
    "      </button>\n" +
    "      <button type=\"button\" class=\"btn btn-danger btn-fixed-width\" ng-show=\"!isDeletingCard\" ng-click=\"deleteCard()\">\n" +
    "        Delete <i class=\"glyphicons white bin icon-right\"></i>\n" +
    "      </button>\n" +
    "      <button type=\"button\" class=\"btn btn-danger btn-confirm-delete\" data-dismiss=\"modal\" ng-show=\"isDeletingCard\" ng-click=\"closeModal()\">\n" +
    "        Confirm Deletion <i class=\"glyphicons white warning_sign icon-right\"></i>\n" +
    "      </button>\n" +
    "      <button type=\"button\" class=\"btn btn-primary btn-fixed-width\" data-dismiss=\"modal\" ng-click=\"closeModal()\">Cancel\n" +
    "        <i class=\"glyphicons white remove_2 icon-right\"></i>\n" +
    "      </button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("move-company-modal.html",
    "<div class=\"modal-header\">\n" +
    "  <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\" ng-click=\"closeModal()\">\n" +
    "    <i class=\"glyphicons remove_2\"></i>\n" +
    "  </button>\n" +
    "  <h2 id=\"move-company-label\" class=\"modal-title\">Move Company</h2>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <form role=\"form\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"auth-key\">\n" +
    "        Enter the Authentication Key of the Company that you want to move.\n" +
    "      </label>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-sm-6\">\n" +
    "          <input id=\"auth-key\" type=\"text\" class=\"form-control\" />\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-6\">\n" +
    "          <a href=\"\" ng-click=\"getCompany()\">Retrieve Company Details</a>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "  <div ng-show=\"showCompanyDetails\">\n" +
    "    <h3>Details of the Company You Want to Move</h3>\n" +
    "    <div>\n" +
    "      Acme Company 123<br>\n" +
    "      1234 W. 100th Ave<br>\n" +
    "      Kansas City, KS 12345\n" +
    "    </div>\n" +
    "    <h3>Details of the Company You Are Moving the Above Company Under</h3>\n" +
    "    <div class=\"to-company\">\n" +
    "      Rise Display<br>\n" +
    "      22019 W. 83rd St.<br>\n" +
    "      Shawnee, KS 66226\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div ng-show=\"showCompanyMessages\">\n" +
    "    <div class=\"alert alert-success\">\n" +
    "      The Company was moved successfully.\n" +
    "    </div>\n" +
    "    <div class=\"alert alert-danger\">\n" +
    "      There was a problem moving the Company. Please try again.\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-success\" ng-show=\"showMoveCompany\" ng-click=\"moveCompany()\">Move Company\n" +
    "    <i class=\"glyphicons white ok_2 icon-right\"></i>\n" +
    "  </button>\n" +
    "  <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" ng-click=\"closeModal()\">\n" +
    "    Cancel <i class=\"glyphicons white remove_2 icon-right\"></i>\n" +
    "  </button>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("payment-methods-modal.html",
    "<div class=\"modal-header\">\n" +
    "  <button type=\"button\" class=\"close\" ng-click=\"closeModal()\">\n" +
    "    <i class=\"glyphicons remove_2\"></i>\n" +
    "  </button>\n" +
    "  <h2 id=\"user-settings-label\" class=\"modal-title\">Payment Methods</h2>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"container-fluid\">\n" +
    "    <div class=\"list-group\">\n" +
    "      <div class=\"row list-group-item\">\n" +
    "        <div class=\"col-sm-10\">\n" +
    "          Visa - 123\n" +
    "          <span class=\"expiry\">Expires - 02/15</span>\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-2 edit\">\n" +
    "          <a href=\"\" ng-click=\"creditCards()\">\n" +
    "            Edit\n" +
    "          </a>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"row list-group-item\">\n" +
    "        <div class=\"col-sm-10\">\n" +
    "          Amex - 123\n" +
    "          <span class=\"expiry\">Expires - 02/15</span>\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-2 edit\">\n" +
    "          <a href=\"\" ng-click=\"creditCards()\">\n" +
    "            Edit\n" +
    "          </a>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-sm-3 stripe\">\n" +
    "      <a href=\"https://stripe.com/\" target=\"_blank\">\n" +
    "        <img src=\"img/powered-by-stripe.png\" width=\"119\" height=\"26\" alt=\"Powered by Stripe\">\n" +
    "      </a>\n" +
    "    </div>\n" +
    "    <div class=\"col-sm-9\">\n" +
    "      <button type=\"button\" class=\"btn btn-primary\" ng-click=\"closeModal()\">\n" +
    "        Cancel <i class=\"glyphicons white remove_2 icon-right\"></i>\n" +
    "      </button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("registration-modal.html",
    "<div rv-spinner\n" +
    "rv-spinner-key=\"registration-modal\"\n" +
    "rv-spinner-start-active=\"1\">\n" +
    "<div class=\"modal-header\">\n" +
    "  <button type=\"button\" ng-click=\"cancel()\" class=\"close\"><span>&times;</span><span class=\"sr-only\">Close</span></button>\n" +
    "  <h2 class=\"modal-title\">Welcome To Rise Vision</h2>\n" +
    "</div>\n" +
    "<div class=\"modal-body registration-modal\">\n" +
    "  <p>We require an Email address that we can reliably reach you at\n" +
    "  for system notices and other critical information. We promise,\n" +
    "   only system notices, we won't send you anything else unless you\n" +
    "  sign up for the Newsletter below, and we won't share your email address\n" +
    "  with anyone else. Promise!</p>\n" +
    "\n" +
    "  <form role=\"form\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"exampleInputEmail1\">Email address</label>\n" +
    "      <input type=\"email\" class=\"form-control\"\n" +
    "      id=\"exampleInputEmail1\" placeholder=\"Enter email\" required\n" +
    "      ng-model=\"userState.user.profile.email\">\n" +
    "    </div>\n" +
    "    <!-- Terms of Service and Privacy -->\n" +
    "    <div class=\"checkbox\">\n" +
    "      <label>\n" +
    "      <input type=\"checkbox\" ng-model=\"userState.user.profile.accepted\" class=\"accept-terms-checkbox\" />\n" +
    "      I accept Terms of <a href=\"http://www.risevision.com/terms-service-privacy/\" target=\"_blank\">Service and Privacy</a>\n" +
    "      </label>\n" +
    "    </div>\n" +
    "    <!-- Newsletter -->\n" +
    "    <div class=\"checkbox\">\n" +
    "      <label>\n" +
    "        <input type=\"checkbox\" ng-model=\"userState.user.profile.mailSyncEnabled\"> Sign up for the Rise Vision Newsletter\n" +
    "      </label>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <button ng-click=\"save()\" type=\"button\" class=\"btn btn-success btn-fixed-width registration-save-button\">\n" +
    "        Save <i class=\"glyphicons white ok_2 icon-right\"></i>\n" +
    "      </button>\n" +
    "      <button type=\"button\" class=\"btn btn-primary btn-fixed-width\"\n" +
    "      ng-click=\"cancel()\">\n" +
    "        Cancel <i class=\"glyphicons white remove_2 icon-right\"></i>\n" +
    "      </button>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("shoppingcart-button.html",
    "<a href=\"\" class=\"shopping-cart-button\">\n" +
    "  <i class=\"glyphicons shopping_cart\"></i>\n" +
    "  <span id=\"cartBadge\" class=\"label label-primary\">{{userState.shoppingCart.items.length | surpressZero}}</span>\n" +
    "</a>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("subcompany-modal.html",
    "<div class=\"modal-header\">\n" +
    "  <button type=\"button\" class=\"close\" ng-click=\"closeModal()\" aria-hidden=\"true\">\n" +
    "    <i class=\"glyphicons remove_2\"></i>\n" +
    "  </button>\n" +
    "  <h2 id=\"sub-company-label\" class=\"modal-title\">Add Sub-Company</h2>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <form role=\"form\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"sub-company-name\">\n" +
    "        Name\n" +
    "      </label>\n" +
    "      <input id=\"sub-company-name\" type=\"text\" class=\"form-control\" ng-model=\"company.name\" />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"sub-company-street\">\n" +
    "        Street\n" +
    "      </label>\n" +
    "      <input id=\"sub-company-street\" type=\"text\" class=\"form-control\" ng-model=\"company.street\" />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"sub-company-unit\">\n" +
    "        Unit\n" +
    "      </label>\n" +
    "      <input id=\"sub-company-unit\" type=\"text\" class=\"form-control\" ng-model=\"company.unit\" />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"sub-company-city\">\n" +
    "        City\n" +
    "      </label>\n" +
    "      <input id=\"sub-company-city\" type=\"text\" class=\"form-control\" ng-model=\"company.city\" />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"sub-company-country\">\n" +
    "        Country\n" +
    "      </label>\n" +
    "      <select id=\"sub-company-country\" class=\"form-control selectpicker\" ng-model=\"company.country\" ng-options=\"c[1] as c[0] for c in countries\">\n" +
    "        <option value=\"\">&lt; Select Country &gt;</option>\n" +
    "      </select>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"sub-company-state\">\n" +
    "        State / Province\n" +
    "      </label>\n" +
    "      <!-- <input id=\"sub-company-state\" type=\"text\" class=\"form-control\" ng-model=\"company.province\" ng-hide=\"company.country == 'US' || company.country == 'CA'\" /> -->\n" +
    "      <select class=\"form-control selectpicker\" ng-model=\"company.province\" ng-options=\"c[1] as c[0] for c in regionsCA\" ng-show=\"company.country == 'CA'\">\n" +
    "        <option value=\"\">&lt; Select Province &gt;</option>\n" +
    "      </select>\n" +
    "      <!-- <select class=\"form-control selectpicker\" ng-model=\"company.province\" ng-options=\"c[1] as c[0] for c in regionsUS\" ng-show=\"company.country == 'US'\">\n" +
    "        <option value=\"\">&lt; Select State &gt;</option>\n" +
    "      </select> -->\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"sub-company-zip\">\n" +
    "        Zip / Postal Code\n" +
    "      </label>\n" +
    "      <input id=\"sub-company-zip\" type=\"text\" class=\"form-control\" ng-model=\"company.postalCode\" />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"sub-company-monitoring\">\n" +
    "        Send Monitoring Emails To\n" +
    "      </label>\n" +
    "      <input id=\"sub-company-monitoring\" type=\"email\" class=\"form-control\" />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <a href=\"\" data-dismiss=\"modal\" data-toggle=\"modal\" ng-click=\"moveCompany()\">Move a Company Under Your Company</a>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-primary btn-fixed-width\" ng-click=\"save()\">Save\n" +
    "    <i class=\"glyphicons white ok_2 icon-right\"></i>\n" +
    "  </button>\n" +
    "  <button type=\"button\" class=\"btn btn-primary btn-fixed-width\" ng-click=\"closeModal()\">Cancel\n" +
    "    <i class=\"glyphicons white remove_2 icon-right\"></i>\n" +
    "  </button>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("system-messages-button.html",
    "<a href=\"\" class=\"dropdown-toggle system-messages-button\">\n" +
    "  <i class=\"glyphicons bell\"></i>\n" +
    "  <span class=\"label label-danger system-messages-badge\">{{messages.length}}</span>\n" +
    "</a>\n" +
    "<ul class=\"dropdown-menu system-messages\">\n" +
    "  <li class=\"dropdown-header dropdown-title\">\n" +
    "    System Message\n" +
    "  </li>\n" +
    "  <li class=\"divider\"></li>\n" +
    "  <li class=\"system-message\"\n" +
    "    ng-repeat=\"message in messages\"\n" +
    "    ng-bind-html=\"renderHtml(message.text)\">\n" +
    "  </li>\n" +
    "</ul>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("user-settings-modal.html",
    "<div class=\"modal-header\">\n" +
    "  <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\" ng-click=\"closeModal()\">\n" +
    "    <i class=\"glyphicons remove_2\"></i>\n" +
    "  </button>\n" +
    "  <h2 id=\"user-settings-label\" class=\"modal-title\">User Settings</h2>\n" +
    "</div>\n" +
    "<div class=\"modal-body user-settings-modal\">\n" +
    "  <form role=\"form\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label>\n" +
    "        Username\n" +
    "      </label>\n" +
    "      bloosbrock@gmail.com\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"user-settings-first-name\">\n" +
    "        First Name\n" +
    "      </label>\n" +
    "      <input id=\"user-settings-first-name\"\n" +
    "        type=\"text\"\n" +
    "        class=\"form-control\"\n" +
    "        ng-model=\"userState.user.profile.firstName\"\n" +
    "        />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"user-settings-last-name\">\n" +
    "        Last Name\n" +
    "      </label>\n" +
    "      <input id=\"user-settings-last-name\"\n" +
    "        type=\"text\"\n" +
    "        class=\"form-control\"\n" +
    "        ng-model=\"userState.user.profile.lastName\"\n" +
    "        />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"user-settings-phone\">\n" +
    "        Telephone\n" +
    "      </label>\n" +
    "      <input\n" +
    "        id=\"user-settings-phone\"\n" +
    "        type=\"tel\"\n" +
    "        class=\"form-control\"\n" +
    "        ng-model=\"userState.user.profile.phone\"\n" +
    "         />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"user-settings-email\">\n" +
    "        Email\n" +
    "      </label>\n" +
    "      <input\n" +
    "        id=\"user-settings-email\"\n" +
    "        type=\"email\"\n" +
    "        class=\"form-control\"\n" +
    "        ng-model=\"userState.user.profile.email\"\n" +
    "        />\n" +
    "    </div>\n" +
    "    <div class=\"checkbox\">\n" +
    "      <label>\n" +
    "        <input type=\"checkbox\"\n" +
    "          id=\"user-settings-newsletter\"\n" +
    "          ng-model=\"userState.user.profile.mailSyncEnabled\">\n" +
    "          Subscribe To Email Updates\n" +
    "      </label>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label>\n" +
    "        Roles\n" +
    "      </label>\n" +
    "      <div class=\"checkbox\">\n" +
    "        <label>\n" +
    "          <input type=\"checkbox\"\n" +
    "            id=\"user-settings-editor\"\n" +
    "            checklist-model=\"userState.user.profile.roles\"\n" +
    "            checklist-value=\"'ce'\"> Editor\n" +
    "        </label>\n" +
    "      </div>\n" +
    "      <div class=\"checkbox\">\n" +
    "        <label>\n" +
    "          <input type=\"checkbox\"\n" +
    "            id=\"user-settings-publisher\"\n" +
    "            checklist-model=\"userState.user.profile.roles\"\n" +
    "            checklist-value=\"'pu'\"> Publisher\n" +
    "        </label>\n" +
    "      </div>\n" +
    "      <div class=\"checkbox\">\n" +
    "        <label>\n" +
    "          <input type=\"checkbox\"\n" +
    "            id=\"user-settings-display\"\n" +
    "            checklist-model=\"userState.user.profile.roles\"\n" +
    "            checklist-value=\"'da'\"> Display\n" +
    "        </label>\n" +
    "      </div>\n" +
    "      <div class=\"checkbox\">\n" +
    "        <label>\n" +
    "          <input type=\"checkbox\"\n" +
    "            id=\"user-settings-administrator\"\n" +
    "            checklist-model=\"userState.user.profile.roles\"\n" +
    "            checklist-value=\"'ua'\"> Administrator\n" +
    "        </label>\n" +
    "      </div>\n" +
    "      <div class=\"checkbox\">\n" +
    "        <label>\n" +
    "          <input type=\"checkbox\"\n" +
    "            id=\"user-settings-system\"\n" +
    "            checklist-model=\"userState.user.profile.roles\"\n" +
    "            checklist-value=\"'sa'\"> System\n" +
    "        </label>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label>\n" +
    "        Last Login\n" +
    "      </label>\n" +
    "      <div>{{userState.user.profile.lastLogin | date:'MM/dd/yy HH:mm:ss Z'}}</div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"user-settings-status\">\n" +
    "        Status\n" +
    "      </label>\n" +
    "      <select id=\"user-settings-status\"\n" +
    "        class=\"form-control selectpicker\"\n" +
    "        ng-model=\"userState.user.profile.status\"\n" +
    "        >\n" +
    "        <option value=\"1\">Active</option>\n" +
    "        <option value=\"0\">Inactive</option>\n" +
    "      </select>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\"\n" +
    "    class=\"btn btn-primary btn-fixed-width\"\n" +
    "    data-dismiss=\"modal\"\n" +
    "    ng-click=\"save()\" id=\"save-button\">\n" +
    "    Save <i class=\"glyphicons white ok_2 icon-right\"></i>\n" +
    "  </button>\n" +
    "  <button type=\"button\" class=\"btn btn-primary btn-fixed-width\" data-dismiss=\"modal\" ng-click=\"closeModal()\">\n" +
    "    Cancel <i class=\"glyphicons white remove_2 icon-right\"></i>\n" +
    "  </button>\n" +
    "</div>\n" +
    "");
}]);
})();
