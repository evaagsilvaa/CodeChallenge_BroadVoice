import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class BookPage extends Page {

    get breadcrumb() {
        return $('//li[@class="breadcrumb-item active"]');
    }

    get description() {
        return $('//section[@class="sinopse"]//div[contains(@class, "show-more")]');
    }

    get author() {
        return $('//a[@class="nome_autor"][1]');
    }

    get isbn() {
        return $('//section[@class="sinopse"]//ul/li[contains(text(),"ISBN: ")]');
    }

    get numPages() {
        return $('//section[@class="sinopse"]//ul/li[contains(text(),"Páginas: ")]');
    }

    get dimensions() {
        return $('//section[@class="sinopse"]//ul/li[contains(text(),"Dimensões: ")]');
    }

    get booksOfSameAuthor() {
        return $$('//div[@id="second-container"]//section[@class="similar-books"][1]//div[contains(@id, "bookcard")]');
    }

    async verifyIfBookHasSameAuthor(title) {
        const allBooksList = await this.booksOfSameAuthor;
        await allBooksList.waitForDisplayed({ timeout: 3000 });
        for (const book of allBooksList){
            if (await book.$('h6.book-title').getText() === title) return true;
        }

        return false;
    }
}

export default new BookPage();
