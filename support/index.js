const { test: base, expect } = require('@playwright/test');

import { Users } from '../actions/access/Users.js';
import { Login } from '../actions/login/Login.js';
import { PasswordRecovery } from '../actions/login/PasswordRecovery.js';

const test = base.extend({
    page: async ({ page }, use) => {
        const context = page;

        context ['users']= new Users(page);
        context ['login']= new Login(page);
        context ['passwordRecovery']= new PasswordRecovery(page);

        await use(context);
    },
    request: async ({ request }, use) => {
        const context = request;
        context['api'] = new Api(request);
        await use(context);
    }
});

export { test, expect };
