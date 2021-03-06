import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.scss";
import { TodoList } from "./js/classes/todo-list";
import { printToDOM } from "./js/todo-functions";

export const todoList = new TodoList();

const frases = ["No soy vago, estoy en modo ahorro de energía", 
                "Todo es divertido, siempre y cuando le ocurra a otra persona", 
                "No renuncies a tus sueños... Sigue durmiendo",
                "Al que madruga, nadie le hace el desayuno",
                "Las mejores cosas de la vida te deshacen el pelo"
               ];

frases.forEach( prop => {
    todoList.newTodo( prop );
    printToDOM( todoList.arr.slice(-1)[0] );
});