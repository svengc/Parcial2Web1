export function copiarInventario(lista) {
  const copia = [];

  for (let i = 0; i < lista.length; i = i + 1) {
    copia[i] = {
      producto: lista[i].producto,
      cantidad: lista[i].cantidad,
      prioridad: lista[i].prioridad,
      estado: lista[i].estado
    };
  }

  return copia;
}

export function mostrarTitulo(texto) {
  console.log(" ");
  console.log("==========================================");
  console.log(texto);
  console.log("==========================================");
}

