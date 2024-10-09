import { Controller, Get } from '@nestjs/common';
import { ConceptsAutomaticService } from './concepts-automatic.service';

@Controller('concepts-automatic')
export class ConceptsAutomaticController {
  constructor(private conceptsAutomaticService: ConceptsAutomaticService) {}

  @Get()
  home() {
    return this.conceptsAutomaticService.useConceptAutomatic();
  }
}
