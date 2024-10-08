import { Module } from '@nestjs/common';
import { ConceptsAutomaticController } from './concepts-automatic.controller';

@Module({
  controllers: [ConceptsAutomaticController],
})
export class ConceptsAutomaticModule {}
