import { validate } from 'class-validator';
import { CreatePersonDto } from './create-person.dto';

import { faker } from '@faker-js/faker';

describe(`${CreatePersonDto.name}`, () => {
  let createPersonDto: CreatePersonDto;

  beforeEach(() => {
    createPersonDto = new CreatePersonDto();
  });

  it('should validate DTO when he is not invalid', async () => {
    createPersonDto.email = faker.internet.email();
    createPersonDto.password = '6JM(AX)r!,ig';
    createPersonDto.name = faker.person.firstName();

    const errors = await validate(createPersonDto);
    expect(errors.length).toBe(0); // Nenhum erro significa que o DTO é válido
  });

  it('should failed DTO when email is invalid', async () => {
    createPersonDto.email = 'randomemail';
    createPersonDto.password = '6JM(AX)r!,ig';
    createPersonDto.name = faker.person.firstName();

    const errors = await validate(createPersonDto);

    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('email');
  });

  it('should failed DTO when password is too small', async () => {
    createPersonDto.email = faker.internet.email();
    createPersonDto.password = '6J';
    createPersonDto.name = faker.person.firstName();

    const errors = await validate(createPersonDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('password');
  });

  it('should failed DTO when name is empty', async () => {
    createPersonDto.email = faker.internet.email();
    createPersonDto.password = '6JM(AX)r!,ig';
    createPersonDto.name = '';

    const errors = await validate(createPersonDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('name');
  });

  it('should failed DTO when name is greather 255 characteres', async () => {
    createPersonDto.email = faker.internet.email();
    createPersonDto.password = '6JM(AX)r!,ig';
    createPersonDto.name = 'a'.repeat(256);

    const errors = await validate(createPersonDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('name');
  });
});
