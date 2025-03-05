import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Item } from 'src/interfaces/item.interface';
import { CreateItemDto } from './dtos/create-item';
import { UpdateItemDto } from './dtos/update-item';
import { ItemsService } from './items.service';

@Controller('api/todolists/:todoListId')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get('/items')
  index(@Param() param: { todoListId: number }): Item[] {
    return this.itemsService.all(param.todoListId);
  }

  @Get('/:itemId')
  show(@Param() param: { todoListId: number; itemId: number }): Item {
    return this.itemsService.get(param.todoListId, param.itemId);
  }

  @Post('/item')
  create(
    @Param() param: { todoListId: number },
    @Body() dto: CreateItemDto,
  ): Item {
    return this.itemsService.create(param.todoListId, dto);
  }

  @Put('/:itemId')
  update(
    @Param() param: { todoListId: number; itemId: number },
    @Body() dto: UpdateItemDto,
  ): Item {
    return this.itemsService.update(param.todoListId, param.itemId, dto);
  }

  @Delete('/:itemId')
  delete(@Param() param: { todoListId: number; itemId: number }): void {
    this.itemsService.delete(param.todoListId, param.itemId);
  }

  @Delete('/bulk')
  async bulkDelete(@Param() param: { todoListId: number }) {
    // Offloads the deletion to a background task
    setImmediate(() => {
      this.itemsService.deleteAllItemsInList(param.todoListId);
    });

    return { message: `Bulk delete started for: ${param.todoListId}` };
  }
}
