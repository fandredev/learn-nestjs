import { Module } from '@nestjs/common';
import { ConceptsManualController } from './concepts-manually.controller';
import { ConceptsManuallyService } from './concepts-manually.service';

@Module({
  controllers: [ConceptsManualController],
  providers: [ConceptsManuallyService],
})
export class ConceptsManualModule {}
