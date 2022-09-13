import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MockRepository} from "./service/mock.repostory";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, MockRepository],
})
export class AppModule {}
