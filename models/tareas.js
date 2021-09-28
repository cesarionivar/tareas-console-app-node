const Tarea = require('./tarea');
const colors = require('colors');

class Tareas {
  constructor() {
    this._listado = {};
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  get listadoArr() {
    const listado = [];

    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

  crearTarea(desc = '') {
    const tarea = new Tarea(desc);

    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    this.recorrerArr(this.listadoArr);
  }

  recorrerArr(tareas) {
    console.log();
    tareas.forEach((tarea, i) => {
      const idx = `${i + 1}`.green;
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? 'Completada'.green : 'Pendiente'.red;

      console.log(`${idx}. ${desc} :: ${estado}`);
    });
  }

  listarPendienteCompletadas(completadas = true) {
    if (completadas) {
      const completadasArr = this.listadoArr.filter(
        (tarea) => tarea.completadoEn !== null
      );

      this.recorrerArr(completadasArr);
    } else {
      const pendientesArr = this.listadoArr.filter(
        (tarea) => tarea.completadoEn === null
      );

      this.recorrerArr(pendientesArr);
    }
  }
}

module.exports = Tareas;
