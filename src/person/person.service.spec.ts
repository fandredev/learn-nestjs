import { PersonService } from './person.service';
import { Person } from './entities/person.entity';
import { HashProtocolService } from 'src/auth/hashing/hashing.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import PersonBuilder from './builder/person.builder';
import { ConflictException } from '@nestjs/common';

describe(`${PersonService.name}`, () => {
  let personService: PersonService;
  let personRepository: Repository<Person>;
  let hashingService: HashProtocolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonService,
        {
          provide: getRepositoryToken(Person),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: HashProtocolService,
          useValue: {
            hash: jest.fn(), // Mocka a função hash
          },
        },
      ],
    }).compile();

    personService = module.get<PersonService>(PersonService);
    personRepository = module.get<Repository<Person>>(
      getRepositoryToken(Person),
    );
    hashingService = module.get<HashProtocolService>(HashProtocolService);
  });

  it('should be defined', () => {
    expect(personService).toBeDefined();
    expect(personRepository).toBeDefined();
    expect(hashingService).toBeDefined();
  });

  describe('create person', () => {
    it('should create a new person with success', async () => {
      // CreatePersonDTO
      const createPersonDTO = new PersonBuilder().build();
      const passwordHash = 'fake hash';

      const newPerson = {
        id: 1,
        name: createPersonDTO.name,
        email: createPersonDTO.email,
        password: passwordHash,
      };

      // Simuling hashService.hash and personRepository.create

      jest.spyOn(hashingService, 'hash').mockResolvedValue(passwordHash);
      jest.spyOn(personRepository, 'create').mockReturnValue(newPerson as any);

      const personCreated = await personService.create(createPersonDTO);

      // expected fake password is called
      expect(hashingService.hash).toHaveBeenCalledWith(
        createPersonDTO.password,
      );

      // expect correct data from person repository
      expect(personRepository.create).toHaveBeenCalledWith({
        name: createPersonDTO.name,
        email: createPersonDTO.email,
        password: passwordHash,
      });

      // save is called with a person created
      expect(personRepository.save).toHaveBeenCalledWith(newPerson);
      expect(personCreated).toEqual(newPerson);
    });

    it('should failure error to create a new person', async () => {
      jest.spyOn(personRepository, 'save').mockRejectedValue({
        code: '23505',
      });

      await expect(personService.create({} as any)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should failure error to create a new person with random error', async () => {
      const expectedRandomError = 'random error';

      jest
        .spyOn(personRepository, 'save')
        .mockRejectedValue(new Error(expectedRandomError));

      await expect(personService.create({} as any)).rejects.toThrow(
        new Error(expectedRandomError),
      );
    });
  });
});
