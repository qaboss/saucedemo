
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

    async getAllInventoryItemPrices() {
        let elems = await $$('div.inventory_item div.inventory_item_price');
        let arr = [];
        for(let i = 0; i < elems.length; i++){
            let text = await elems[i].getText()
            text = +text.replace(',', '').match(/[0-9.]+$/g).join()
            arr.push(text)
        }
        return arr;
    }

    async getAllInventoryItemNames() {
        let elems = await $$('div.inventory_item_name');
        let arr = [];
        for(let i = 0; i < elems.length; i++){
            let text = await elems[i].getText()
            arr.push(text)
        }
        return arr;
    }

    async clickSortMenu(value) {
        let elem = $('div.header_secondary_container span.select_container');
        await elem.click()
        let elem1 = $(`div.header_secondary_container span.select_container option[value="${value}"]`);
        await elem1.waitForDisplayed()
        await elem1.moveTo()
        await elem1.click()
        await browser.pause(1000)
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

    async clickCancelBtn() {
        let elem = $('button#cancel');
        await elem.click()
    }

    async clickContinueShopingBtn() {
        let elem = $('button#continue-shopping');
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
        await expect(elem).toHaveValueContaining(value)
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
