import { Controller, Get } from '@nestjs/common';

@Controller('concepts-manual')
export class ConceptsManualController {
  @Get()
  home() {
    return 'Conceitos manual';
  }
}
