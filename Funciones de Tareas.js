const fs = require('fs');
const colors = require('colors')
const tareas = require('./tareas.json');


const guardarJSON = (tareas) => {
    fs.writeFileSync('./tareas.json',JSON.stringify(tareas,null,3));
    return null
}
const mostrarTareas = (tareas) => {
 
    tareas.forEach((tarea,index) => {
        console.log((`${index + 1} - ${tarea.descripcion} - estado: ${tarea.estado} - ID: ${tarea.id}`));
    });
}

module.exports = {

    listarTareas : () => {
        mostrarTareas(tareas)
        return null
    },

    agregarTarea : (tarea) => {

        tareas.push(tarea);
        guardarJSON(tareas)

        return console.log('Tarea agregada!')
    },

    actualizarTarea : (id) => {
        let check = tareas.filter(tarea => tarea.id === id);
        
        if (check.length === 0 ){
            return console.log (`${"ERROR: ".red} no es un ${"ID valido".cyan}`)
        }

        let tareasActualizadas = tareas.map(tarea => {
            if (tarea.id === id){
                tarea.estado = 'terminado'
                return tarea
            }
            return tarea
        })
        
        fs.writeFileSync('./tareas.json',JSON.stringify(tareasActualizadas,null,3))
        return console.log('tarea Actualizanda')
    },

    eliminarTarea : (id) => {

        let leerPorID = tareas.filter(tarea => {
            return tarea.id !== id
        })

        guardarJSON(leerPorID)

        return console.log('Tarea eliminada')
    },

    filtrarPorEstado : (estado) => {

        let estadosValidos = ['terminado','en proceso','pendiente'];

        if(!estadosValidos.includes(estado)){
            return console.log(`${"ERROR: ".red} Estado no ${"valido".cyan}. estados que si son validos:  ${estadosValidos}`);
        }

        let leerPorEstado = tareas.filter((tarea) => {
          return tarea.estado === estado
        });

        mostrarTareas(leerPorEstado)
        return null
    },

    buscarTarea : (keyword) => {

        let resultado = tareas.filter(tarea => {
            return tarea.descripcion.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
        })

        mostrarTareas(resultado);
        return null
    }
}