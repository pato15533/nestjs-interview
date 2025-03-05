import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

describe('ItemsController', () => {
  let itemsService: ItemsService;
  let itemsController: ItemsController;

  beforeEach(async () => {
    itemsService = new ItemsService([
      {
        id: 1,
        title: 'test1',
        description: 'test1 description',
        completed: false,
        todoListId: 1,
      },
      {
        id: 2,
        title: 'test2',
        description: 'test2 description',
        completed: false,
        todoListId: 1,
      },
    ]);

    const app: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [{ provide: ItemsService, useValue: itemsService }],
    }).compile();

    itemsController = app.get<ItemsController>(ItemsController);
  });

  describe('index', () => {
    it('should return the items of a todoList', () => {
      expect(itemsController.all(1)).toEqual([
        {
          id: 1,
          title: 'test1',
          description: 'test1 description',
          completed: false,
          todoListId: 1,
        },
        {
          id: 2,
          title: 'test2',
          description: 'test2 description',
          completed: false,
          todoListId: 1,
        },
      ]);
    });
  });

  describe('show', () => {
    it('should return the item with the given id', () => {
      expect(itemsController.get(1, 1)).toEqual({
        id: 1,
        title: 'test1',
        description: 'test1 description',
        completed: false,
        todoListId: 1,
      });
    });
  });

  describe('update', () => {
    it('should update the item with the given id', () => {
      expect(
        itemsController.update(1, 1, {
          title: 'modified',
          description: 'new description',
          completed: true,
        }),
      ).toEqual({
        id: 1,
        title: 'modified',
        description: 'new description',
        completed: true,
        todoListId: 1,
      });

      expect(itemsService.get(1, 1).title).toEqual('modified');
      expect(itemsService.get(1, 1).description).toEqual('new description');
      expect(itemsService.get(1, 1).completed).toEqual(true);
    });
  });

  describe('create', () => {
    it('should create the item with the given id', () => {
      expect(
        itemsController.create(1, {
          title: 'new item',
          description: 'new description',
        }),
      ).toEqual({
        id: 3,
        title: 'new item',
        description: 'new description',
        completed: false,
        todoListId: 1,
      });

      expect(itemsService.all(1).length).toBe(3);
    });
  });

  describe('delete', () => {
    it('should delete the item with the given id', () => {
      expect(() => itemsController.delete(1, 1)).not.toThrow();

      expect(itemsService.all(1).map((x) => x.id)).toEqual([2]);
    });
  });
});
