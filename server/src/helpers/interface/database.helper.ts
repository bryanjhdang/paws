import { Project } from "../../models/Project";
import { TimeEntry } from "../../models/TimeEntry";
import { Todo } from "../../models/Todo";
import { User } from "../../models/User";

export interface DatabaseHelper {
    updateUser(user: User) : void;

    getUser(userId: string): Promise<User>;

    addUser(user: User) : Promise<string>;

    deleteUser(user: User) : void;


    createTimeEntry(userId : string, timeEntry : TimeEntry) : Promise<TimeEntry>;

    // updateTimeEntry(timeEntry : TimeEntry) : void;

    // getTimeEntry(timeEntryId: string) : Promise<TimeEntry>;

    getTimeEntries(userId: string) : Promise<TimeEntry[]>;

    // deleteTimeEnty(timeEntryId: string) : void;


    createProject(userId : string, project : Project) : Promise<string>;

    // updateProject(project : Project) : void;

    getProjects(userId: string) : Promise<Project[]>;

    deleteProject(projectId: string) : void;

    createTodo(userId: string, todo: Todo) : Promise<Todo>;

    getTodos(userId: string) : Promise<Todo[]>;

    deleteTodo(todoId: string) : void;

    editTodo(userId : string, todo: Todo) : Promise<Todo>;
}