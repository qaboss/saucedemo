const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');

const standard_user = 'standard_user';
const locked_out_user = 'locked_out_user';
const problem_user = 'problem_user';
const performance_glitch_user = 'performance_glitch_user';

const validPass = 'secret_sauce';
let addToCard = 'Add to cart';
let remove = 'Remove';

describe('Sales Tests standard_user', () => {
    beforeEach(async function () {
        await LoginPage.open();
    });
    
    it('Make 1 item sale', async () => {
        let itemsQty = 1;
        let price = 0;
        await LoginPage.login(standard_user, validPass);
        await InventoryPage.checkInventoryContainarVisibility(true);
        for(let i = 0; i < itemsQty; i++){
            await InventoryPage.checkAddRemoveBtn(i, addToCard.toUpperCase());
            await InventoryPage.clickAddToCartBtn(i);
            await InventoryPage.checkAddRemoveBtn(i, remove.toUpperCase());
            price += await InventoryPage.getInventoryItemPrice(i);
        }
        await InventoryPage.checkCartContainerValue(itemsQty);
        await InventoryPage.clickOnCartIcon();
        await InventoryPage.checkCartItemaQty(itemsQty);
        await InventoryPage.clickCheckOutBtn();
        await InventoryPage.inputFirstName('John');
        await InventoryPage.inputLastName('Doe');
        await InventoryPage.inputPostalCode(12345);
        await browser.pause(1000)
        await InventoryPage.clickContinueBtn();
        let subtotalPrice = await InventoryPage.getSummarySubTotalPrice();
        expect(subtotalPrice).toEqual(price);
        let taxes = await InventoryPage.getSummaryTaxes();
        expect(taxes).toEqual(+(price * 0.08).toFixed(2));
        let totalPrice = await InventoryPage.getSummaryTotalPrice();
        expect(+(subtotalPrice + taxes).toFixed(2)).toEqual(totalPrice);
        await InventoryPage.clickFinishBtn();
        await InventoryPage.checkThankYouText('THANK YOU FOR YOUR ORDER');
    });
    
    it('Make multy items sale', async () => {
        let itemsQty = 3;
        let price = 0;
        await LoginPage.login(standard_user, validPass);
        await InventoryPage.checkInventoryContainarVisibility(true);
        for(let i = 0; i < itemsQty; i++){
            await InventoryPage.checkAddRemoveBtn(i, addToCard.toUpperCase());
            await InventoryPage.clickAddToCartBtn(i);
            await InventoryPage.checkAddRemoveBtn(i, remove.toUpperCase());
            price += await InventoryPage.getInventoryItemPrice(i);
        }
        await InventoryPage.checkCartContainerValue(itemsQty);
        await InventoryPage.clickOnCartIcon();
        await InventoryPage.checkCartItemaQty(itemsQty);
        await InventoryPage.clickCheckOutBtn();
        await InventoryPage.inputFirstName('John');
        await InventoryPage.inputLastName('Doe');
        await InventoryPage.inputPostalCode(12345);
        await browser.pause(1000)
        await InventoryPage.clickContinueBtn();
        let subtotalPrice = await InventoryPage.getSummarySubTotalPrice();
        expect(subtotalPrice).toEqual(price);
        let taxes = await InventoryPage.getSummaryTaxes();
        expect(taxes).toEqual(+(price * 0.08).toFixed(2));
        let totalPrice = await InventoryPage.getSummaryTotalPrice();
        expect(+(subtotalPrice + taxes).toFixed(2)).toEqual(totalPrice);
        await InventoryPage.clickFinishBtn();
        await InventoryPage.checkThankYouText('THANK YOU FOR YOUR ORDER');
    });

    afterEach(async function () {
        await LoginPage.logOut();
        await browser.deleteAllCookies()
    });

});

