import { Injectable } from '@nestjs/common';
import { Item } from 'src/interfaces/item.interface';
import { CreateItemDto } from './dtos/create-item';
import { UpdateItemDto } from './dtos/update-item';

@Injectable()
export class ItemsService {
  private readonly items: Item[];

  constructor(items: Item[] = []) {
    this.items = items;
  }

  all(todoListId: number): Item[] {
    return this.items.filter((x) => x.todoListId === Number(todoListId));
  }

  get(todoListId: number, id: number): Item {
    return this.all(todoListId).find((x) => x.id === Number(id));
  }

  create(todoListId: number, dto: CreateItemDto): Item {
    const item: Item = {
      id: this.nextId(),
      title: dto.title,
      description: dto.description,
      completed: false,
      todoListId: Number(todoListId),
    };

    this.items.push(item);

    return item;
  }

  update(todoListId: number, id: number, dto: UpdateItemDto): Item {
    const item = this.get(todoListId, id);

    // Update the record
    item.title = dto.title;
    item.description = dto.description;
    item.completed = dto.completed;

    return item;
  }

  delete(todoListId: number, id: number): void {
    const index = this.items.findIndex(
      (x) => x.id == Number(id) && x.todoListId === Number(todoListId),
    );

    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  deleteAllItemsInList(todoListId: number): void {
    for (let i = this.items.length - 1; i >= 0; i--) {
      if (this.items[i].todoListId === Number(todoListId)) {
        this.items.splice(i, 1);
      }
    }
  }

  private nextId(): number {
    const last = this.items
      .map((x) => x.id)
      .sort()
      .reverse()[0];

    return last ? last + 1 : 1;
  }
}
