import { Injectable } from '@nestjs/common';

@Injectable()
export class ConceptsManuallyService {
  useHomeConcept() {
    return 'Home do conceitos manual solucionada';
  }
}
