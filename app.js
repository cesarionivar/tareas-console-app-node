require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArcchivo');
const { inquirerMenu, pausa, leerInput } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

const main = async () => {
  console.log('Hola Mundo');

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
      case '1':
        // crear opcion
        const desc = await leerInput('Descripcion:');
        tareas.crearTarea(desc);
        break;

      case '2':
        console.log(tareas.listadoArr);
        break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt !== '0');
};

main();
