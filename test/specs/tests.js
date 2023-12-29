import { expect } from '@wdio/globals'
import HomePage from '../pageobjects/homepage.page.js'
import SearchPage from '../pageobjects/searchpage.js'
import BookPage from '../pageobjects/bookpage.js'
import BasketPage from '../pageobjects/basketpage.js'
import homepagePage from '../pageobjects/homepage.page.js'

describe('LeYa website', () => {
    beforeEach('Open Page', async () => {
        //Open LeYa URL
        await HomePage.open();

        //Accept Cookies
        await HomePage.clickAcceptCookies();
    })


    it('Scenario 1 - Seeking "George" Confirming "O Triunfo dos Porcos" Presence, and Validating Book Description with "Quinta Manor"', async () => {        
        //Search for 'George'
        await HomePage.searchFor('George');

        //Verify that the Search Page opens
        await expect(await SearchPage.breadcrumb).toHaveText("Pesquisa");

        //Verify that there's a book with the name 'O Triunfo dos Porcos'
        const bookExist = await SearchPage.verifyIfBookExist('O Triunfo dos Porcos');
        await expect(bookExist).toBe(true);

        //Click on book 'O Triunfo dos Porcos'
        await SearchPage.clickOnBook('O Triunfo dos Porcos');

        //Verify that the Book page opens
        await expect(SearchPage.breadcrumb).toHaveText("O Triunfo dos Porcos");

        //Check description of the book
        await expect(await BookPage.description).toHaveText(expect.stringContaining('Quinta Manor'));

    }),
    it('Scenario 2 - Searching for "1984" and Confirming Author, ISBN, Pages, and Dimensions', async () => {
        //Search for 'George'
        await HomePage.searchFor('1984');

        //Verify that the Search Page opens
        await expect(SearchPage.breadcrumb).toHaveText("Pesquisa");

        //Verify that there's a book with the name '1984'
        const bookExist = await SearchPage.verifyIfBookExist('1984');
        await expect(bookExist).toBe(true);

        //Click on book '1984'
        await SearchPage.clickOnBook('1984');
        
        //Verify that the Book page opens
        await expect(SearchPage.breadcrumb).toHaveText("1984");

        //Check author of the book
        await expect(BookPage.author).toHaveText('GEORGE ORWELL');
        
        //Check ISBN of the book
        await expect(BookPage.isbn).toHaveText(expect.stringContaining('9789722071550'));
        
        //Check number of pages of the book
        await expect(BookPage.numPages).toHaveText(expect.stringContaining('344'));
        
        //Check dimensions of the book
        await expect(BookPage.dimensions).toHaveText(expect.stringContaining('235 x 157 x 23 mm'));


    }),
    it('Scenario 3 - Searching for "1984" and Confirming Authorship of "A Quinta dos Animais"', async () => {
        //Search for '1984'
        await HomePage.searchFor('1984');

        //Verify that the Search Page opens
        await expect(SearchPage.breadcrumb).toHaveText("Pesquisa");

        //Verify that there's a book with the name '1984'
        const bookExist = await SearchPage.verifyIfBookExist('1984');
        await expect(bookExist).toBe(true);

        //Click on book '1984'
        await SearchPage.clickOnBook('1984');

        //Verify that the Book page opens
        await expect(SearchPage.breadcrumb).toHaveText("1984");

        //Verify that the book 'A Quinta dos Animais' is authored by the same author
        const bookSameAuthorExist = await BookPage.verifyIfBookHasSameAuthor('A Quinta dos Animais');
        await expect(bookSameAuthorExist).toBe(true);
    }),
    it('Scenario 4 - Finding and Adding "1984" to the Basket', async () => {
        //Search for '1984'
        await HomePage.searchFor('1984');

        //Verify that the Search Page opens
        await expect(SearchPage.breadcrumb).toHaveText("Pesquisa");

        //Verify that there's a book with the name '1984'
        const bookExist = await SearchPage.verifyIfBookExist('1984');
        await expect(bookExist).toBe(true);

        //Add book '1984' to basket
        await SearchPage.addBookToBasket('1984');
        
        //Check if number of different books on the basket is equal to 1 
        await expect(await BasketPage.allDistinctBooks).toBeElementsArrayOfSize(1);

        //Check if number of books added to the basket with the title 1984
        await expect(await BasketPage.numberOfBooksWithSpecificTitle("1984")).toHaveText("1")
    }),
    it('Scenario 5 - Switch to the dark mode theme', async () => {
        //Click on Dark Mode icon
        await HomePage.clickDarkModeBtn();

        //Check if web page change to Dark Mode sucessfully
        await expect(await HomePage.darkModeBackGround).toBeEnabled();

        //Check if the icon has changed to a moon icon (sun > moon)
        await expect(await HomePage.darkModeIcon).toHaveAttribute('class','nav-icon icon-moon');
    }),
    it('Scenario 6 - Add a book to the basket and then remove it', async () => {
        //Search for '1984'
        await HomePage.searchFor('1984');

        //Verify that the Search Page opens
        await expect(SearchPage.breadcrumb).toHaveText("Pesquisa");

        //Verify that there's a book with the name '1984'
        const bookExist = await SearchPage.verifyIfBookExist('1984');
        await expect(bookExist).toBe(true);

        //Add book '1984' to basket
        await SearchPage.addBookToBasket('1984');

        //Remove book from the basket
        await BasketPage.removeBookWithSpecificTitle("1984");

        //Check that the basket is empty
        await expect(await BasketPage.emptyBasketText).toHaveText('Carrinho vazio');

    }),
    it('Scenario 7 - Search using a filter by price', async () => {
        //Search for '1984'
        await HomePage.searchFor('1984');

        //Verify that the Search Page opens
        await expect(SearchPage.breadcrumb).toHaveText("Pesquisa");

        //Filter search by price (10€ to 20€)
        await SearchPage.clickFilterBtn();
        await SearchPage.filterByPrice("€10 - €20");

        //Verify that there's only one book displayed
        await expect(await SearchPage.getNumberOfBooksDisplayed()).toBe(1);
    })
})

