import { faker } from '@faker-js/faker';

export function createUser() {
    return {
        name: faker.person.fullName(),
        username: faker.string.numeric(10),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 10 }),
        gender: faker.helpers.arrayElement(['Masculino', 'Feminino', 'Prefiro não dizer', 'Outro']),
        role: faker.helpers.arrayElement(['admin', 'todaspermissoes', 'suporte']),
    };
}