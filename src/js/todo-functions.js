import { todoList } from "../index";

// Botones
const btn_add = document.querySelector("#btn-add");
const btn_clean = document.querySelector("#clean-all-btn");
const check_all_btn = document.querySelector("#check-all-btn");
const uncheck_all_btn = document.querySelector("#uncheck-all-btn");
const rmv_check_btn = document.querySelector("#rmv-check-btn");
const show_items_btn = document.querySelector("#show-items-btn");
const list_mode_btn = document.querySelector("#list-mode-btn");
const file_mode_btn = document.querySelector("#file-mode-btn");

// Contenedor de la lista
const list_content = document.querySelector(".list-content");

// Datos adicionales
const list_length = document.querySelector("#list-length");
const check_length = document.querySelectorAll(".check-length");




// Insertar longitud de la lista en DOM
function updateLength(){
    list_length.innerHTML = todoList.arr.length;

    const todos = list_content.children;
    let len = 0;
    for (let i=0; i<todos.length; i++) {
        if ( todos[i].classList.contains("check") )
            len++;
    }
    
    len = len == 0 ? "" : len;

    for (const elem of check_length)
        elem.innerHTML = len;
}

// Insetar item en el DOM
export function printToDOM( todo ) {
    const li = document.createElement("li");
    li.innerHTML = todo.description;
    li.setAttribute("data-id", todo.id);
    if ( todo.check )
        li.classList.add("check");

    list_content.prepend( li );

    updateLength();
}

// Insetar items a todoList[]
function newTodoFromInput() {
    const input = document.querySelector("#text-input");
    if ( input.value ){
        todoList.newTodo( input.value );
        printToDOM( todoList.arr.slice(-1)[0] ); // Last element
        input.value = "";
    }
}

// Efecto delay Asíncrono
function delay( items, ms, reverse, action ) {

    function timer( ms ) { 
        return new Promise( res => setTimeout(res, ms) ); 
    }

    async function resolve( item ) {
        await timer( ms );
        action( item );
        updateLength();
      }
      
    async function load( items, reverse ) {
        if ( reverse )
            for ( let i=items.length-1 ; i>-1; i-- ) await resolve( items[i] );
        else
            for ( let i=0 ; i < items.length; i++ ) await resolve( items[i] );
    }
          
    load( items, reverse );
}




/* Eventos
   ================================================ */

// Insetar items a la lista con click y enter
btn_add.addEventListener("click", e => {
    newTodoFromInput();
});
document.addEventListener("keypress", e => {
    if ( e.key == "Enter" ){
        newTodoFromInput();
    }
});

// Marchar completado items tras click
list_content.addEventListener("click", e => {
    if ( e.target.tagName == "LI" ){
        const todo = todoList.getTodo( e.target.getAttribute("data-id") );
        todoList.toggleTodo( todo );
        e.target.classList.toggle("check");
        updateLength();
    }
});

// Eliminar items individuales tras click en X
document.addEventListener("click", e => {
    if ( e.target.className == "btn-close" ){
        todoList.delTodo( e.target.parentNode.getAttribute("data-id") );
        e.target.parentNode.remove();
        updateLength();
    }
});

// Insertar X en los items de la lista con mouseover
list_content.addEventListener("mouseover", e => {
    if ( e.target.tagName == "LI" ){

        // Clean cross of all elements
        for (const item of list_content.children){
            if ( item.lastChild.tagName == "BUTTON" )
                item.lastChild.remove();
        }

        // Create button and append on li
        const btn = document.createElement("button");
        btn.className = "btn-close";
        e.target.append( btn );
    }
    else {
        // Delete cross if cursor out of box
        try {
            document.querySelector(".btn-close").remove();
        }
        catch( err ){}
    }
});

// Completar toda la lista
check_all_btn.addEventListener("click", e => {

    const items = list_content.children;

    delay( items, 280, false, item => {
        const todo = todoList.getTodo( item.getAttribute("data-id") );
        todoList.checkTodo( todo );
        item.classList.add("check");
    });
});

// Quitar completados
uncheck_all_btn.addEventListener("click", e => {
    const items = list_content.children;

    delay( items, 280, true, item => {
        const todo = todoList.getTodo( item.getAttribute("data-id") );
        todoList.unchekTodo( todo );
        item.classList.remove("check");
    });
});

// Borrar completados
rmv_check_btn.addEventListener("click", e => {
    const items = list_content.children;

    delay( items, 280, true, item => {
        const todo = todoList.getTodo( item.getAttribute("data-id") );
        if ( todo.check ){
            todoList.delTodo( todo.id );
            item.remove();
        }
    });
});

// Limpiar la lista entera
btn_clean.addEventListener("click", e => {

    const items = list_content.children;

    delay( items, 280, true , item => {
        todoList.delTodo( item.getAttribute("data-id") );
        item.remove();
    });
});

// Ocultar elementos seleccionados | Mostrarlos
show_items_btn.addEventListener("click", e => {

    const eye = show_items_btn.firstChild;
    
    if ( eye.classList.contains("bi-eye") ){
        show_items_btn.innerHTML = '<i class="bi bi-eye-slash"></i>';
        
        for( const elem of list_content.children ) {
            if (elem.classList.contains("check"))
                elem.classList.add("hiden");
        }
    }
        
    else {
        show_items_btn.innerHTML = '<i class="bi bi-eye"></i>';
        
        for( const elem of list_content.children ) {
            if (elem.classList.contains("check"))
                elem.classList.remove("hiden");
        }
    } 
});

// Modo lista | Modo archivos
list_mode_btn.addEventListener("click", e => {
    list_content.classList.remove("file-mode");
    list_content.classList.add("list-mode");

    list_mode_btn.classList.add("active");
    file_mode_btn.classList.remove("active");
});

file_mode_btn.addEventListener("click", e => {
    list_content.classList.add("file-mode");
    list_content.classList.remove("list-mode");

    file_mode_btn.classList.add("active");
    list_mode_btn.classList.remove("active");
});























