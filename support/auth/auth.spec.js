import { test, expect } from '../../support';
import data from '../../fixtures/environments.json';

test('authenticate', async ({ page }) => {
  await page.login.doLogin(
    data.sprint.admin.username, 
    data.sprint.admin.password
  );

  // Salva o estado de autenticação no arquivo auth.json
  await page.context().storageState({path: 'support/auth/authFile.json'});
});
