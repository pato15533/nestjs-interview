import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';

@Module({
  imports: [],
  controllers: [ItemsController],
  providers: [{ provide: ItemsService, useValue: new ItemsService([]) }],
})
export class ItemsModule {}
