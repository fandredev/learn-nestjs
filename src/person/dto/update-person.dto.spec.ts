import { validate } from 'class-validator';

import { faker } from '@faker-js/faker';
import { UpdatePersonDto } from './update-person.dto';

describe(`${UpdatePersonDto.name}`, () => {
  let updatePersonDto: UpdatePersonDto;

  beforeEach(() => {
    updatePersonDto = new UpdatePersonDto();
  });

  it('should validate DTO when he is not invalid', async () => {
    updatePersonDto.email = faker.internet.email();
    updatePersonDto.password = '6JM(AX)r!,ig';
    updatePersonDto.name = faker.person.firstName();

    const errors = await validate(updatePersonDto);
    expect(errors.length).toBe(0); // Nenhum erro significa que o DTO é válido
  });

  it('should failed DTO when email is invalid', async () => {
    updatePersonDto.email = 'randomemail';
    updatePersonDto.password = '6JM(AX)r!,ig';
    updatePersonDto.name = faker.person.firstName();

    const errors = await validate(updatePersonDto);

    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('email');
  });

  it('should failed DTO when password is too small', async () => {
    updatePersonDto.email = faker.internet.email();
    updatePersonDto.password = '6J';
    updatePersonDto.name = faker.person.firstName();

    const errors = await validate(updatePersonDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('password');
  });

  it('should failed DTO when name is empty', async () => {
    updatePersonDto.email = faker.internet.email();
    updatePersonDto.password = '6JM(AX)r!,ig';
    updatePersonDto.name = '';

    const errors = await validate(updatePersonDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('name');
  });

  it('should failed DTO when name is greather 255 characteres', async () => {
    updatePersonDto.email = faker.internet.email();
    updatePersonDto.password = '6JM(AX)r!,ig';
    updatePersonDto.name = 'a'.repeat(256);

    const errors = await validate(updatePersonDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('name');
  });
});
