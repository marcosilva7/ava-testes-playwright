import data from '../../fixtures/environments.json';
import { expect } from '@playwright/test';

export class Student {
    constructor(page) {
        this.page = page;
        // Personal data
        this.nameInput = '[data-cy="name-input"] input';
        this.cpfInput = '[data-cy="cpf-input"] input';
        this.rgInput = '[data-cy="rg-input"] input';
        this.phoneInput = '[data-cy="phone-number-input"] input';
        this.emailInput = '[data-cy="email-input"] input';
        this.genderInput = '[data-cy="gender-select"] input';
        // Address data
        this.zipCodeInput = '[data-cy="zipcode-input"] input';
        this.numberInput = '[data-cy="number-input"] input';
        // Course
        this.courseInput = '[data-cy="enrollment-select"] input';
        // Buttons
        this.nextButton = this.page.getByRole('button', { name: 'Avançar' });
        this.submitButton = this.page.getByRole('button', { name: 'Criar' });
        this.editButton = this.page.getByRole('button', { name: 'Atualizar' });
    }

    /*
    * Methods for page navigation and actions
    */
    async visit() {
        await this.page.goto(data.sprint.url + '/admin/usuarios/alunos');
        await expect(this.page.locator('button >> text=Novo Aluno')).toBeVisible({ timeout: 10000 });
    }

    async clickNewStudent() {
        await this.page.getByRole('button', { name: 'Novo Aluno' }).click();
    }

    async editStudent() {
        await this.page.click('tbody tr:first-child button[aria-label="Editar"]');
        await expect(this.page.locator('span', { hasText: 'Editar Aluno' })).toBeVisible();
    }

    async save() {
        await this.submitButton.click();
    }

    async saveEdit() {
        await this.editButton.click();
    }

    async next() {
        await this.nextButton.click();
    }

    async alertHaveText(target) {
        await expect(this.page.locator('.Toastify__toast[role="alert"]'))
            .toHaveText(target);
    };

    async obrigatoryFields(target) {
        const message = this.page.locator(`div.MuiBox-root >> span:has-text("${target}")`);
        await expect(message.first()).toHaveText(target);
    }

    /*
    * Methods for personal data
    */
    async fillName(name) {
        await this.page.fill(this.nameInput, name);
    }
    async fillCpf(cpf) {
        await this.page.fill(this.cpfInput, cpf);
    }
    async fillRg(rg) {
        await this.page.fill(this.rgInput, rg);
    }
    async fillPhone(phone) {
        await this.page.fill(this.phoneInput, phone);
    }
    async fillEmail(email) {
        await this.page.fill(this.emailInput, email);
    }
    async selectGender(gender) {
        await this.page.locator(this.genderInput).click();
        await this.page.locator(`text=${gender}`).click();
    }
    /*
    * Methods for address data
    */
    async fillZipCode(zipcode) {
        this.page.fill(this.zipCodeInput, zipcode);
        this.nextButton.click(); // Para requisitar a API do ViaCEP

        const [response] = await Promise.all([
            this.page.waitForResponse(resp =>
                resp.url().includes(`viacep.com.br/ws/${zipcode}/json/`) &&
                resp.status() === 200
            ),
        ]);
        const numberValue = await this.page.inputValue(this.numberInput);
        if (!numberValue) {
            await this.page.fill(this.numberInput, '21');
        }
    }
    /*
    * Methods for course
    */
    async selectCourse(course) {
        await this.page.fill(this.courseInput, course);
        await this.page.getByRole('option', { name: course, exact: true }).click();
    }

    async createStudent(student) {
        // Person data
        await this.fillName(student.name);
        await this.fillCpf(student.cpf);
        await this.fillRg(student.rg);
        await this.fillPhone(student.phone);
        await this.fillEmail(student.email);
        await this.selectGender(student.gender);
        await this.next();
        // Address data
        await this.fillZipCode(student.cep);
        await this.next();
        // Course data
        await this.selectCourse(student.course);
        await this.save();
        // Aguarda o carregamento completo da página
        await this.page.waitForLoadState('networkidle');
    }
}