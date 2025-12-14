import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SweetsService } from './sweets.service';
import { SweetsController } from './sweets.controller';
import { Sweet, SweetSchema } from './schemas/sweet.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sweet.name, schema: SweetSchema }]),
  ],
  controllers: [SweetsController],
  providers: [SweetsService],
})
export class SweetsModule {}

