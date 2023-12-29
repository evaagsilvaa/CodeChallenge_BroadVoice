import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SearchPage extends Page {
    /**
     * define selectors using getter methods
     */
    get allBooks () {
        return $$('//div[@id="pjax-container"]//section[@class="similar-books"]//div[contains(@id, "bookcard")]');
    }

    get container () {
        return $$('//div[@id="pjax-container"]//section[@class="similar-books"]//div[contains(@id, "bookcard")]');
    }

    get breadcrumb () {
        return $('//li[@class="breadcrumb-item active"]');
    }

    get addBookToBasketBtn () {
        return $('a.more.buy-button');
    }

    get filterBtn () {
        return $('div.search-filter-btn');
    }
    
    get allPriceFilters () {
        return $$('//div[@class="filter-item "]/a[contains(@href,"price_range")]');
    }

    async verifyIfBookExist (title) {
        var allBooksList = await this.allBooks;
        for (var book of allBooksList){
            if (await book.$('h6.book-title').getText() == title) return true;
        }
    }

    async addBookToBasket (title) {
        var allBooksList = await this.allBooks;
        for (var book of allBooksList){
            if (await book.$('h6.book-title').getText() == title) await book.$('a.more.buy-button').click();
        }
        await browser.pause(3000);
    }

    async clickOnBook (title) {
        var allBooksList = await this.allBooks;
        for (var book of allBooksList){
            if (await book.$('h6.book-title').getText() == title) book.click();
        }
        await browser.pause(3000);
    }

    async clickFilterBtn () {
        (await this.filterBtn).click();
    }

    async filterByPrice (range) {
        await browser.pause(500);
        var allPriceFilters_ = await this.allPriceFilters;
        for (var priceFilter of allPriceFilters_){
            var filterText = await priceFilter.getText();
            if (filterText.includes(range)) priceFilter.click();
        }
    }

    async verifyPriceOfBooksDisplayed (range) {
        await browser.pause(500);
        var allPriceFilters_ = await this.allPriceFilters;
        for (var priceFilter of allPriceFilters_){
            var filterText = await priceFilter.getText();
            if (filterText.includes(range)) priceFilter.click();
        }
    }

    async getNumberOfBooksDisplayed () {
        await browser.pause(500);
        return await this.allBooks.length;
    }


}

export default new SearchPage();