describe('Sales Tests performance_glitch_user', () => {
    beforeEach(async function () {
        await LoginPage.open();
    });
    
    it('Make 1 item sale', async () => {
        let itemsQty = 1;
        let price = 0;
        await LoginPage.login(performance_glitch_user, validPass);
        await InventoryPage.checkInventoryContainarVisibility(true);
        for(let i = 0; i < itemsQty; i++){
            await InventoryPage.checkAddRemoveBtn(i, addToCard.toUpperCase());
            await InventoryPage.clickAddToCartBtn(i);
            await InventoryPage.checkAddRemoveBtn(i, remove.toUpperCase());
            price += await InventoryPage.getInventoryItemPrice(i);
        }
        await InventoryPage.checkCartContainerValue(itemsQty);
        await InventoryPage.clickOnCartIcon();
        await InventoryPage.checkCartItemaQty(itemsQty);
        await InventoryPage.clickCheckOutBtn();
        await InventoryPage.inputFirstName('John');
        await InventoryPage.inputLastName('Doe');
        await InventoryPage.inputPostalCode(12345);
        await browser.pause(1000)
        await InventoryPage.clickContinueBtn();
        let subtotalPrice = await InventoryPage.getSummarySubTotalPrice();
        expect(subtotalPrice).toEqual(price);
        let taxes = await InventoryPage.getSummaryTaxes();
        expect(taxes).toEqual(+(price * 0.08).toFixed(2));
        let totalPrice = await InventoryPage.getSummaryTotalPrice();
        expect(+(subtotalPrice + taxes).toFixed(2)).toEqual(totalPrice);
        await InventoryPage.clickFinishBtn();
        await InventoryPage.checkThankYouText('THANK YOU FOR YOUR ORDER');
    });
    
    it('Make multy items sale', async () => {
        let itemsQty = 4;
        let price = 0;
        await LoginPage.login(performance_glitch_user, validPass);
        await InventoryPage.checkInventoryContainarVisibility(true);
        for(let i = 0; i < itemsQty; i++){
            await InventoryPage.checkAddRemoveBtn(i, addToCard.toUpperCase());
            await InventoryPage.clickAddToCartBtn(i);
            await InventoryPage.checkAddRemoveBtn(i, remove.toUpperCase());
            price += await InventoryPage.getInventoryItemPrice(i);
        }
        await InventoryPage.checkCartContainerValue(itemsQty);
        await InventoryPage.clickOnCartIcon();
        await InventoryPage.checkCartItemaQty(itemsQty);
        await InventoryPage.clickCheckOutBtn();
        await InventoryPage.inputFirstName('John');
        await InventoryPage.inputLastName('Doe');
        await InventoryPage.inputPostalCode(12345);
        await browser.pause(1000)
        await InventoryPage.clickContinueBtn();
        let subtotalPrice = await InventoryPage.getSummarySubTotalPrice();
        expect(subtotalPrice).toEqual(price);
        let taxes = await InventoryPage.getSummaryTaxes();
        expect(taxes).toEqual(+(price * 0.08).toFixed(2));
        let totalPrice = await InventoryPage.getSummaryTotalPrice();
        expect(+(subtotalPrice + taxes).toFixed(2)).toEqual(totalPrice);
        await InventoryPage.clickFinishBtn();
        await InventoryPage.checkThankYouText('THANK YOU FOR YOUR ORDER');
    });

    afterEach(async function () {
        await LoginPage.logOut();
        // await browser.clearSessionStorage()
        await browser.deleteAllCookies()
    });

});

describe('Sales Tests problem_user', () => {
    beforeEach(async function () {
        await LoginPage.open();
    });
    
    it('Make 1 item sale', async () => {
        let itemsQty = 1;
        let price = 0;
        await LoginPage.login(problem_user, validPass);
        await InventoryPage.checkInventoryContainarVisibility(true);
        for(let i = 0; i < itemsQty; i++){
            await InventoryPage.checkAddRemoveBtn(i, addToCard.toUpperCase());
            await InventoryPage.clickAddToCartBtn(i);
            await InventoryPage.checkAddRemoveBtn(i, remove.toUpperCase());
            price += await InventoryPage.getInventoryItemPrice(i);
        }
        await InventoryPage.checkCartContainerValue(itemsQty);
        await InventoryPage.clickOnCartIcon();
        await InventoryPage.checkCartItemaQty(itemsQty);
        await InventoryPage.clickCheckOutBtn();
        await InventoryPage.inputFirstName('John');
        await InventoryPage.inputLastName('Doe');
        await InventoryPage.inputPostalCode(12345);
        await browser.pause(1000)
        await InventoryPage.clickContinueBtn();
        let subtotalPrice = await InventoryPage.getSummarySubTotalPrice();
        expect(subtotalPrice).toEqual(price);
        let taxes = await InventoryPage.getSummaryTaxes();
        expect(taxes).toEqual(+(price * 0.08).toFixed(2));
        let totalPrice = await InventoryPage.getSummaryTotalPrice();
        expect(+(subtotalPrice + taxes).toFixed(2)).toEqual(totalPrice);
        await InventoryPage.clickFinishBtn();
        await InventoryPage.checkThankYouText('THANK YOU FOR YOUR ORDER');
    });
    
    it('Make multy items sale', async () => {
        let itemsQty = 3;
        let price = 0;
        await LoginPage.login(problem_user, validPass);
        await InventoryPage.checkInventoryContainarVisibility(true);
        for(let i = 0; i < itemsQty; i++){
            await InventoryPage.checkAddRemoveBtn(i, addToCard.toUpperCase());
            await InventoryPage.clickAddToCartBtn(i);
            await InventoryPage.checkAddRemoveBtn(i, remove.toUpperCase());
            price += await InventoryPage.getInventoryItemPrice(i);
        }
        await InventoryPage.checkCartContainerValue(itemsQty);
        await InventoryPage.clickOnCartIcon();
        await InventoryPage.checkCartItemaQty(itemsQty);
        await InventoryPage.clickCheckOutBtn();
        await InventoryPage.inputFirstName('John');
        await InventoryPage.inputLastName('Doe');
        await InventoryPage.inputPostalCode(12345);
        await browser.pause(1000)
        await InventoryPage.clickContinueBtn();
        let subtotalPrice = await InventoryPage.getSummarySubTotalPrice();
        expect(subtotalPrice).toEqual(price);
        let taxes = await InventoryPage.getSummaryTaxes();
        expect(taxes).toEqual(+(price * 0.08).toFixed(2));
        let totalPrice = await InventoryPage.getSummaryTotalPrice();
        expect(+(subtotalPrice + taxes).toFixed(2)).toEqual(totalPrice);
        await InventoryPage.clickFinishBtn();
        await InventoryPage.checkThankYouText('THANK YOU FOR YOUR ORDER');
    });

    afterEach(async function () {
        await LoginPage.logOut();
        // await browser.clearSessionStorage()
        await browser.deleteAllCookies()
    });

});


