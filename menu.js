// ============================================================
// Ejercicio 03.1 · La ficha del menú — VERSIÓN DE REFERENCIA
// Los datos son distintos a propósito. Compara la FORMA, no el contenido.
// ============================================================

// ---------- Paso 1 · El producto ----------
const producto = {
  id: "p-07",
  nombre: "Agua de jamaica",
  precio: 15,
  categoria: "bebida",
  disponible: true,

  // ---------- Paso 3 · Métodos ----------
  resumen() {
    return this.nombre + " — $" + this.precio + " (" + this.categoria + ")";
  },
  estaDisponible() {
    return this.disponible;
  }
};

console.log("--- Paso 1 ---");
console.log(producto);

// ---------- Paso 2 · Tres formas de leer ----------
console.log("--- Paso 2 ---");
const campo = "nombre";
console.log(producto.nombre);
console.log(producto["nombre"]);
console.log(producto[campo]);

console.log("--- Paso 3 ---");
console.log(producto.resumen());
console.log(producto.estaDisponible());

// ---------- Paso 4 · El usuario ----------
const usuario = {
  id: "u-03",
  nombre: "Luis Ángel",
  correo: "luis@cbtis.edu.mx",
  rol: "alumno"
};

// ---------- Paso 5 · El pedido anidado ----------
const pedido = {
  folio: "PR-0118",
  cliente: usuario,
  producto: producto,
  cantidad: 3,
  estado: "pendiente"
};

console.log("--- Paso 5 ---");
console.log(pedido.cliente.nombre);
console.log(pedido.producto.precio);
console.log(pedido.cliente.telefono);
// Imprimió "undefined" porque la clave telefono no existe en el objeto usuario.
// Lo importante: NO truena. El programa sigue corriendo con un undefined adentro.

// ---------- Paso 6 · Desestructuración ----------
console.log("--- Paso 6 ---");
const { nombre, precio } = producto;
console.log(nombre, precio);

const { cantidad, nota = "sin nota" } = pedido;
console.log(cantidad, nota);

// ---------- Paso 7 · El total ----------
const total = producto.precio * pedido.cantidad;
pedido.total = total;

console.log("--- Paso 7 ---");
console.log(pedido);

// ---------- Paso 8 · Copiar ----------
console.log("--- Paso 8 ---");
const copiaMala = producto;
copiaMala.precio = 999;
console.log(producto.precio);
// Imprimió 999: copiaMala y producto apuntan AL MISMO objeto.
// La variable no guarda el objeto, guarda dónde está.

producto.precio = 15; // lo dejamos como estaba

const copiaBuena = { ...producto };
copiaBuena.precio = 999;
console.log(producto.precio); // 15 — el original quedó intacto

// ---------- Paso 9 · El contrato ----------
console.log("--- Paso 9 ---");

const respuestaOk = {
  ok: true,
  data: pedido
};

const respuestaError = {
  ok: false,
  error: {
    mensaje: "El producto no está disponible",
    detalles: []
  }
};

console.log(respuestaOk);
console.log(respuestaError);
