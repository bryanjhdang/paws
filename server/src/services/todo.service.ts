import { firestore } from "firebase-admin";
import { DatabaseHelper } from "../helpers/interface/database.helper";
import { Todo } from "../models/Todo";
import { firestoreHelper } from "../helpers/firestore.helper";
import { User } from "../models/User";

export class TodoService {
    constructor(private db: DatabaseHelper) {};

    createTodo(user : User, task : string) : Promise<Todo> {
        let newTodo = new Todo(task)
        return this.db.createTodo(user.id, newTodo);
    }

    getTodos(user: User) : Promise<Todo[]> {
        return this.db.getTodos(user.id);
    }

    updateTodo(user: User, todo : Todo) : Promise<Todo> {
        return this.db.editTodo(user.id, todo);
    }

    deleteTodo(user : User, todoId : string) {
        this.db.deleteTodo(todoId);
    }
}

const todoService = new TodoService(firestoreHelper);

export { todoService };