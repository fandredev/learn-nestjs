import { Module } from '@nestjs/common';
import { ConceptsManualController } from './concepts-manually.controller';

@Module({
  controllers: [ConceptsManualController],
})
export class ConceptsManualModule {}
