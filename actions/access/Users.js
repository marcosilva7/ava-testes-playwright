import data from '../../fixtures/environments.json';
import { expect } from '@playwright/test';

export class Users {
    constructor(page) {
        this.page = page;
        this.nameInput = '[data-cy="name-input"] input';
        this.usernameInput = '[data-cy="username-input"] input';
        this.emailInput = '[data-cy="email-input"] input';
        this.genderInput = '[data-cy="gender-select"] input';
        this.passwordInput = ('[data-cy="password-input"] input');
        this.confirmPasswordInput = ('[data-cy="confirm-input"] input');
        this.roleSelect = '[data-cy="group-select"] input';
        this.saveButton = 'button[data-cy="create-btn"]';
        this.saveEditButton = 'button[data-cy="submit-btn"]';
    }

    async visit() {
        await this.page.goto(data.sprint.url + '/admin/usuarios');
        await expect(this.page.locator('button >> text=Novo Usuário')).toBeVisible({timeout: 10000});
    }

    async clickNewUser() {
        await this.page.getByRole('button', { name: 'Novo Usuário'}).click();
    }

    async fillName(name) {
        await this.page.fill(this.nameInput, name);
    }

    async fillUsername(username) {
        await this.page.fill(this.usernameInput, username);
    }

    async fillEmail(email) {
        await this.page.fill(this.emailInput, email);
    }
    
    async selectGender(gender) {
        await this.page.locator(this.genderInput).click();
        await this.page.locator(`text=${gender}`).click();
    }

    async fillPassword(password) {
        await this.page.fill(this.passwordInput, password);
    }

    async fillConfirmPassword(password) {
        await this.page.fill(this.confirmPasswordInput, password);
    }

    async selectRole(role) {
        await this.page.fill(this.roleSelect, role);
        // Aguarda o carregamento completo da página
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(`li:has-text("${role}")`).click();
        await expect(this.page.locator('[data-cy="group-select"]')).toContainText(role);
    }

    
    async save() {
        await this.page.click(this.saveButton);
    }
    
    async saveEdit() {
        await this.page.click(this.saveEditButton);
    }

    async alertHaveText(target) {
        await expect(this.page.locator('.Toastify__toast[role="alert"]'))
        .toHaveText(target);
    };
    
    async obrigatoryFields(target) {
        const message = this.page.locator(`div.MuiBox-root >> span:has-text("${target}")`);
        await expect(message.first()).toHaveText(target);
    }
    
    async editUser() {
        await this.page.click('tbody tr:first-child button[aria-label="Editar"]');
        await expect(this.page.locator('span', { hasText: 'Editar Usuário' })).toBeVisible();

    }

    async createUser({ name, username, email, password, gender, role }) {
        await this.fillName(name);
        await this.fillUsername(username);
        await this.fillEmail(email);
        await this.selectGender(gender);
        await this.fillPassword(password);
        await this.fillConfirmPassword(password);
        await this.selectRole(role);
        
        await this.save();
        // Aguarda o carregamento completo da página
        await this.page.waitForLoadState('networkidle');
    }
}