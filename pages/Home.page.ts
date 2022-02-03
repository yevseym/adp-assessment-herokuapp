import { Locator, expect, Page } from "@playwright/test";

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
export class HomePage{
    //Define selectors
    readonly page: Page
    readonly HomeLink: Locator 
    readonly JanTopNavLink: Locator
    readonly FebTopNavLink: Locator
    readonly MarTopNavLink: Locator
    readonly AprTopNavLink: Locator
    readonly MayTopNavLink: Locator
    readonly NovTopNavLink: Locator
    readonly DecTopNavLink: Locator
    readonly AllShoesTopNav: Locator
    readonly SearchSelect: Locator
    readonly SearchSubmit: Locator
    readonly RemindEmailInput: Locator
    readonly RemindEmailSubmit: Locator

    constructor(page: Page){
        this.page = page
        this.HomeLink = page.locator('text=Home')
        this.JanTopNavLink = page.locator('[href="/months/january"]')
        this.DecTopNavLink = page.locator('[href="/months/december"]')
        this.RemindEmailInput = page.locator('#remind_email_input')
        this.RemindEmailSubmit = page.locator('#remind_email_submit')
        this.SearchSubmit = page.locator('#search_button')
        this.SearchSelect = page.locator('#brand')
    }
    
    //Define page actions
    async visit(){
        await this.page.goto('https://shoe-store-july.herokuapp.com/')
    }

    async verifyTitle(){
        const page_title = await this.page.title()
        //verify page title
        expect(page_title).toEqual('Shoe Store: Welcome to the Shoe Store')
    }

    async verifyMessage(message){
        await this.page.waitForFunction('document.querySelector("body").innerText.includes("'+message+'")')
    }

    async clickOnJanTopNavLink(){
        await this.JanTopNavLink.click()
    }

    async clickOnDecTopNavLink(){
        await this.DecTopNavLink.click()
    }

    async clickOnSearchSubmitButton(){
        await this.SearchSubmit.click()
    }

    async selectBrandOnSearch(brand){
        await this.SearchSelect.selectOption(brand)
    }

    async delayExecution(mills){
        await delay(mills)
    }
}