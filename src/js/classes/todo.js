export class Todo {
    static count = 0;

    constructor( description ) {
        Todo.count++;

        this.id = Todo.count;
        this.description = description;
        this.check = false;
        this.date = new Date().getDate();
    }
}