
/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage {
    /**
     * define selectors using getter methods
     */
    get inputUsername() {
        return $('input#user-name');
    }

    get inputPassword() {
        return $('input#password');
    }

    get btnSubmit() {
        return $('input#login-button');
    }

    get loginLogo() {
        return $('div.login_logo');
    }

    get botLogo() {
        return $('div.bot_column');
    }

    get loginCreds() {
        return $('div#login_credentials');
    }

    get passCreds() {
        return $('div.login_password');
    }

    get loginError() {
        return $('h3[data-test="error"]');
    }

    get burgerMenu() {
        return $('button#react-burger-menu-btn');
    }

    get logOutLink() {
        return $('#logout_sidebar_link');
    }


    /**
     * overwrite specific options to adapt it to page object
     */
    async open() {
        return browser.url(`https://www.saucedemo.com/`)
    }
    
    //Check login page elements

    async checkUrlContains(value) {
        await expect(browser).toHaveUrlContaining(value)
    }

    async checkLoginLogoVisibility() {
        expect(await this.loginLogo.isDisplayed()).toBe(true)
    }

    async checkUsernameInputVisibility() {
        expect(await this.inputUsername.isDisplayed()).toBe(true)
    }

    async checkPasswordInputVisibility() {
        expect(await this.inputPassword.isDisplayed()).toBe(true)
    }

    async checkLoginBtnVisibility() {
        expect(await this.btnSubmit.isDisplayed()).toBe(true)
    }

    async checkLoginBtnText(value) {
        expect(await this.btnSubmit.getText()).toHaveValueContaining(value)
    }

    async checkBotLogoVisibility() {
        expect(await this.botLogo.isDisplayed()).toBe(true)
    }

    async checkLoginCredsVisibility() {
        expect(await this.loginCreds.isDisplayed()).toBe(true)
    }

    async checkPassCredsVisibility() {
        expect(await this.passCreds.isDisplayed()).toBe(true)
    }

    async checkLoginErrorVisibility() {
        expect(await this.loginError.isDisplayed()).toBe(true)
    }

    async checkLoginErrorMessage(value) {
        let text = await this.loginError.getText();
        console.log(text);
        expect(text).toEqual(value)
    }


    //login using username and password
     
    async login(username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }
     
    async logOut() {
        await this.burgerMenu.click()
        await browser.pause(500)
        await this.logOutLink.waitForDisplayed()
        await this.logOutLink.click()
        await this.checkLoginBtnVisibility()
    }

}

module.exports = new LoginPage();
