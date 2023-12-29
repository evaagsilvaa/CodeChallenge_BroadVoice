import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {

    get searchField () {
        return $('//input[@id="searchbar-large"]');
    }

    get searchBtn () {
        return $('//button[@class="searchbar-large"]');
    }

    get acceptCookies() {
        return $('//*[@id="cookiescript_accept"]');
    }

    get darkModeBtn() {
        return $('//*[@id="darkmode"]');
    }

    get darkModeBackGround() {
        return $('//link[@data-role="darktheme"]');
    }

    get darkModeIcon() {
        return $('//*[@id="darkmode"]//i');
    }

    async clickAcceptCookies () {
        await this.acceptCookies.click();
    }

    async searchFor (text) {
        await this.searchField.setValue(text);
        await browser.pause(500);
        await this.searchBtn.click();
    }

    async clickDarkModeBtn () {
        await this.darkModeBtn.click();
    }
}

export default new HomePage();
