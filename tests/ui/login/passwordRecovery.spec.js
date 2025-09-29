import { test, expect } from '../../../support';
import data from '../../../fixtures/environments.json';

let usernameInvalido = 'usuario_invalido';

test('Visita a página de recuperação de senha e retorna para a página de login', async ({ page }) => {
    await page.login.visit();

    await page.passwordRecovery.visit();
    await expect(page).toHaveURL(/.*acesso\/recuperacao/);

    await page.passwordRecovery.returnToLogin();
    await expect(page).toHaveURL(/.*acesso\/login/);
});

test('Insere username inválido e clica no botão de recuperação de senha', async ({ page }) => {
    await page.login.visit();

    await page.passwordRecovery.visit();
    await page.passwordRecovery.fillUsername(usernameInvalido);
    await page.passwordRecovery.submitButton();

    const targetMessage = 'Não encontramos um usuário com esse endereço de e-mail.'

    await page.passwordRecovery.expectConfirmation(targetMessage);
});

test('Insere username válido e clica no botão de recuperação de senha', async ({ page }) => {
    await page.login.visit();

    await page.passwordRecovery.visit();
    await page.passwordRecovery.fillUsername(data.sprint.admin.username);
    await page.passwordRecovery.submitButton();
    // Aguarda o carregamento completo da página
    await page.waitForLoadState('networkidle');

    const targetMessage = 'E-mail enviado com sucesso';
    await page.passwordRecovery.expectConfirmation(targetMessage);
});