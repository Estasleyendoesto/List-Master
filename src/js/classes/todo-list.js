import { Todo } from "./todo";

export class TodoList {

    constructor() {
        this.arr = [];
    }

    newTodo( description ) {
        this.arr.push( new Todo( description ) );
    }

    delTodo( id ) {
        this.arr = this.arr.filter( todo => todo.id != id );
    }

    getTodo( id ) {
        return this.arr.find( todo => todo.id == id );
    }

    toggleTodo( todo ) {
        todo.check = todo.check ? false : true;
    }

    checkTodo( todo ) {
        todo.check = true;
    }

    unchekTodo( todo ) {
        todo.check = false;
    }
}
