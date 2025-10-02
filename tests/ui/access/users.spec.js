import { test, expect } from '../../../support';
import { createUser } from '../../../support/utils/fakerHelper.js';

test.use({ storageState: 'support/auth/authFile.json' });

test('Verifica campos obrigatórios', async ({ page }) => {
    await page.users.visit();

    await page.users.clickNewUser();
    await page.users.save();

    // Verifica as mensagens de campos obrigatórios
    await page.users.obrigatoryFields('O nome deve conter pelo menos 3 caracteres');
    await page.users.obrigatoryFields('O nome de usuário deve conter pelo menos 3 caracteres');
    await page.users.obrigatoryFields('Email inválido');
    await page.users.obrigatoryFields('Campo obrigatório');
    await page.users.obrigatoryFields('Selecione pelo menos 1 grupo');
});

test('Cria usuário de acesso', async ({ page }) => {
    const user = createUser();

    await page.users.visit();

    await page.users.clickNewUser();
    await page.users.createUser(user);
    const target = 'Usuário criado com sucesso!';
    await page.users.alertHaveText(target);

    await expect(page.locator('tbody')).toContainText(user.username);
});

test('Edita usuário de acesso', async ({ page }) => {
    await page.users.visit();

    await page.users.editUser();
    await page.users.fillName('Usuário Editado');
    await page.users.saveEdit();

    await expect(page.locator('tbody')).toContainText('Usuário Editado');
});