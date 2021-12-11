const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');

const standard_user = 'standard_user';
const locked_out_user = 'locked_out_user';
const problem_user = 'problem_user';
const performance_glitch_user = 'performance_glitch_user';

const validPass = 'secret_sauce';
const errorText = 'Epic sadface: Username and password do not match any user in this service';
const emptyString = '';

describe('Login Page Tests', () => {
    beforeEach(async function () {
        await LoginPage.open();
        // await browser.pause(1000)
    });
    
    it('Check Url', async () => {
        await LoginPage.checkUrlContains('saucedemo')
    });

    it('Check Login Page Elements', async () => {
        await LoginPage.checkLoginLogoVisibility();
        await LoginPage.checkUsernameInputVisibility();
        await LoginPage.checkPasswordInputVisibility();
        await LoginPage.checkBotLogoVisibility();
        await LoginPage.checkLoginBtnVisibility();
        await LoginPage.checkLoginBtnText('Login');
    });
    
    it('Should login with valid userName standard_user', async () => {
        await LoginPage.login(standard_user, validPass);
        await LoginPage.checkUrlContains('inventory')
        await InventoryPage.checkInventoryContainarVisibility(true);
    });

    it('Should login with valid userName problem_user', async () => {
        await LoginPage.login(problem_user, validPass);
        await InventoryPage.checkInventoryContainarVisibility(true);
    });

    it('Should login with valid userName performance_glitch_user', async () => {
        await LoginPage.login(performance_glitch_user, validPass);
        await InventoryPage.checkInventoryContainarVisibility(true);
    });

    it('Should not login with userName locked_out_user', async () => {
        await LoginPage.login(locked_out_user, validPass);
        await LoginPage.checkLoginErrorVisibility();
        await InventoryPage.checkInventoryContainarVisibility(false);
    });

    it('Should not login with invalid userName', async () => {
        await LoginPage.login(standard_user + Math.floor(Math.random() * (999)), validPass);
        await LoginPage.checkLoginErrorVisibility();
        await InventoryPage.checkInventoryContainarVisibility(false);
    });

    it('Should not login with invalid password', async () => {
        await LoginPage.login(standard_user, validPass + Math.floor(Math.random() * (999)));
        await LoginPage.checkLoginErrorVisibility();
        await InventoryPage.checkInventoryContainarVisibility(false);
    });

    it('Check login error message - incorrect creds', async () => {
        await LoginPage.login(standard_user + Math.floor(Math.random() * (999)), validPass + Math.floor(Math.random() * (999)));
        await LoginPage.checkLoginErrorVisibility();
        await LoginPage.checkLoginErrorMessage(errorText);
    });

    it('Check login error message - empty fields', async () => {
        await LoginPage.login(emptyString, emptyString);
        await LoginPage.checkLoginErrorVisibility();
        await LoginPage.checkLoginErrorMessage('Epic sadface: Username is required');
    });

    it('Check login error message - empty password', async () => {
        await LoginPage.login(standard_user, emptyString);
        await LoginPage.checkLoginErrorVisibility();
        await LoginPage.checkLoginErrorMessage('Epic sadface: Password is required');
    });

});


