import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SearchPage extends Page {
    /**
     * define selectors using getter methods
     */
    get allBooks() {
        return $$('//div[@id="pjax-container"]//section[@class="similar-books"]//div[contains(@id, "bookcard")]');
    }

    get container() {
        return $$('//div[@id="pjax-container"]//section[@class="similar-books"]//div[contains(@id, "bookcard")]');
    }

    get breadcrumb() {
        return $('//li[@class="breadcrumb-item active"]');
    }

    get addBookToBasketBtn() {
        return $('a.more.buy-button');
    }

    get filterBtn() {
        return $('div.search-filter-btn');
    }
    
    get allPriceFilters() {
        return $$('//div[@class="filter-item "]/a[contains(@href,"price_range")]');
    }

    async verifyIfBookExist(title) {
        const allBooksList = await this.allBooks;
        await allBooksList.waitForDisplayed({ timeout: 3000 });
        for (const book of allBooksList){
            if (await book.$('h6.book-title').getText() === title) return true;
        }
        return false;
    }

    async addBookToBasket(title) {
        const allBooksList = await this.allBooks;
        await allBooksList.waitForDisplayed({ timeout: 3000 });
        for (const book of allBooksList){
            if (await book.$('h6.book-title').getText() === title){
                await book.$('a.more.buy-button').click();
                break;
            }
        }
    }

    async clickOnBook(title) {
        const allBooksList = await this.allBooks;
        await allBooksList.waitForDisplayed({ timeout: 3000 });
        for (const book of allBooksList){
            if (await book.$('h6.book-title').getText() === title){
                book.click();
                break;
            }
        }
    }

    async clickFilterBtn() {
        (await this.filterBtn).click();
    }

    async filterByPrice(range) {
        const allPriceFilters_ = await this.allPriceFilters;
        await allPriceFilters_.waitForDisplayed({ timeout: 3000 });
        for (const priceFilter of allPriceFilters_){
            const filterText = await priceFilter.getText();
            if (filterText.includes(range)){
                priceFilter.click();
                break;
            }
        }
    }

    async getNumberOfBooksDisplayed() {
        await this.allBooks.waitForDisplayed({ timeout: 3000 });
        return await this.allBooks.length;
    }


}

export default new SearchPage();
