import { Test, TestingModule } from '@nestjs/testing';
import { ConceptsAutomaticController } from './concepts-automatic.controller';

xdescribe('ConceptsAutomaticController', () => {
  let controller: ConceptsAutomaticController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConceptsAutomaticController],
    }).compile();

    controller = module.get<ConceptsAutomaticController>(
      ConceptsAutomaticController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
