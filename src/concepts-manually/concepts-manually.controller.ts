import { Controller, Get } from '@nestjs/common';
import { ConceptsManuallyService } from './concepts-manually.service';

@Controller('concepts-manual')
export class ConceptsManualController {
  constructor(
    private readonly conceptsManuallyService: ConceptsManuallyService,
  ) {}
  @Get()
  home() {
    return this.conceptsManuallyService.useHomeConcept();
  }
}
