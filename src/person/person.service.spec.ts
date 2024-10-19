import { PersonService } from './person.service';
import { Person } from './entities/person.entity';
import { HashProtocolService } from 'src/auth/hashing/hashing.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import PersonBuilder, { PersonDirector } from './builder/person.builder';
import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

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
            findOneBy: jest.fn(),
            find: jest.fn(),
            preload: jest.fn(),
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
      const buildPerson = new PersonDirector().buildMe();

      const passwordHash = 'fake hash';

      const newPerson = {
        id: 1,
        name: buildPerson.name,
        email: buildPerson.email,
        password: passwordHash,
      };

      // Simuling hashService.hash and personRepository.create

      jest.spyOn(hashingService, 'hash').mockResolvedValue(passwordHash);
      jest.spyOn(personRepository, 'create').mockReturnValue(newPerson as any);

      const personCreated = await personService.create(buildPerson);

      // expected fake password is called
      expect(hashingService.hash).toHaveBeenCalledWith(buildPerson.password);

      // expect correct data from person repository
      expect(personRepository.create).toHaveBeenCalledWith({
        name: buildPerson.name,
        email: buildPerson.email,
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

  describe('find one person', () => {
    it('should return one person when person is found', async () => {
      const personId = 1;
      const buildPerson = new PersonDirector().buildMe();

      const personFound = {
        ...buildPerson,
        id: personId,
      };

      jest
        .spyOn(personRepository, 'findOneBy')
        .mockResolvedValue(personFound as any);

      const result = await personService.findOne(personId);

      expect(result).toEqual(personFound);
    });

    it('should return one person when person is NOT found', async () => {
      const notFoundPersonId = 1;

      await expect(personService.findOne(notFoundPersonId)).rejects.toThrow(
        new NotFoundException(`Not found person with ID: ${notFoundPersonId}`),
      );
    });
  });

  describe('find all persons', () => {
    it('should return all persons', async () => {
      const personsMock: Person[] = [];

      jest.spyOn(personRepository, 'find').mockResolvedValue(personsMock);

      const result = await personService.findAll();

      expect(result).toEqual(personsMock);
      expect(personRepository.find).toHaveBeenCalledWith({
        order: {
          id: 'desc',
        },
      });
    });
  });

  describe('update an existing person', () => {
    it('should update an existing person if user is authorized', async () => {
      const passwordHash = 'fake hash';

      const personId = 1;
      const buildPerson = new PersonBuilder()
        .setName('Felipe')
        .setEmail('emailxx@gmail.com')
        .setPassword(passwordHash)
        .build();

      const tokenPayload = { sub: personId } as any;
      const updatedPerson = {
        id: personId,
        name: 'Felipe',
        password: passwordHash,
      };

      jest.spyOn(hashingService, 'hash').mockResolvedValue(passwordHash);
      jest
        .spyOn(personRepository, 'preload')
        .mockResolvedValue(updatedPerson as any);
      jest
        .spyOn(personRepository, 'save')
        .mockResolvedValue(updatedPerson as any);

      const result = await personService.update(
        personId,
        buildPerson,
        tokenPayload,
      );

      expect(result).toEqual(updatedPerson);
      // expect(hashingService.hash).toHaveBeenCalledWith(passwordHash);
      expect(personRepository.preload).toHaveBeenCalledWith({
        id: personId,
        name: buildPerson.name,
        password: buildPerson.password,
      });
      expect(personRepository.save).toHaveBeenCalledWith({
        id: personId,
        name: buildPerson.name,
        password: buildPerson.password,
      });
    });

    it('should show an exception when person not founded', async () => {
      const personId = 1;
      const tokenPayload = { sub: personId } as any;
      const updatedPerson = { name: 'Felipe' };

      jest.spyOn(personRepository, 'preload').mockResolvedValue(null);

      await expect(
        personService.update(personId, updatedPerson, tokenPayload),
      ).rejects.toThrow(
        new NotFoundException(`Not found person with ID: ${personId}`),
      );
    });

    it('should show an exception when person not permission to update this user', async () => {
      const personId = 1;
      const tokenPayload = { sub: personId + 1 } as any;

      const updatedPerson = {
        id: personId,
        name: 'Felipe',
        password: 'fake hash',
      };

      jest
        .spyOn(personRepository, 'preload')
        .mockResolvedValue(updatedPerson as any);

      await expect(
        personService.update(personId, updatedPerson, tokenPayload),
      ).rejects.toThrow(
        new ForbiddenException(`You are not allowed to update this user`),
      );
    });
  });
});
