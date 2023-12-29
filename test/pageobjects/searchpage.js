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

    get filterPage() {
        return $('//div[@class="offcanvas offcanvas-end show"]');
    }

    async verifyIfBookExist(title) {
        const allBooksList = await this.allBooks;
        for (const book of allBooksList){
            if (await book.$('h6.book-title').getText() === title) return true;
        }
        return false;
    }

    async addBookToBasket(title) {
        const allBooksList = await this.allBooks;
        for (const book of allBooksList){
            if (await book.$('h6.book-title').getText() === title){
                await book.$('a.more.buy-button').click();
                break;
            }
        }
    }

    async clickOnBook(title) {
        const allBooksList = await this.allBooks;
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
        const allPriceFilters = await this.allPriceFilters;
        for (const priceFilter of allPriceFilters){
            const filterText = await priceFilter.getText();
            if (filterText.includes(range)){
                priceFilter.click();
                break;
            }
        }
    }

    async getNumberOfBooksDisplayed(number) {        
        return await browser.waitUntil(async () => {
            const numBooks = await this.allBooks.length;

            return (await numBooks) === number;
        });
    }

    async hasBreadcrumb(name) {
        return await browser.waitUntil(async () => {
            const breadcrumb = await this.breadcrumb;

            return (await breadcrumb.getText()) === name;
          });
    }

    async priceFilterIsClickable() {
        return await browser.waitUntil(async () => {
            const firstPriceFilter = await this.allPriceFilters[0];
            return (await firstPriceFilter.isClickable());
        });
    }
    
}

export default new SearchPage();
