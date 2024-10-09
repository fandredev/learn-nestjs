import { Test, TestingModule } from '@nestjs/testing';
import { ConceptsAutomaticService } from './concepts-automatic.service';

describe('ConceptsAutomaticService', () => {
  let service: ConceptsAutomaticService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConceptsAutomaticService],
    }).compile();

    service = module.get<ConceptsAutomaticService>(ConceptsAutomaticService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
