import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {

    get searchField() {
        return $('//input[@id="searchbar-large"]');
    }

    get searchBtn() {
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
    
    get searchResults() {
        return $('//div[@class="search-content search-bar-results"]');
    }

    async clickAcceptCookies() {
        const acceptCookies = await this.acceptCookies;
        await acceptCookies.waitForDisplayed({ timeout: 3000 });
        if (acceptCookies) {
            acceptCookies.click();
        }
    }

    async searchFor(text) {
        (await this.searchField).waitForDisplayed({ timeout: 3000 });
        await this.searchField.setValue(text);

        (await this.searchResults).waitForDisplayed({ timeout: 3000 });

        (await this.searchBtn).waitForDisplayed({ timeout: 3000 });
        (await this.searchBtn).click();
    }

    async clickDarkModeBtn() {
        const darkModeBtn = await this.darkModeBtn;
        await darkModeBtn.waitForDisplayed({ timeout: 3000 });
        if (darkModeBtn) {
            darkModeBtn.click();
        }
    }
}

export default new HomePage();
