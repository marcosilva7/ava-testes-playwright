import data from '../../fixtures/environments.json';
import { expect } from '@playwright/test';

export class Login {
    constructor(page) {
        this.page = page;
        this.username = '[name="username"]';
        this.password = '[name="password"]';
        this.submit = '[data-cy="buttonSubmit"]';
    }

    async visit(){
        await this.page.goto(data.sprint.url);
    }

    async fillUsername(username){
        await this.page.fill(this.username, username);
    }

    async fillPassword(password){
        await this.page.fill(this.password, password);
    }

    async clickSubmit(){
        await this.page.click(this.submit);
    }

    async disableSubmitButton() {
        await expect(this.page.locator(this.submit))
            .toBeDisabled();
    };

    async doLogin(username, password) {
        await this.page.goto(data.sprint.url);
        await this.page.fill(this.username, username);
        await this.page.fill(this.password, password);
        await this.page.click(this.submit);
        await expect(this.page.locator('span >> text=Dashboard')).toBeVisible({ timeout: 20000 });
    }
}