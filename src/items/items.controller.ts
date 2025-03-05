import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dtos/create-item';
import { UpdateItemDto } from './dtos/update-item';
import { Item } from 'src/interfaces/item.interface';

@Controller('api/todolists/:todoListId/items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  all(@Param('todoListId') todoListId: number): Item[] {
    return this.itemsService.all(Number(todoListId));
  }

  @Get('/:itemId')
  get(
    @Param('todoListId') todoListId: number,
    @Param('itemId') itemId: number,
  ): Item {
    return this.itemsService.get(Number(todoListId), Number(itemId));
  }

  @Post()
  create(
    @Param('todoListId') todoListId: number,
    @Body() dto: CreateItemDto,
  ): Item {
    return this.itemsService.create(Number(todoListId), dto);
  }

  @Put('/:itemId')
  update(
    @Param('todoListId') todoListId: number,
    @Param('itemId') itemId: number,
    @Body() dto: UpdateItemDto,
  ): Item {
    return this.itemsService.update(Number(todoListId), Number(itemId), dto);
  }

  @Delete('/:itemId')
  delete(
    @Param('todoListId') todoListId: number,
    @Param('itemId') itemId: number,
  ): void {
    this.itemsService.delete(Number(todoListId), Number(itemId));
  }

  @Delete()
  async bulkDelete(@Param('todoListId') todoListId: number): Promise<void> {
    // Offload deletion to a background task
    setImmediate(() => {
      this.itemsService.bulkDelete(Number(todoListId));
    });

    return;
  }
}
