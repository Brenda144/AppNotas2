let process = require('process')
let colors = require('colors')



let {listarTareas,agregarTarea,actualizarTarea,eliminarTarea, filtrarPorEstado ,buscarTarea} = require('./Funciones de Tareas');


let accion = process.argv[2];
let datos = process.argv[3];

if (datos === undefined) {

    accion = process.argv[2].toLowerCase()

    switch (accion) {
      case 'crear':
          console.log (`${'ERROR:'.red} Para realizar la accion se necesita una ${"Descripcion".cyan}`);
          break;
      case 'actualizar':
      case 'eliminar':
          console.log (`${'ERROR:'.red} Para realizar la accion se necesita un ${"ID".cyan}`);
          break;
      case 'filtrar':
          console.log (`${'ERROR:'.red} Para realizar la accion se necesita el ${"Estado".cyan} de la tarea`);
          break;
      case 'buscar':
          console.log (`${'ERROR:'.red} no se rellenaron todos los ${"datos".cyan} para realizar esta accion`);
          break;
      case 'listar':
          listarTareas()
          break;
      default:
          console.log (`${"ERROR:".red} Para hacer algo debe poner ${"una ACCION valida".brightRed}`);
          console.log (` `)
          console.log (`Las acciones validas son:`,);
          console.log (`${"#".bgGreen} crear`,);
          console.log (`${"#".bgGreen} actualizar`,);
          console.log (`${"#".bgGreen} eliminar`,);
          console.log (`${"#".bgGreen} filtrar`,);
          console.log (`${"#".bgGreen} buscar`,);
          break;

    }
} else if (accion !== undefined) {

    accion = process.argv[2].toLowerCase()

    switch (accion) {
    
      case 'crear':
          let descripcion = process.argv[3];
          let nuevaTarea = {
            id : new Date().getTime(),
            descripcion,
            estado : 'pendiente'
          }
          agregarTarea(nuevaTarea)
          break;
      case 'actualizar':
          actualizarTarea(+process.argv[3])
          break;
        
      case 'eliminar':
          eliminarTarea(+process.argv[3])
          
          break;
      case 'filtrar':
          filtrarPorEstado(process.argv[3])
          break;
      case 'buscar':
          buscarTarea(process.argv[3])
          break;
      case undefined :
          console.log(`${"ATENCION: ".brightRed}tienes que ${"pasae".cyan} una ${"ACCION".cyan}`);
          break;
      default:
          console.log('Accion no permitida');
          break;
    }  
}
