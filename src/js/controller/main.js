import { inventario, solicitudes, nivelCritico } from "../model/data.js";
import {
  copiarInventario,
  mostrarTitulo
} from "./helpers.js";

const inventarioActual = copiarInventario(inventario);
const resultados = [];

mostrarTitulo("INVENTARIO INICIAL");
console.table(inventarioActual);

mostrarTitulo("SOLICITUDES");
console.table(solicitudes);

mostrarTitulo("PROCESO DE SOLICITUDES");

