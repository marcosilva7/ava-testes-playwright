import { expect } from '@playwright/test';

export class PasswordRecovery {
    constructor(page) {
        this.page = page;
        this.usernameInput = '[data-cy="inputUsername"] input';
        this.submit = '[data-cy="buttonSubmit"]';
        this.textResetPassword = '[data-cy="textResetPassword"]';
        this.linkBackLoginPage = '[data-cy="linkBackLoginPage"]';
    }

    async visit() {
        await this.page.click('[data-cy="buttonForgotPassword"]');
        await expect(this.page.locator(this.textResetPassword)).toBeVisible({timeout: 10000});
    }

    async fillUsername(username) {
        await this.page.fill(this.usernameInput, username);
    }
    
    async submitButton() {
        await this.page.click(this.submit);
    }

    async returnToLogin() {
        await this.page.click(this.linkBackLoginPage);
    }

    async expectConfirmation(message) {
        await expect(this.page.getByText(message)).toBeVisible();
    }
}