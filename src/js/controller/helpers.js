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

export function calcularDisponible(inventario, producto) {
  let total = 0;

  for (let i = 0; i < inventario.length; i = i + 1) {
    if (inventario[i].producto === producto && inventario[i].estado === "disponible") {
      total = total + inventario[i].cantidad;
    }
  }

  return total;
}

export function agregarMovimiento(resultado, hospital, producto, cantidad, prioridad) {
  resultado.movimientos[resultado.movimientos.length] = {
    hospital: hospital,
    producto: producto,
    cantidad: cantidad,
    prioridad: prioridad,
    estado: "en tránsito"
  };
}

export function procesarSolicitud(inventario, solicitud) {
  const disponibleAntes = calcularDisponible(inventario, solicitud.producto);

  const resultado = {
    hospital: solicitud.hospital,
    producto: solicitud.producto,
    solicitado: solicitud.cantidadRequerida,
    disponibleAntes: disponibleAntes,
    asignado: 0,
    faltante: solicitud.cantidadRequerida,
    estado: "no satisfecha",
    movimientos: []
  };

  if (disponibleAntes < solicitud.cantidadRequerida) {
    return resultado;
  }

  let faltante = solicitud.cantidadRequerida;

  for (let i = 0; i < inventario.length; i = i + 1) {
    if (
      inventario[i].producto === solicitud.producto &&
      inventario[i].estado === "disponible" &&
      faltante > 0
    ) {
      if (inventario[i].cantidad <= faltante) {
        resultado.asignado = resultado.asignado + inventario[i].cantidad;
        faltante = faltante - inventario[i].cantidad;

        agregarMovimiento(
          resultado,
          solicitud.hospital,
          inventario[i].producto,
          inventario[i].cantidad,
          inventario[i].prioridad
        );

        inventario[i].estado = "en tránsito";
      } else {
        const cantidadEnviada = faltante;

        inventario[i].cantidad = inventario[i].cantidad - cantidadEnviada;
        resultado.asignado = resultado.asignado + cantidadEnviada;
        faltante = 0;

        agregarMovimiento(
          resultado,
          solicitud.hospital,
          inventario[i].producto,
          cantidadEnviada,
          inventario[i].prioridad
        );

        inventario[inventario.length] = {
          producto: solicitud.producto,
          cantidad: cantidadEnviada,
          prioridad: inventario[i].prioridad,
          estado: "en tránsito"
        };
      }
    }
  }

  resultado.faltante = faltante;

  if (faltante === 0) {
    resultado.estado = "satisfecha";
  }

  return resultado;
}
