import { CreatePersonDto } from '../dto/create-person.dto';
import { Faker, pt_BR } from '@faker-js/faker';

interface PersonBuilderProps {
  setName(name?: string): this;
  setEmail(email?: string): this;
  setPassword(password?: string): this;
}

interface PersonDirectorProps {
  buildMe(): CreatePersonDto;
}

export default class PersonBuilder implements PersonBuilderProps {
  private personDTO: CreatePersonDto;
  private faker: Faker = new Faker({
    locale: [pt_BR],
  });

  constructor() {
    this.personDTO = new CreatePersonDto();
  }

  setName(name?: string) {
    this.personDTO.name = name || this.faker.person.firstName();

    return this;
  }

  setEmail(email?: string): this {
    this.personDTO.email = email || this.faker.internet.email();

    return this;
  }

  setPassword(password?: string): this {
    this.personDTO.password = password || this.faker.internet.password();

    return this;
  }

  build() {
    return this.personDTO;
  }
}

export class PersonDirector implements PersonDirectorProps {
  buildMe() {
    return new PersonBuilder()
      .setEmail('profissionalf.andre@gmail.com')
      .setName('Felipe')
      .setPassword('blablabla')
      .build();
  }
}
