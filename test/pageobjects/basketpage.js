import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class BasketPage extends Page {

    get numberIcon() {
        return $('//div[@class="add-to-cart  dropdown"]/a');
    }

    get allDistinctBooks() {
        return $$('//div[@class="addToCart-item"]/div[@class="row"]');
    }

    get emptyBasketText() {
        return $('//div[@class="add-to-cart  dropdown"]/div/div');
    }

    async numberOfBooksWithSpecificTitle(title) {
        const allBooksOnBasket = await this.allDistinctBooks;
        await allBooksOnBasket.waitForDisplayed({ timeout: 3000 });
        for (const book of allBooksOnBasket){
            if (await book.$('h2 > a').getText() === title) return await book.$('span.b-count');
        }
    }

    async removeBookWithSpecificTitle(title) {
        const allBooksOnBasket = await this.allDistinctBooks;
        await allBooksOnBasket.waitForDisplayed({ timeout: 3000 });
        for (const book of allBooksOnBasket){
            if (await book.$('h2 > a').getText() === title){
                await book.$('a[title="Remover"]').click();
                break;
            }
        }
    }


}

export default new BasketPage();
