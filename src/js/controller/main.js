import { inventario, solicitudes, nivelCritico } from "../model/data.js";
import {
    copiarInventario,
    mostrarTitulo,
    procesarSolicitud
  } from "./helpers.js";

const inventarioActual = copiarInventario(inventario);
const resultados = [];

mostrarTitulo("INVENTARIO INICIAL");
console.table(inventarioActual);

mostrarTitulo("SOLICITUDES");
console.table(solicitudes);

mostrarTitulo("PROCESO DE SOLICITUDES");

for (let i = 0; i < solicitudes.length; i = i + 1) {
    const resultado = procesarSolicitud(inventarioActual, solicitudes[i]);
    resultados[resultados.length] = resultado;
  
    console.log("Solicitud " + (i + 1));
    console.table([resultado]);
  
    for (let j = 0; j < resultado.movimientos.length; j = j + 1) {
      console.log("Movimiento " + (j + 1));
      console.table([resultado.movimientos[j]]);
    }
  }