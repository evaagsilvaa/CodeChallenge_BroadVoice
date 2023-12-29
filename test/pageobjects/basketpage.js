import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class BasketPage extends Page {

    get numberIcon() {
        return $('//div[@class="add-to-cart  dropdown"]/a');
    }

    get basketBtn() {
        return $('//div[@class="add-to-cart  dropdown"]');
    }

    get allDistinctBooks() {
        return $$('//div[@class="addToCart-item"]/div[@class="row"]');
    }

    get emptyBasketText() {
        return $('//div[@class="add-to-cart  dropdown"]/div/div');
    }

    get basketOpen() {
        return $('//div[@class="dropdown-menu dropdown-menu-right show"]');
    }

    async numberOfBooksWithSpecificTitle(title) {
        const allBooksOnBasket = await this.allDistinctBooks;
        for (const book of allBooksOnBasket){
            if (await book.$('h2 > a').getText() === title) return await book.$('span.b-count');
        }
    }

    async removeBookWithSpecificTitle(title) {
        if (!(await this.basketOpen).isDisplayed()){
            (await this.basketBtn).click();
        }

        const allBooksOnBasket = await this.allDistinctBooks;
        for (const book of allBooksOnBasket){
            if (await book.$('h2 > a').getText() === title){
                await browser.waitUntil(async () => {
                    return (await book.$('a[title="Remover"]').isClickable());
                });
                await book.$('a[title="Remover"]').click();
                break;
            }
        }
    }

}

export default new BasketPage();
