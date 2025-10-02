import { test, expect } from '../../../support';
import { createUser } from '../../../support/utils/fakerHelper.js';

test.use({ storageState: 'support/auth/authFile.json' });

test('Verifica campos obrigatórios', async ({ page }) => {
    const student = createUser();

    await page.student.visit();

    await page.student.clickNewStudent();
    await page.student.next();

    await page.student.obrigatoryFields('Campo obrigatório');
    await page.student.obrigatoryFields('Campo obrigatório');
    await page.student.obrigatoryFields('Email inválido');
});

test('Cria aluno', async ({ page }) => {
    const student = createUser();

    await page.student.visit();
    await page.student.clickNewStudent();

    await page.student.createStudent(student);
    
    const target = 'Aluno criado com sucesso!';
    await page.student.alertHaveText(target);
})

test('Edita aluno', async ({ page }) => {
    await page.student.visit();

    await page.student.editStudent();
    await page.student.fillName('Aluno Editado');
    
    await page.student.next();
    await page.student.next();
    
    await page.student.saveEdit();
    await expect(page.locator('tbody')).toContainText('Aluno Editado');
});