import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.scss";


const btn_add = document.querySelector("#btn-add");
const list_mode = document.querySelector("#list-mode");
const file_mode = document.querySelector("#file-mode");
const list_content = document.querySelector(".list-content");
const list_length = document.querySelector("#list-length");

/*
    Eventos
    ================================================
*/

function updateLength(){
    list_length.innerHTML = list_content.children.length;
}


/* Insetar items a la lista
··················································*/
btn_add.addEventListener("click", e => {
    const input = document.querySelector("#text-input");

    if ( input.value ){
        const li = document.createElement("li");
        li.innerHTML = input.value;
        input.value = "";
        list_content.append( li );

        updateLength();
    } 
    else
        alert("No lo dejes vacío, cabrón!");
});


/* Insertar X en los items de la lista con mouseover
··················································*/
function addCrossElem( elem ){
    // Clean cross of all elements
    for (const item of list_content.children){
        if ( item.lastChild.tagName == "BUTTON" )
            item.lastChild.remove();
    }

    // ...
    const btn = document.createElement("button");
    btn.className = "btn-close";
    elem.append( btn );
}

list_content.addEventListener("mouseover", e => {
    if ( e.target.tagName == "LI" ) 
        addCrossElem( e.target );
});


/* Modo lista | Modo archivos
··················································*/
list_mode.addEventListener("click", e => {
    list_content.classList.remove("file-mode");
    list_content.classList.add("list-mode");

    list_mode.classList.add("active");
    file_mode.classList.remove("active");
});

file_mode.addEventListener("click", e => {
    list_content.classList.add("file-mode");
    list_content.classList.remove("list-mode");

    file_mode.classList.add("active");
    list_mode.classList.remove("active");
});


/* Eliminar items individuales tras click en X
··················································*/
document.addEventListener("click", e => {
    if ( e.target.className == "btn-close" )
        e.target.parentNode.remove();

    updateLength();
});

