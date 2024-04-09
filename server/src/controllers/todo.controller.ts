import express, { Request, Response, Router } from "express";
import { todo } from "node:test";
import { todoService } from "../services/todo.service";
import { Todo } from "../models/Todo";
import { OK, StatusCodes } from "http-status-codes";


const todoController: Router = express.Router();

interface GetTodoResponse {
    todos: Todo[]
}
todoController.get('/', (req: Request, res: Response) => {
    todoService.getTodos(res.locals.user)
        .then(todos => {
            let response: GetTodoResponse = {
                todos: todos
            }

            res.status(StatusCodes.OK)
                .json(response);
        })
        .catch((err: Error) => {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ message: `Could not get todos for user ${res.locals.user.id}`, error: err });
        })
})

interface CreateTodoRequest {
    task: string,
    dateCreated: number
}
interface CreateTodoResponse extends Todo { }
todoController.post('/', (req: Request, res: Response) => {
    let body: CreateTodoRequest = req.body;

    todoService.createTodo(res.locals.user, body.task, body.dateCreated)
        .then(todo => {
            let response: CreateTodoResponse = todo;

            res.status(StatusCodes.CREATED)
                .json(response);
        })
        .catch((err: Error) => {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ message: `Could not create todo for user ${res.locals.user.id}`, error: err });
        })
})

interface EditTodoRequest extends Todo { }
interface EditTodoResponse extends Todo { }
todoController.patch('/', (req: Request, res: Response) => {
    let body: EditTodoRequest = req.body;

    todoService.updateTodo(res.locals.user, body)
        .then(todo => {
            let response: EditTodoResponse = todo;

            res.status(StatusCodes.OK)
                .json(response);
        })
        .catch((err: Error) => {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ message: `Could not update the todo for user ${res.locals.user.id}`, error: err });
        })
})

todoController.delete('/:id', (req: Request, res: Response) => {
    try {
        todoService.deleteTodo(res.locals.user, req.params.id);
        res.status(StatusCodes.NO_CONTENT)
            .send();
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: `Could not delete the todo with id ${req.params.id}`, error: err });
    }
})

export { todoController }