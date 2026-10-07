// ============================================================
// Ejercicio 04.1 · El menú vivo — VERSIÓN DE REFERENCIA
// ============================================================

// ---------- Paso 1 · El arreglo ----------
const productos = [
  { id: crypto.randomUUID(), nombre: "Molletes",        precio: 30, categoria: "comida", disponible: true  },
  { id: crypto.randomUUID(), nombre: "Jugo de naranja", precio: 18, categoria: "bebida", disponible: true  },
  { id: crypto.randomUUID(), nombre: "Gelatina",        precio: 12, categoria: "postre", disponible: false }
];

// ---------- Pasos 2 y 3 · Leer ----------
const listar = () => productos;

const listarDisponibles = () => productos.filter((p) => p.disponible);

// ---------- Paso 4 · Buscar uno ----------
const obtenerPorId = (id) => productos.find((p) => p.id === id);

// obtenerPorId("no-existe") devuelve undefined: find no encontró nada.
// console.log(obtenerPorId("no-existe").nombre);
//   → TypeError: Cannot read properties of undefined (reading 'nombre')
//   El programa se CAE. Por eso, después de cada find, hay que revisar
//   si encontró algo antes de usar el resultado. En la semana 5 esto
//   se convierte en un error 404 bien manejado.

// ---------- Paso 5 · Crear ----------
function crear(datos) {
  const nuevo = { id: crypto.randomUUID(), disponible: true, ...datos };
  productos.push(nuevo);
  return nuevo;
}

// ---------- Paso 6 · Actualizar ----------
function actualizar(id, cambios) {
  const i = productos.findIndex((p) => p.id === id);
  if (i === -1) return null;
  productos[i] = { ...productos[i], ...cambios };
  return productos[i];
}

// ---------- Paso 7 · Borrado lógico ----------
function eliminar(id) {
  const producto = obtenerPorId(id);
  if (!producto) return null;
  producto.disponible = false;
  return producto;
}
// Razón: los pedidos viejos guardan el id de su producto. Si lo borro de
// verdad, el historial queda apuntando a algo que ya no existe y el corte
// del día se rompe. Marcarlo como no disponible lo saca del menú sin
// destruir la información, y además se puede revertir.

// ---------- Paso 8 · Total con reduce ----------
function calcularTotal(pedido) {
  return pedido.items.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
}

// ---------- Paso 9 · ¿Ya existe? ----------
const existeNombre = (nombre) =>
  productos.some((p) => p.nombre.toLowerCase() === nombre.toLowerCase());

// ---------- Reto opcional ----------
const buscarPorTexto = (texto) =>
  productos.filter((p) => p.nombre.toLowerCase().includes(texto.toLowerCase()));

// ============================================================
// Paso 10 · Pruebas
// ============================================================

console.log("--- listar ---");
console.log(listar());

console.log("--- listarDisponibles ---");
console.log(listarDisponibles().map((p) => p.nombre));

console.log("--- crear ---");
const creado = crear({ nombre: "Sincronizada", precio: 32, categoria: "comida" });
console.log(creado);

console.log("--- obtenerPorId ---");
console.log(obtenerPorId(creado.id).nombre);
console.log(obtenerPorId("no-existe"));

console.log("--- actualizar ---");
console.log(actualizar(creado.id, { precio: 35 }));
console.log(actualizar("no-existe", { precio: 1 }));

console.log("--- eliminar (lógico) ---");
console.log(eliminar(creado.id).disponible);
console.log("disponibles ahora:", listarDisponibles().length);

console.log("--- calcularTotal ---");
const pedido = {
  folio: "PR-0341",
  items: [
    { nombre: "Molletes", precio: 30, cantidad: 2 },
    { nombre: "Jugo",     precio: 18, cantidad: 1 }
  ]
};
console.log(calcularTotal(pedido));

console.log("--- existeNombre ---");
console.log(existeNombre("gelatina"), existeNombre("pizza"));

console.log("--- buscarPorTexto ---");
console.log(buscarPorTexto("ju").map((p) => p.nombre));
