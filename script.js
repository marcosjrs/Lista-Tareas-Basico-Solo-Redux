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


