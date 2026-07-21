/* =====================================================================
   NEGOCIO.JS
   -----------------------------------------------------------------
   ÚNICO archivo que hay que editar para adaptar esta plantilla a un
   negocio nuevo. No toca diseño ni estructura: solo datos.

   Pasos para reutilizar con otro cliente:
   1) Cambiar los datos generales (nombre, whatsapp, redes, dirección).
   2) Reemplazar las imágenes por las del cliente (podés dejar las URLs
      de ejemplo mientras tanto, son solo para maquetar).
   3) Cargar sus productos, categorías, promo del día y opiniones.
   4) Listo — el resto de la página se arma solo.

   IMPORTANTE — número de WhatsApp:
   Formato internacional SIN "+", SIN espacios y SIN guiones.
   Ejemplo Argentina (CABA, línea 11-2345-6789): "5491123456789"
===================================================================== */

const negocio = {

  // ---------- DATOS GENERALES ----------
  nombre: "Don Mateo",
  subtitulo: "Rotisería & Pizzería",
  frase: "El sabor de siempre, ahora más cerca.",
  logo: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?q=80&w=200&auto=format&fit=crop",

  whatsapp: "5491123456789",
  instagram: "https://instagram.com/donmateo",
  facebook: "https://facebook.com/donmateo",

  direccion: "Av. Rivadavia 4521, Caballito, CABA",
  mapaEmbed: "https://www.google.com/maps?q=Av.+Rivadavia+4521,+CABA&output=embed",

  heroImagen: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1600&auto=format&fit=crop",
  heroBadge: "⭐ 4.9 · +200 pedidos por WhatsApp",

  // ---------- HORARIOS ----------
  // "hoy: true" resalta el día actual (se puede calcular en main.js si se prefiere)
  horarios: [
    { dia: "Lunes",     hora: "19:00 a 23:30" },
    { dia: "Martes",    hora: "19:00 a 23:30" },
    { dia: "Miércoles", hora: "19:00 a 23:30" },
    { dia: "Jueves",    hora: "19:00 a 23:30" },
    { dia: "Viernes",   hora: "19:00 a 00:30" },
    { dia: "Sábado",    hora: "12:00 a 00:30" },
    { dia: "Domingo",   hora: "12:00 a 23:00" },
  ],

  // ---------- PRODUCTOS DESTACADOS (sección 2) ----------
  destacados: [
    {
      nombre: "Milanesa Napolitana",
      descripcion: "Con jamón, muzzarella y salsa casera, acompañada de papas fritas.",
      precio: 8900,
      imagen: "https://images.unsplash.com/photo-1599921841143-819065a55cc6?q=80&w=800&auto=format&fit=crop",
      mensaje: "Hola, quiero pedir una Milanesa Napolitana."
    },
    {
      nombre: "Pizza Muzzarella",
      descripcion: "Masa madre, muzzarella abundante y aceitunas.",
      precio: 7200,
      imagen: "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?q=80&w=800&auto=format&fit=crop",
      mensaje: "Hola, quiero pedir una Pizza Muzzarella."
    },
    {
      nombre: "Empanadas de Carne (x6)",
      descripcion: "Cortadas a cuchillo, receta de la casa, al horno.",
      precio: 6600,
      imagen: "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?q=80&w=800&auto=format&fit=crop",
      mensaje: "Hola, quiero pedir una docena de Empanadas de Carne."
    },
    {
      nombre: "Hamburguesa Doble Cheddar",
      descripcion: "Doble medallón, doble cheddar, panceta y papas.",
      precio: 9500,
      imagen: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop",
      mensaje: "Hola, quiero pedir una Hamburguesa Doble Cheddar."
    },
  ],

  // ---------- CATEGORÍAS / MENÚ COMPLETO (sección 3) ----------
  // id debe ser único y sin espacios (se usa como ancla interna)
  categorias: [
    {
      id: "pizzas",
      nombre: "Pizzas",
      items: [
        { nombre: "Muzzarella", descripcion: "Clásica, masa madre", precio: 7200, imagen: "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?q=80&w=200&auto=format&fit=crop" },
        { nombre: "Napolitana", descripcion: "Muzzarella, tomate y ajo", precio: 7900, imagen: "https://images.unsplash.com/photo-1548369937-47519962c11a?q=80&w=200&auto=format&fit=crop" },
        { nombre: "Fugazzeta", descripcion: "Doble cebolla y muzzarella", precio: 8100, imagen: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=200&auto=format&fit=crop" },
      ]
    },
    {
      id: "empanadas",
      nombre: "Empanadas",
      items: [
        { nombre: "Carne (unidad)", descripcion: "Cortada a cuchillo", precio: 1100, imagen: "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?q=80&w=200&auto=format&fit=crop" },
        { nombre: "Jamón y queso (unidad)", descripcion: "Receta de la casa", precio: 1100, imagen: "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?q=80&w=200&auto=format&fit=crop" },
        { nombre: "Humita (unidad)", descripcion: "Choclo cremoso", precio: 1150, imagen: "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?q=80&w=200&auto=format&fit=crop" },
      ]
    },
    {
      id: "milanesas",
      nombre: "Milanesas",
      items: [
        { nombre: "Milanesa simple", descripcion: "Con guarnición a elección", precio: 6800, imagen: "https://images.unsplash.com/photo-1599921841143-819065a55cc6?q=80&w=200&auto=format&fit=crop" },
        { nombre: "Milanesa Napolitana", descripcion: "Jamón, muzzarella y salsa", precio: 8900, imagen: "https://images.unsplash.com/photo-1599921841143-819065a55cc6?q=80&w=200&auto=format&fit=crop" },
      ]
    },
    {
      id: "hamburguesas",
      nombre: "Hamburguesas",
      items: [
        { nombre: "Clásica", descripcion: "Cheddar, lechuga y tomate", precio: 7500, imagen: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=200&auto=format&fit=crop" },
        { nombre: "Doble Cheddar", descripcion: "Doble medallón y panceta", precio: 9500, imagen: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=200&auto=format&fit=crop" },
      ]
    },
    {
      id: "pastas",
      nombre: "Pastas",
      items: [
        { nombre: "Sorrentinos de jamón y queso", descripcion: "Con salsa a elección", precio: 7800, imagen: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?q=80&w=200&auto=format&fit=crop" },
        { nombre: "Ñoquis caseros", descripcion: "Con salsa fileto", precio: 6900, imagen: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?q=80&w=200&auto=format&fit=crop" },
      ]
    },
    {
      id: "bebidas",
      nombre: "Bebidas",
      items: [
        { nombre: "Gaseosa línea Coca-Cola 500ml", descripcion: "", precio: 1900, imagen: "https://images.unsplash.com/photo-1554866585-cd94860890b7?q=80&w=200&auto=format&fit=crop" },
        { nombre: "Agua mineral 500ml", descripcion: "Con o sin gas", precio: 1300, imagen: "https://images.unsplash.com/photo-1554866585-cd94860890b7?q=80&w=200&auto=format&fit=crop" },
      ]
    },
  ],

  // ---------- PROMOCIÓN DEL DÍA (sección 4) ----------
  promoDelDia: {
    nombre: "2 Pizzas Muzzarella + Bebida 1.5L",
    descripcion: "Solo por hoy: combo para compartir en casa. Válido hasta las 23:30.",
    imagen: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=1200&auto=format&fit=crop",
    precioAntes: 17800,
    precioAhora: 13900,
    mensaje: "Hola, quiero pedir la Promo del día: 2 Pizzas Muzzarella + Bebida 1.5L."
  },

  // ---------- ¿POR QUÉ ELEGIRNOS? (sección 5) ----------
  beneficios: [
    { icono: "casa", titulo: "Comida casera", texto: "Recetas familiares, hechas como en casa, todos los días." },
    { icono: "hoja", titulo: "Ingredientes frescos", texto: "Compramos todos los días para garantizar frescura." },
    { icono: "rayo", titulo: "Entrega rápida", texto: "Tu pedido en la puerta de tu casa en tiempo récord." },
    { icono: "chat", titulo: "Pedidos fáciles", texto: "Todo por WhatsApp, sin apps ni registros complicados." },
  ],

  // ---------- OPINIONES (sección 6) ----------
  opiniones: [
    { nombre: "Marina G.", texto: "Pedimos siempre para toda la familia, la milanesa napolitana es un golazo. Llega rápido y calentita." },
    { nombre: "Facundo R.", texto: "La pizza fugazzeta es igual a la de mi barrio de toda la vida. Excelente atención por WhatsApp." },
    { nombre: "Julieta P.", texto: "Pedir es súper fácil, en dos minutos ya tenía todo confirmado. Recomendable 100%." },
  ],
};
