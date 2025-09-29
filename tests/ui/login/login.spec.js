import { test, expect } from '../../../support';
import data from '../../../fixtures/environments.json';

test('Insere apenas username e clica no botão de login', async ({ page }) => {
    await page.login.visit();
    await page.login.fillUsername(data.sprint.admin.username);
    await page.login.disableSubmitButton();
});

test('Insere apenas password e clica no botão de login', async ({ page }) => {
    await page.login.visit();
    await page.login.fillPassword(data.sprint.admin.password);
    await page.login.disableSubmitButton();
});

test('Login com sucesso', async ({ page }) => {
    await page.login.doLogin(data.sprint.admin.username, data.sprint.admin.password);
});
