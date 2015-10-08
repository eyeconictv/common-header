(function() {

  "use strict";

  var expect = require('rv-common-e2e').expect;
  var assert = require('rv-common-e2e').assert;
  var CommonHeaderPage = require('rv-common-e2e').commonHeaderPage;
  var helper = require('rv-common-e2e').helper;

  browser.driver.manage().window().setSize(1280, 768);

  describe("Shopping Cart", function() {
    this.timeout(2000);// to allow for protactor to load the seperate page
    var commonHeaderPage;
    before(function (){
      commonHeaderPage = new CommonHeaderPage();

      browser.get("http://localhost:8099/test/e2e");
    });

    it("should not function when user is not signed in", function() {
      helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader');
      
      assert.eventually.isTrue(commonHeaderPage.getSignInButton().isDisplayed(), "Sign in button should show");

      assert.eventually.isTrue(element(by.id("buy-product-1")).isDisplayed(), "Product 1 button should show");
      assert.eventually.isTrue(element(by.id("buy-product-2")).isDisplayed(), "Product 2 button should show");
      assert.eventually.isTrue(element(by.id("buy-product-3")).isDisplayed(), "Product 3 button should show");

      assert.eventually.isFalse(element(by.css(".shopping-cart-button")).isDisplayed(), "Cart button should not show");
      element(by.id("buy-product-2")).click();
      assert.eventually.strictEqual(element(by.id("cartBadge")).getText(), "", "Should not add to cart");

    });

    it("should add stuff to cart when logged in", function() {
      //log in
      commonHeaderPage.signin();
      
      assert.eventually.isTrue(element(by.id("buy-product-1")).isDisplayed(), "Product 1 button should show");
      assert.eventually.isTrue(element(by.id("buy-product-2")).isDisplayed(), "Product 2 button should show");
      assert.eventually.isTrue(element(by.id("buy-product-3")).isDisplayed(), "Product 3 button should show");

      assert.eventually.strictEqual(element(by.id("cartBadge")).getText(), "", "Cart badge should display nothing");

      //add to cart
      element(by.id("buy-product-2")).click();
      assert.eventually.strictEqual(element(by.id("cartBadge")).getText(), "1", "Cart badge should display 1");
      element(by.id("buy-product-3")).click();
      assert.eventually.strictEqual(element(by.id("cartBadge")).getText(), "2", "Cart badge should display 2");
      element(by.id("buy-product-1")).click();
      assert.eventually.strictEqual(element(by.id("cartBadge")).getText(), "3", "Cart badge should display 3");
      element(by.id("buy-product-3")).click();
      assert.eventually.strictEqual(element(by.id("cartBadge")).getText(), "3", "Cart badge should display 3");

    });

    // Core API persist is not working because of fake products
    // Should mock API response
    xit("should persist cart on refresh", function() {
      browser.refresh();
      
      helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader');
      
      assert.eventually.isTrue(element(by.css(".shopping-cart-button")).isDisplayed(), "Cart button should show");
      assert.eventually.strictEqual(element(by.id("cartBadge")).getText(), "3", "Cart badge should display 3");
    });

    it("should clear cart", function() {
      element(by.id("clear-cart")).click();
      assert.eventually.strictEqual(element(by.id("cartBadge")).getText(), "", "Cart should be cleared out");
    });

    xit("should persist cart on log out and then log in", function() {
      element(by.id("buy-product-2")).click();
      element(by.id("buy-product-3")).click();
      assert.eventually.strictEqual(element(by.id("cartBadge")).getText(), "2", "Cart badge should display 2");

      element(by.css(".desktop-menu-item img.profile-pic")).click();
      //shows sign-out menu item
      expect(element(by.css(".dropdown-menu .sign-out-button")).isDisplayed()).to.eventually.equal(true);
      //click sign out
      element(by.css(".dropdown-menu .sign-out-button")).click();
      assert.eventually.isTrue(element(by.css(".sign-out-modal")).isDisplayed(), "sign-out dialog should show");
      element(by.css(".sign-out-modal .sign-out-rv-only-button")).click();

      assert.eventually.isTrue(element(by.css("button.sign-in")).isDisplayed(), "Sign in button should show");

      //log in
      browser.executeScript("gapi.setPendingSignInUser('michael.sanchez@awesome.io')");
      element(by.css("button.sign-in")).click();
      
      browser.sleep(500);
      
      assert.eventually.strictEqual(element(by.id("cartBadge")).getText(), "2", "Cart badge should display 2");
    });
  });
})();
