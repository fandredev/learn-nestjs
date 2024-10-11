import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';
import HashUtils from './utils/hash-password';

@Injectable()
export class PersonService {
  private hashUtils: HashUtils = new HashUtils();

  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async findAll() {
    const persons = await this.personRepository.find({
      order: {
        id: 'desc',
      },
    });

    return persons;
  }

  async findOne(id: number) {
    const findSpecificPerson = await this.personRepository.findOneBy({
      id,
    });

    if (!findSpecificPerson)
      throw new NotFoundException(`Not found person with ID: ${id}`);

    return findSpecificPerson;
  }

  async create(createPersonDto: CreatePersonDto) {
    try {
      const password = await this.hashUtils.hashPassword(
        createPersonDto.password,
      );

      const newPerson = {
        ...createPersonDto,
        password,
      };

      const createPerson = this.personRepository.create(newPerson);

      await this.personRepository.save(createPerson);

      return createPerson;
    } catch (error) {
      const emailRegisteredCodeError = '23505';

      if (error.code === emailRegisteredCodeError)
        throw new ConflictException('Email already registered');

      throw error;
    }
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    const personToUpdate = await this.personRepository.preload({
      id,
      ...updatePersonDto,
    });

    if (!personToUpdate)
      throw new NotFoundException(`Not found person with ID: ${id}`);
    return this.personRepository.save(personToUpdate);
  }

  async remove(id: number) {
    const person = await this.personRepository.findOneBy({
      id,
    });

    if (!person) throw new NotFoundException(`Not found person with ID: ${id}`);

    return this.personRepository.remove(person);
  }
}
