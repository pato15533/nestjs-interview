# Notes about modifications made after the interview

- The ```todoListId``` was being stored as a string inside the Item. This was causing the filter ```x.todoListId === Number(todoListId)``` to fail.
Changing [this line](https://github.com/pato15533/nestjs-interview/blob/36ef067310e406e201cd38346f185a637b5ee100/src/items/items.service.ts#L28) fixed the problem.

- 
