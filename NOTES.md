# Notes about modifications made after the interview

The ```todoListId``` was being stored as a string inside the Item. This was causing the filter ```x.todoListId === Number(todoListId)``` to fail.
Changing [this line](https://github.com/pato15533/nestjs-interview/blob/36ef067310e406e201cd38346f185a637b5ee100/src/items/items.service.ts#L28) fixed the problem.

## Items controller tests

I added the items.controller.spec.ts file, which includes all the tests for the items controller.

## Bulk delete items problem

To tackle the items bulk delete, I consulted the nestJS documentation as well as ChatGPT. I found the SetImmediate() function, which is useful when you have a long process that you want to make async so that the event loop can still run and service other requests.  

Another method would be using job queue packages such as Bull (which works with redis). This way you can enqueue a job instead of executing the delete operation synchronously. The job is then processed asynchronously by Bull in a separate processor.
The client gets an immediate response and does not need to wait for the deletion to finish.
