/************************
 * STATES
 ************************/
var estado = {
    lista:[]
};

/************************
 * Reducts
 ************************/
var reductor = function(estado, accion){
    switch (accion.type) {
        case "ADD":
            var nuevoEstado = Object.assign({},estado);
            nuevoEstado.lista.push({
                id:accion.id,
                tarea:accion.tarea
            });
            return nuevoEstado;
    
        case "DEL":
            var nuevoEstado = Object.assign({},estado);
            var nuevaLista = nuevoEstado.lista.filter(function(item){ 
                return (item.id != accion.id);
            });
            nuevoEstado.lista = nuevaLista;
            return nuevoEstado;
    }
    return estado;
}

/************************
 * Store
 ************************/
var store = Redux.createStore(reductor,estado);


/************************
 * Actions
 ************************/

//En la base, sin datos sería var accionADD = { type:"ADD" }; 
//Pero como se necesita añadir un objeto... se necesita una funcion para añadir ese objeto
var accionADD = function(tarea, id){
    return {
        type:"ADD",
        tarea:tarea,
        id:id
    }; // Con nuevo Ecmascript, sería igual que poner:  var accion = {type:"ADD", tarea, id}
};
var accionDEL = function(id){
    return {
        type:"DEL",
        id:id
    }; // Con nuevo Ecmascript, sería igual que poner:  var accion = {type:"ADD", tarea, id}
};


//Funcionamiento:  store.dispatch(accionADD("primera tarea",0));


/************************************************
 * Listeners de la vista y para modificar las vista
 ************************************************/

//Escuchamos el cambio del input para añadir una tarea.
 var cambiaTexto = function(evt){
     if(evt.which == 13){//Si es un enter.
         store.dispatch(accionADD( evt.target.value , (new Date()).getTime() )); // por obtener un id más o menos unico en nuestra aplicación
         evt.target.value = "";
     }
 };

//Escuchamos el cambio del input para añadir una tarea.
 var eliminarTarea = function(id){
     store.dispatch(accionDEL(id));
 };

//Escuchamos cambios en el modelo para mostrar la lista de tareas
 var renderizarLista = function(){
     var ul = document.getElementById("lista");
     var contentUl ="";
     store.getState().lista.map(function(element) {
        if(element){
            var btnDel = " <button id='"+element.id+"' onclick='eliminarTarea(this.id)'>Eliminar</button>";
            contentUl += "<li>"+element.tarea+btnDel+"</li>";
        }
     }); 
     ul.innerHTML = contentUl;
 };

 store.subscribe(renderizarLista);


