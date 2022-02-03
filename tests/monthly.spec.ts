import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/Home.page'

test.describe('Monthly display of new releases', () => {
    let homePage: HomePage

    //Before hook
    test.beforeEach(async ({ page }) =>{
        let homePage = new HomePage( page )
        //Open shoe store web site and verify Home page
        await homePage.visit()
        await homePage.verifyTitle()
        await homePage.verifyMessage('Pre-Order your shoes today')
    })
    //
    test('Reviewing January released shoes', async ({ page }) => {
        let homePage = new HomePage( page )
        
        await homePage.clickOnJanTopNavLink()
        await homePage.delayExecution(2000)
        //Get title for the Monthly result page
        const jan_title = await page.title()
        //verify page title
        expect(jan_title).toEqual('Shoe Store: January\'s Shoes')
        await page.waitForFunction('document.querySelector("body").innerText.includes("January\'s Shoes")')
        
        //Verify that January releses paga contains 6 products
        for(let i=1; i <= 6; i++){
            await page.locator('(//a[contains(.,"January")])['+i+']').isVisible()
        }
    })

    
    test('Reviewing December released shoes', async({ page }) => {
        let homePage = new HomePage( page )

        await homePage.clickOnDecTopNavLink()
        await homePage.delayExecution(2000)
        //Get title for the Monthly result page
        const dec_title = await page.title()
        //verify page title
        expect(dec_title).toEqual('Shoe Store: December\'s Shoes')
        await page.waitForFunction('document.querySelector("body").innerText.includes("December\'s Shoes")')
        
        //Verify that January releses paga contains number of products
        await page.locator('(//a[contains(.,"December")])[2]').isVisible()
        //await homePage.delayExecution(2000)
    })
     

    //After each hook to close browser
    test.afterEach(async ({ page }) => {
        await page.close()
    })

})

