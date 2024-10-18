import { PersonService } from './person.service';
import { Person } from './entities/person.entity';
import { HashProtocolService } from 'src/auth/hashing/hashing.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
          useValue: {},
        },
        {
          provide: HashProtocolService,
          useValue: {},
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
});
