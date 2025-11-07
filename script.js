//1: PASO --> Referencia a HTML
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const clearBtn = document.getElementById("clear-completed");
const countEl = document.getElementById("count");

let tareas = [] //array donde se guiarda las tareas

//escuchar(listener) cuando el usuario envia datos del formulario
form.addEventListener("submit", function(e){
        e.preventDefault(); //evite que la página se recarge
        const texto = input.value.trim();
        if (texto === ''){
            alert('Por favor escribe una tarea');
            return;
        }
        //crear un ojeto tipo tarea
        const nuevaTarea = {
            texto: texto,
            completada: false,
        };
        //agregamos el objeto al array
        tareas.push(nuevaTarea);
        //limpiar el input y volver a enfocarlo
        input.value = "";
        input.focus();
        //actualizamos la lista
        //funcion que aun no hacemos jejejejeje
        mostrarTareas();
});

//funcion para mostrar las tareas en la app 100% real no fake
function mostrarTareas(){
    list.innerHTML = "";
    tareas.forEach((tarea, index) => {
        const li = document.createElement("li");
        li.className = "todo-item";
        //agregar un check en la parte isquierda de la tarea
        const divIsq = document.createElement("div");
        divIsq.className = "todo-left";
        const check= document.createElement("input");
        check.type = "checkbox";
        check.checked = tarea.completada;
        const texto = document.createElement("span");
        texto.textContent = tarea.texto;
        texto.className = "todo-title";
        if (tarea.completada){
            texto.classList.add("Completed");
        }

        //Si se marcara el checkbox --> cambiaria el estado
        check.addEventListener("change", ()=>{
            tarea.completada = check.checked;
            mostrarTareas();
        });

        divIsq.appendChild(check);
        divIsq.appendChild(texto);

        //Parte derecha --> Eliminar tareas (boton)
        const divDer = document.createElement("div");
        divDer.className = "todo-actions";

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "🗑️";
        btnEliminar.addEventListener("click", ()=>{
            tareas.splice(index,1); //Revisar en caso de error
            mostrarTareas();
        });

        divDer.appendChild(btnEliminar);

        //Unir divs
        li.appendChild(divIsq);
        li.appendChild(divDer);

        list.appendChild(li);
    });

    //Acutualizar el famoso contador
    actualizarContador();
}

//Darle función a nuestro boton de tareas completadas
clearBtn.addEventListener("click", ()=>{
    tareas = tareas.filter((t) => !t.completada);
    mostrarTareas();
})

//Mostrar tareas pendientes (actualizar contador)
function actualizarContador(){
    const pendientes = tareas.filter((t) => !t.completada).length;
    countEl.textContent = pendientes + (pendientes == 1 ? "tarea pendiente" : "tareas pendientes");

}