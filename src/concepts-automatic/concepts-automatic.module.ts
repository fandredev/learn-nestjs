import { Module } from '@nestjs/common';
import { ConceptsAutomaticController } from './concepts-automatic.controller';
import { ConceptsAutomaticService } from './concepts-automatic.service';

@Module({
  controllers: [ConceptsAutomaticController],
  providers: [ConceptsAutomaticService],
})
export class ConceptsAutomaticModule {}
