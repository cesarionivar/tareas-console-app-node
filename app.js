require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArcchivo');
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

const main = async () => {
  let opt = '';
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if (tareasDB) {
    // Establecer las tareas
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case '1': // crear tarea
        const desc = await leerInput('Descripcion:');
        tareas.crearTarea(desc);
        break;

      case '2': // listar tareas
        tareas.listadoCompleto();
        break;

      case '3': // listar completadas
        tareas.listarPendienteCompletadas(true);
        break;

      case '4': // listar pendientes
        tareas.listarPendienteCompletadas(false);
        break;

      case '6': // Borrar
        const id = await listadoTareasBorrar(tareas.listadoArr);
        console.log({ id });
        break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt !== '0');
};

main();
