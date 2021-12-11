
class InventoryPage {
    /**
     * define selectors using getter methods
     */

    async checkInventoryContainarVisibility(value) {
        let elem = $('div#inventory_container div.inventory_list');
        expect(await elem.isDisplayed()).toBe(value, 'inventoryContainer is not visible')
    }

    async checkAddRemoveBtn(index, value) {
        let elems = await $$('div.inventory_item button');
        let text = await elems[index].getText();
        expect(text).toEqual(value);
    }

    async checkCartContainerValue(value) {
        let elem = $('div#shopping_cart_container span');
        let text = await elem.getText();
        expect(+text).toEqual(value);
    }

    async checkCartItemaQty(value) {
        let elems = await $$('div.cart_item');
        let count = elems.length;
        expect(count).toEqual(value);
    }

    async clickAddToCartBtn(index) {
        let elems = await $$('div.inventory_item button');
        elems[index].click();
        await browser.pause(1000)
    }

    async getInventoryItemPrice(index) {
        let elems = await $$('div.inventory_item div.inventory_item_price');
        let text = await elems[index].getText();
        text = +text.match(/[0-9.]+$/g).join()
        return text
    }

    async clickOnCartIcon() {
        let elem = $('a.shopping_cart_link');
        await elem.click()
    }

    async clickCheckOutBtn() {
        let elem = $('button#checkout');
        await elem.waitForDisplayed({ timeout: 3000 })
        await elem.click()
    }

    async clickContinueBtn() {
        let elem = $('input#continue');
        await elem.waitForDisplayed({ timeout: 3000 })
        await elem.click()
    }

    async clickFinishBtn() {
        let elem = $('button#finish');
        await elem.waitForDisplayed({ timeout: 3000 })
        await elem.click()
    }

    async inputFirstName(value) {
        let elem = $('input#first-name');
        await elem.setValue(value);
        let text = await elem.getValue();
        expect(text).toEqual(value);
    }

    async inputLastName(value) {
        let elem = $('input#last-name');
        await elem.setValue(value);
        let text = await elem.getValue();
        expect(text).toEqual(value);
    }

    async inputPostalCode(value) {
        let elem = $('input#postal-code');
        await elem.setValue(value);
        let text = await elem.getValue();
        expect(text).toEqual(value.toString());
    }

    async checkThankYouText(value) {
        let elem = $('div#checkout_complete_container > h2');
        let text = await elem.getText();
        expect(text).toEqual(value);
    }

    async getSummarySubTotalPrice() {
        let elem = $('div.summary_subtotal_label');
        let text = await elem.getText();
        text = +text.match(/[0-9.]+$/g).join()
        return text
    }

    async getSummaryTaxes() {
        let elem = $('div.summary_tax_label');
        let text = await elem.getText();
        text = +text.match(/[0-9.]+$/g).join()
        return text
    }

    async getSummaryTotalPrice() {
        let elem = $('div.summary_total_label');
        let text = await elem.getText();
        text = +text.match(/[0-9.]+$/g).join()
        return text
    }
}

module.exports = new InventoryPage();
