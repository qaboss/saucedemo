const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');

const standard_user = 'standard_user';

const validPass = 'secret_sauce';
let addToCard = 'Add to cart';
let remove = 'Remove';

describe('Check sorting functionality', () => {
    beforeEach(async function () {
        await LoginPage.open();
    });
    
    it('Check sorting A-Z functionality', async () => {
        await LoginPage.login(standard_user, validPass);
        await InventoryPage.checkInventoryContainarVisibility(true);
        let namesArr = await InventoryPage.getAllInventoryItemNames();
        namesArr.sort();
        await InventoryPage.clickSortMenu('az');
        let namesArrSorted = await InventoryPage.getAllInventoryItemNames();
        let flag = true;
        for(let i = 0; i < namesArrSorted.length; i++){
        console.log(namesArrSorted[i]);
          if(namesArrSorted[i] !== namesArr[i]){
            flag = false
          }
        }
        expect(flag).toBe(true);
    });
    
    it('Check sorting Z-A functionality', async () => {
        await LoginPage.login(standard_user, validPass);
        await InventoryPage.checkInventoryContainarVisibility(true);
        let namesArr = await InventoryPage.getAllInventoryItemNames();
        namesArr.sort();
        await InventoryPage.clickSortMenu('za');
        let namesArrSorted = await InventoryPage.getAllInventoryItemNames();
        namesArrSorted.reverse()
        expect(namesArrSorted.join() === namesArr.join()).toBe(true);
    });
    
    it('Check sorting ascending functionality', async () => {
        await LoginPage.login(standard_user, validPass);
        await InventoryPage.checkInventoryContainarVisibility(true);
        let pricesArr = await InventoryPage.getAllInventoryItemPrices();
        console.log(pricesArr);
        pricesArr.sort((a, b) => a - b);
        await InventoryPage.clickSortMenu('lohi');
        let pricesArrSorted = await InventoryPage.getAllInventoryItemPrices();
        console.log(pricesArrSorted);
        expect(pricesArrSorted.join() === pricesArr.join()).toBe(true);
    });
    
    it('Check sorting descending functionality', async () => {
        await LoginPage.login(standard_user, validPass);
        await InventoryPage.checkInventoryContainarVisibility(true);
        let pricesArr = await InventoryPage.getAllInventoryItemPrices();
        console.log(pricesArr);
        pricesArr.sort((a, b) => b - a);
        await InventoryPage.clickSortMenu('hilo');
        let pricesArrSorted = await InventoryPage.getAllInventoryItemPrices();
        console.log(pricesArrSorted);
        expect(pricesArrSorted.join() === pricesArr.join()).toBe(true);
    });
    
    xit('Make 1 item sale', async () => {
        let itemsQty = 1;
        let price = 0;
        let name = faker.name.findName();
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
        await InventoryPage.inputFirstName(name.split( ' ')[0]);
        await InventoryPage.inputLastName(name.split( ' ')[1]);
        await InventoryPage.inputPostalCode(faker.address.zipCode());
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

describe('Check move back functionality', () => {
    before(async function () {
        await LoginPage.open();
    });
    
    it('Check inventory Url', async () => {
        let itemsQty = 1;
        await LoginPage.login(standard_user, validPass);
        await expect(browser).toHaveUrlContaining('inventory')
        await InventoryPage.checkInventoryContainarVisibility(true);
        for(let i = 0; i < itemsQty; i++){
            await InventoryPage.checkAddRemoveBtn(i, addToCard.toUpperCase());
            await InventoryPage.clickAddToCartBtn(i);
            await InventoryPage.checkAddRemoveBtn(i, remove.toUpperCase());
        }
    });
    
    it('Check cart Url', async () => {
        await InventoryPage.clickOnCartIcon();
        await expect(browser).toHaveUrlContaining('cart')
    });
    
    it('Check checkout Url', async () => {
        await InventoryPage.clickCheckOutBtn();
        await expect(browser).toHaveUrlContaining('checkout-step-one')
    });
    
    it('Check cancel functionality', async () => {
        await InventoryPage.clickCancelBtn();
        await expect(browser).toHaveUrlContaining('cart')
    });
    
    it('Check continue shoping functionality', async () => {
        await InventoryPage.clickContinueShopingBtn();
        await expect(browser).toHaveUrlContaining('inventory')
    });
 
    after(async function () {
        await LoginPage.logOut();
        await browser.deleteAllCookies()
    });

});

