import { Page } from "@playwright/test";
import { removeSlashUrl } from "../utils";

export class LoginPage {

    baseURL = 'https://www.saucedemo.com';

    locatorUsername = '#user-name';
    locatorPassword = '#password';

    locatorButtonLogin = '#login-button';

    locatorErrorMessage = '[data-test="error"]';

    /**
     * 
     * @param {Page} page 
     */
    constructor(page) {
        this.page = page;
    }

    async goto(){
        await this.page.goto(this.baseURL);
    }

    async fillUserPassword(username,password){
        await this.page.locator(this.locatorUsername).fill(username);
        await this.page.locator(this.locatorPassword).fill(password);
    }

    async clickLogin() {
        await this.page.click(this.locatorButtonLogin);
    }

    async getUsername() {
        return await this.page.locator(this.locatorUsername).inputValue();
    }

    async getPassword () {
        return await this.page.locator(this.locatorPassword).inputValue();
    }

    async getErrorMessage() {
        try{
            return await this.page.locator(this.locatorErrorMessage).textContent({ timeout : 1000}) || "";
        }catch(e){ }
        return "";
    }
    
    isValidUrl() {
        const url = removeSlashUrl(this.page.url());
        // console.log(url, this.baseURL, this.page.url());
        // console.log(url == this.baseURL);
        return url === this.baseURL;
    }
}