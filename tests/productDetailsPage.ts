import { Page, expect } from '@playwright/test';
import exp from 'constants';
export default class ProductPage {

    readonly page: Page
    constructor(page: Page) {
        this.page = page;
    }

    async acceptCookies() {
        await this.page.locator('[type=submit]').click();
        await this.page.getByRole('button', { name: 'Приеми всички' }).click();
    }

    async closeDiscount() {
        const closeButton = await this.page.waitForSelector('button[aria-label="Close"]');
        await closeButton.click();
    }

    async navigateToMenSection() {
        await this.page.getByTitle('Go to Мъже').click();
    }

    async selectProduct(productName: string) {
        await this.page.click(`h2.vsv-title:has-text("${productName}")`);
    }

    async navigateToSpecificProductPage() {
        await this.page.locator('a[data-testid="menu.brand.she"] >> text="Жени"').nth(0).hover();
        await this.page.locator('button.R0GJG.zsTOF.Kd7pV.FCA2L.f_dwT').hover();
        await this.page.locator('a[data-testid="menu.family.camisetas_she.link"]:has-text("Тениски")').click();
    }

    async clickOnThirdItem() {
        await this.page.locator('.tWlwm.xGkIb').nth(2).click();
    }

    async checkOnPriceAppears() {
        const price = this.page.locator('.sAobE text-title-xl');
        expect(await price.isVisible());
    }

    async checkOnColors() {
        const colorImages = this.page.locator('.color-image')

        try {
            // Check if the alt attribute is present(make sure there are colors)
            for (const colorImage of await colorImages.elementHandles()) {
                const altAttribute = await colorImage.getAttribute('alt');
                expect(altAttribute).toBeTruthy();
            }
        } catch (error) {
            console.error('There are no colors to select, please choose another product.');
        }
    }
    async checkOnSizes() {
        // size S
        const smallSize = this.page.locator('size-20', { hasText: 'S' })
        expect(smallSize.isVisible())
        expect(smallSize).toContainText('S')

        // size M
        const mediumSize = this.page.locator('size-21', { hasText: 'M' })
        expect(mediumSize.isVisible())
        expect(mediumSize).toContainText('M')
        // Ensure that S is not selected
        // Make assertion that S is !true
        expect(smallSize).not.toBe(true)

        // size L
        const largeSize = this.page.locator('size-22', { hasText: 'L' })
        expect(largeSize.isVisible())
        expect(largeSize).toContainText('L')
        // Ensure that M is not selected
        // Make assertion that M is !true
        expect(mediumSize).not.toBe(true)
    }

    async selectColorAndSizeAndAddItemToTheCart() {
        // get the color
        await this.page.locator('img[alt="Бяло"]').click();
        // get the size
        await this.page.locator('span#size-21').click();

        // add selected product, size and color to the cart
        await this.page.getByRole('button', { name: 'Добави към пазарска чанта' }).click()


        // Check if the product and quantity is added to the cart
        const quantity = this.page.locator('span[data-testid="bag.item.quantity"]')
        const quantityText = quantity.innerText()
        // Ensure the text content is not empty
        expect(((await quantityText).trim())).not.toBe('');

        // Check if the cart title appears with the correct text
        const cartTitleElement = this.page.locator('p[data-testid="bag.title"]');
        const cartTitleText = await cartTitleElement.innerText();
        // Check if cartTitleText contain 'Кошница за пазаруване (1)
        expect(cartTitleText).toContain('Кошница за пазаруване (1)');
        // Ensure the text content is not empty
        expect((cartTitleText).trim()).not.toBe('');

        // Ensure that the price is not 0лв
        const priceElement = this.page.locator('.sAobE.text-title-xl');
        const priceText = await priceElement.innerText()
        expect(priceText.trim()).not.toBe('0лв')

        // Make sure the currency is not EUR
        const currency = this.page.locator('meta[itemprop="priceCurrency"]')
        const currentCurrency = await currency.getAttribute('content')
        expect(currentCurrency).not.toBe('EUR')

    }
}
