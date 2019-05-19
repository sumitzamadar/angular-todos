import { Todo } from './todo';

export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    todos: Todo[];
}
