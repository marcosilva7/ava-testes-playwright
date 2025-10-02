import { faker } from '@faker-js/faker';
var fakerBr = require('faker-br');

export function createUser() {
    return {
        name: faker.person.fullName(),
        username: faker.internet.username().replace(/\./g, '').substring(0, 19), // Limita o username a 10 caracteres e remove pontos
        cpf: fakerBr.br.cpf(),
        rg: fakerBr.br.rg(),
        cpf: fakerBr.br.cpf(),
        rg: fakerBr.br.rg(),
        phone: `339${faker.string.numeric(8)}`,
        email: faker.internet.email(),
        password: faker.internet.password({ length: 10 }),
        gender: faker.helpers.arrayElement(['Masculino', 'Feminino', 'Prefiro não dizer', 'Outro']),
        role: faker.helpers.arrayElement(['admin', 'todaspermissoes', 'suporte']),
        cep: fakerBr.address.zipCodeValid(),
        number: faker.number.int({ min: 1, max: 1000 }).toString(),
        course: faker.helpers.arrayElement(['Quality Assurance', 'Selenium', 'Conteúdo EJA', 'Novo conteúdo CONTED - Talvez a última', 'EDUCAÇÃO FÍSICA']),
    };
}