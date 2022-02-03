import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/Home.page'

test.describe('Search by Brand', () => {
    let homePage: HomePage

    //Before hook
    test.beforeEach(async ({ page }) =>{
        let homePage = new HomePage( page )
        //Open shoe store web site and verify Home page
        await homePage.visit()
        await homePage.verifyTitle()
        await homePage.verifyMessage('Pre-Order your shoes today')
    })

    //Negative Scenario
    test('Search without selecting brand', async ({ page }) => {
        let homePage = new HomePage( page )
        await homePage.SearchSubmit.click()
        await homePage.verifyMessage('Please Select a Brand')
    })

    //Positive Scenario
    test('Search shoes for Prada brand', async({ page }) => {
        let homePage = new HomePage( page )
        await homePage.selectBrandOnSearch('Prada')
        await homePage.clickOnSearchSubmitButton()
        //Get title for the Search result page
        const title = await page.title()
        //verify page title
        expect(title).toEqual('Shoe Store:')
        await page.waitForFunction('document.querySelector("body").innerText.includes("Prada\'s Shoes")')
        await page.waitForFunction('document.querySelector("body").innerText.includes("$1,800.00")') 
        await page.locator('(//a[contains(.,"Prada")])[1]').isVisible()
        await homePage.delayExecution(2000)
    })
       
       
        //search text on the page
        //await page.waitForFunction('document.querySelector("body").innerText.includes("Pre-Order your shoes today")')
    
    
        //await page.click('text=Search')

        //await page.waitForFunction('document.querySelector("body").innerText.includes("Please Select a Brand")')

        //await page.click('text=January')

})

