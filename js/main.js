/* =====================================================================
   MAIN.JS
   -----------------------------------------------------------------
   Motor de la plantilla. Lee el objeto "negocio" (definido en
   negocio.js) y arma toda la página. No hay contenido hardcodeado
   acá: si un cliente nuevo necesita otra estructura de datos, se
   ajusta este archivo una sola vez y sirve para todos los clientes.
===================================================================== */

(function () {
  "use strict";

  // ---------- Utilidades ----------

  /** Formatea un número como precio en pesos argentinos, sin decimales. */
  function formatearPrecio(numero) {
    return "$" + Number(numero).toLocaleString("es-AR");
  }

  /** Arma el link de WhatsApp con el mensaje precargado y codificado. */
  function linkWhatsApp(mensaje) {
    const numero = negocio.whatsapp.replace(/\D/g, "");
    return "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensaje);
  }

  /** Setea src+alt de una imagen de forma segura, con lazy loading opcional. */
  function setImagen(el, src, alt, lazy) {
    if (!el) return;
    el.src = src;
    el.alt = alt || "";
    if (lazy) el.loading = "lazy";
  }

  // Set de íconos SVG usados en "Por qué elegirnos" (sin librerías externas)
  const ICONOS = {
    casa: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>',
    hoja: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 4 13c0-4 3-8 9-9 0 6 4 6 4 10a7 7 0 0 1-6 6z"/></svg>',
    rayo: '<svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></svg>',
    chat: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    estrella: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01z"/></svg>',
  };

  // ---------- Renderizado por sección ----------

  function aplicarSEO() {
    const titulo = negocio.nombre + " | " + negocio.subtitulo;
    document.title = titulo;
    const desc = negocio.frase + " Pedí online por WhatsApp en menos de 1 minuto.";
    document.querySelector('meta[name="description"]').setAttribute("content", desc);
    document.querySelector('meta[property="og:title"]').setAttribute("content", titulo);
    document.querySelector('meta[property="og:description"]').setAttribute("content", desc);
    document.querySelector('meta[property="og:image"]').setAttribute("content", negocio.heroImagen);
    document.querySelector('meta[property="og:site_name"]').setAttribute("content", negocio.nombre);
  }

  function renderHeader() {
    setImagen(document.getElementById("logo-img"), negocio.logo, negocio.nombre);
    document.getElementById("logo-nombre").textContent = negocio.nombre;

    const wspNav = document.getElementById("nav-wsp-btn");
    wspNav.href = linkWhatsApp("Hola, quiero hacer un pedido en " + negocio.nombre + ".");
  }

  function renderHero() {
    setImagen(document.getElementById("hero-img"), negocio.heroImagen, negocio.nombre + " - foto principal");
    setImagen(document.getElementById("hero-logo"), negocio.logo, negocio.nombre);
    document.getElementById("hero-badge").textContent = negocio.heroBadge || "";
    document.getElementById("hero-nombre").textContent = negocio.nombre;
    document.getElementById("hero-frase").textContent = negocio.frase;

    document.getElementById("hero-btn-wsp").href =
      linkWhatsApp("Hola, quiero hacer un pedido en " + negocio.nombre + ".");
  }

  function crearTarjetaProducto(producto) {
    const article = document.createElement("article");
    article.className = "tarjeta-producto";
    article.innerHTML =
      '<div class="tarjeta-producto__img-wrap">' +
        '<img loading="lazy" alt="' + producto.nombre + '">' +
      "</div>" +
      '<div class="tarjeta-producto__cuerpo">' +
        '<h3 class="tarjeta-producto__nombre"></h3>' +
        '<p class="tarjeta-producto__desc"></p>' +
        '<p class="tarjeta-producto__precio"></p>' +
        '<a class="btn btn--tarjeta" target="_blank" rel="noopener">Pedir</a>' +
      "</div>";

    article.querySelector("img").src = producto.imagen;
    article.querySelector(".tarjeta-producto__nombre").textContent = producto.nombre;
    article.querySelector(".tarjeta-producto__desc").textContent = producto.descripcion;
    article.querySelector(".tarjeta-producto__precio").textContent = formatearPrecio(producto.precio);
    article.querySelector(".btn--tarjeta").href = linkWhatsApp(producto.mensaje);

    return article;
  }

  function renderDestacados() {
    const grid = document.getElementById("grid-destacados");
    grid.innerHTML = "";
    negocio.destacados.forEach(function (producto) {
      grid.appendChild(crearTarjetaProducto(producto));
    });
  }

  function crearFilaItemMenu(item, categoriaNombre) {
    const li = document.createElement("li");
    li.className = "item-menu";

    const mensaje = "Hola, quiero pedir: " + item.nombre + " (" + categoriaNombre + ").";

    li.innerHTML =
      '<img class="item-menu__img" loading="lazy">' +
      '<div class="item-menu__info">' +
        '<p class="item-menu__nombre"></p>' +
        '<p class="item-menu__desc"></p>' +
      "</div>" +
      '<span class="item-menu__precio"></span>' +
      '<a class="item-menu__btn" target="_blank" rel="noopener">Pedir</a>';

    li.querySelector(".item-menu__img").src = item.imagen;
    li.querySelector(".item-menu__img").alt = item.nombre;
    li.querySelector(".item-menu__nombre").textContent = item.nombre;
    li.querySelector(".item-menu__desc").textContent = item.descripcion || "";
    li.querySelector(".item-menu__precio").textContent = formatearPrecio(item.precio);
    li.querySelector(".item-menu__btn").href = linkWhatsApp(mensaje);

    return li;
  }

  function renderCategorias() {
    const tabsWrap = document.getElementById("tabs-categorias");
    const panelesWrap = document.getElementById("paneles-categorias");
    tabsWrap.innerHTML = "";
    panelesWrap.innerHTML = "";

    negocio.categorias.forEach(function (categoria, indice) {
      // Tab
      const tab = document.createElement("button");
      tab.className = "tab-categoria" + (indice === 0 ? " activa" : "");
      tab.type = "button";
      tab.textContent = categoria.nombre;
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-selected", indice === 0 ? "true" : "false");
      tab.dataset.categoria = categoria.id;
      tabsWrap.appendChild(tab);

      // Panel
      const panel = document.createElement("div");
      panel.className = "panel-categoria" + (indice === 0 ? " activo" : "");
      panel.id = "panel-" + categoria.id;
      panel.setAttribute("role", "tabpanel");

      const lista = document.createElement("ul");
      lista.className = "lista-items-menu";
      categoria.items.forEach(function (item) {
        lista.appendChild(crearFilaItemMenu(item, categoria.nombre));
      });
      panel.appendChild(lista);
      panelesWrap.appendChild(panel);

      tab.addEventListener("click", function () {
        tabsWrap.querySelectorAll(".tab-categoria").forEach(function (t) {
          t.classList.remove("activa");
          t.setAttribute("aria-selected", "false");
        });
        panelesWrap.querySelectorAll(".panel-categoria").forEach(function (p) {
          p.classList.remove("activo");
        });
        tab.classList.add("activa");
        tab.setAttribute("aria-selected", "true");
        panel.classList.add("activo");
      });
    });
  }

  function renderPromo() {
    const p = negocio.promoDelDia;
    if (!p) return;
    setImagen(document.getElementById("promo-img"), p.imagen, p.nombre, true);
    document.getElementById("promo-nombre").textContent = p.nombre;
    document.getElementById("promo-descripcion").textContent = p.descripcion;
    document.getElementById("promo-precio-antes").textContent = formatearPrecio(p.precioAntes);
    document.getElementById("promo-precio-ahora").textContent = formatearPrecio(p.precioAhora);
    document.getElementById("promo-btn-wsp").href = linkWhatsApp(p.mensaje);
  }

  function renderBeneficios() {
    const grid = document.getElementById("grid-beneficios");
    grid.innerHTML = "";
    negocio.beneficios.forEach(function (beneficio) {
      const div = document.createElement("div");
      div.className = "tarjeta-beneficio";
      div.innerHTML =
        '<div class="tarjeta-beneficio__icono">' + (ICONOS[beneficio.icono] || "") + "</div>" +
        '<h3 class="tarjeta-beneficio__titulo"></h3>' +
        '<p class="tarjeta-beneficio__texto"></p>';
      div.querySelector(".tarjeta-beneficio__titulo").textContent = beneficio.titulo;
      div.querySelector(".tarjeta-beneficio__texto").textContent = beneficio.texto;
      grid.appendChild(div);
    });
  }

  function estrellasHTML() {
    return ICONOS.estrella.repeat(5);
  }

  function renderOpiniones() {
    const grid = document.getElementById("grid-opiniones");
    grid.innerHTML = "";
    negocio.opiniones.forEach(function (op) {
      const inicial = op.nombre.trim().charAt(0).toUpperCase();
      const div = document.createElement("div");
      div.className = "tarjeta-opinion";
      div.innerHTML =
        '<div class="tarjeta-opinion__estrellas">' + estrellasHTML() + "</div>" +
        '<p class="tarjeta-opinion__texto"></p>' +
        '<div class="tarjeta-opinion__autor">' +
          '<div class="tarjeta-opinion__avatar">' + inicial + "</div>" +
          '<span class="tarjeta-opinion__nombre"></span>' +
        "</div>";
      div.querySelector(".tarjeta-opinion__texto").textContent = '"' + op.texto + '"';
      div.querySelector(".tarjeta-opinion__nombre").textContent = op.nombre;
      grid.appendChild(div);
    });
  }

  function renderHorarios() {
    const lista = document.getElementById("lista-horarios");
    lista.innerHTML = "";
    const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const hoy = diasSemana[new Date().getDay()];

    negocio.horarios.forEach(function (h) {
      const li = document.createElement("li");
      li.className = "fila-horario" + (h.dia === hoy ? " hoy" : "");
      li.innerHTML =
        '<span class="fila-horario__dia"></span><span class="fila-horario__hora"></span>';
      li.querySelector(".fila-horario__dia").textContent = h.dia;
      li.querySelector(".fila-horario__hora").textContent = h.hora;
      lista.appendChild(li);
    });

    document.getElementById("horarios-direccion").textContent = negocio.direccion;
    document.getElementById("horarios-btn-wsp").href =
      linkWhatsApp("Hola, quería consultar por " + negocio.nombre + ".");
    document.getElementById("mapa-iframe").src = negocio.mapaEmbed;
  }

  function renderFooter() {
    setImagen(document.getElementById("footer-logo"), negocio.logo, negocio.nombre);
    document.getElementById("footer-nombre").textContent = negocio.nombre;

    const redes = document.getElementById("footer-redes");
    redes.innerHTML = "";

    const items = [
      { url: linkWhatsApp("Hola, quiero hacer un pedido en " + negocio.nombre + "."), label: "WhatsApp",
        icono: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12.004 2C6.486 2 2 6.486 2 12.004c0 1.998.579 3.858 1.579 5.428L2 22l4.706-1.545a9.96 9.96 0 0 0 5.298 1.53h.005c5.518 0 10.004-4.486 10.004-10.004C21.996 6.486 17.52 2 12.004 2z"/></svg>' },
      { url: negocio.instagram, label: "Instagram",
        icono: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>' },
      { url: negocio.facebook, label: "Facebook",
        icono: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M13 22v-9h3l1-4h-4V6.5C13 5.3 13.5 4 15.3 4H17V0.2C16.6.1 15.4 0 14 0 11 0 9 2 9 5.5V9H6v4h3v9h4z"/></svg>' },
    ];

    items.forEach(function (r) {
      if (!r.url) return;
      const a = document.createElement("a");
      a.href = r.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.setAttribute("aria-label", r.label);
      a.innerHTML = r.icono;
      redes.appendChild(a);
    });

    document.getElementById("footer-copy").textContent =
      "© " + new Date().getFullYear() + " " + negocio.nombre + ". Todos los derechos reservados.";
  }

  function renderFlotanteYNav() {
    document.getElementById("wsp-flotante").href =
      linkWhatsApp("Hola, quiero hacer un pedido en " + negocio.nombre + ".");
  }

  // ---------- Interacciones (header sticky + menú móvil) ----------

  function initInteracciones() {
    const header = document.getElementById("header");
    window.addEventListener("scroll", function () {
      header.classList.toggle("header--fijo", window.scrollY > 40);
    });

    const btnMovil = document.getElementById("btn-menu-movil");
    const nav = document.getElementById("nav-principal");
    btnMovil.addEventListener("click", function () {
      const abierto = nav.classList.toggle("abierto");
      btnMovil.classList.toggle("abierto", abierto);
      btnMovil.setAttribute("aria-expanded", abierto ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("abierto");
        btnMovil.classList.remove("abierto");
        btnMovil.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---------- Arranque ----------

  document.addEventListener("DOMContentLoaded", function () {
    aplicarSEO();
    renderHeader();
    renderHero();
    renderDestacados();
    renderCategorias();
    renderPromo();
    renderBeneficios();
    renderOpiniones();
    renderHorarios();
    renderFooter();
    renderFlotanteYNav();
    initInteracciones();
  });
})();
