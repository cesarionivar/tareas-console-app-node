const Tarea = require('./tarea');

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
}

module.exports = Tareas;
