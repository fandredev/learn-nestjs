import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConceptsManualModule } from 'src/concepts-manually/concepts-manually.module';
import { ConceptsAutomaticModule } from 'src/concepts-automatic/concepts-automatic.module';

@Module({
  imports: [ConceptsManualModule, ConceptsAutomaticModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
