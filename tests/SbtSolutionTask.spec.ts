
import { expect, test } from '@playwright/test';
import ProductPage from './productDetailsPage';

test.beforeEach(async ({ page }) => {
    await page.goto('/')
    const productPage = new ProductPage(page);
    await productPage.acceptCookies();
});

test('Check if user is able to select MEN product', async ({ page }) => {
    const productPage = new ProductPage(page);

    //task 1
    await productPage.closeDiscount();
    await productPage.navigateToMenSection();
    await productPage.selectProduct('Панталони');
    // task 2
    await productPage.navigateToSpecificProductPage();
    await productPage.clickOnThirdItem();
    await productPage.checkOnPriceAppears();
    await productPage.checkOnColors()
    await productPage.checkOnSizes()
    //task 3
    await productPage.navigateToSpecificProductPage()
        .then(() => productPage.clickOnThirdItem()
            .then(() => productPage.selectColorAndSizeAndAddItemToTheCart()));

});
