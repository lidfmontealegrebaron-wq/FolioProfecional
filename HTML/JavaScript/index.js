// ============================
// 1. MENÚ HAMBURGUESA
// ============================
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navList.classList.toggle('active');
});

// Cierra el menú al hacer clic en un link (útil en mobile)
navList.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navList.classList.remove('active');
  });
});

// ============================
// 2. ANIMACIÓN DE BARRAS DE HABILIDADES
// ============================
// Usamos Intersection Observer para animar cada barra
// solo cuando el usuario la ve en pantalla (no al cargar la página)
const skillFills = document.querySelectorAll('.skill-fill');

const observerHabilidades = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        const barra = entrada.target;
        const porcentaje = barra.dataset.porcentaje;
        barra.style.width = porcentaje + '%';
        observerHabilidades.unobserve(barra); // solo se anima una vez
      }
    });
  },
  { threshold: 0.4 }
);

skillFills.forEach((barra) => observerHabilidades.observe(barra));

// ============================
// 3. VALIDACIÓN DE FORMULARIO EN TIEMPO REAL
// ============================
const form = document.getElementById('form-contacto');
const campoNombre = document.getElementById('nombre');
const campoEmail = document.getElementById('email');
const campoMensaje = document.getElementById('mensaje');

const errorNombre = document.getElementById('error-nombre');
const errorEmail = document.getElementById('error-email');
const errorMensaje = document.getElementById('error-mensaje');

// Expresión regular simple para validar formato de email
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// --- Funciones de validación individuales ---
function validarNombre() {
  const valor = campoNombre.value.trim();
  if (valor === '') {
    mostrarError(campoNombre, errorNombre, 'El nombre es obligatorio.');
    return false;
  }
  if (valor.length < 3) {
    mostrarError(campoNombre, errorNombre, 'El nombre debe tener al menos 3 caracteres.');
    return false;
  }
  limpiarError(campoNombre, errorNombre);
  return true;
}

function validarEmail() {
  const valor = campoEmail.value.trim();
  if (valor === '') {
    mostrarError(campoEmail, errorEmail, 'El correo es obligatorio.');
    return false;
  }
  if (!regexEmail.test(valor)) {
    mostrarError(campoEmail, errorEmail, 'Escribe un correo válido, ej: nombre@correo.com');
    return false;
  }
  limpiarError(campoEmail, errorEmail);
  return true;
}

function validarMensaje() {
  const valor = campoMensaje.value.trim();
  if (valor === '') {
    mostrarError(campoMensaje, errorMensaje, 'Escribe un mensaje.');
    return false;
  }
  if (valor.length < 10) {
    mostrarError(campoMensaje, errorMensaje, 'El mensaje debe tener al menos 10 caracteres.');
    return false;
  }
  limpiarError(campoMensaje, errorMensaje);
  return true;
}

// --- Funciones auxiliares para mostrar/limpiar errores ---
function mostrarError(campo, elementoError, mensaje) {
  campo.classList.add('invalido');
  elementoError.textContent = mensaje;
}

function limpiarError(campo, elementoError) {
  campo.classList.remove('invalido');
  elementoError.textContent = '';
}

// --- Validación en tiempo real mientras el usuario escribe ---
campoNombre.addEventListener('input', validarNombre);
campoEmail.addEventListener('input', validarEmail);
campoMensaje.addEventListener('input', validarMensaje);

// --- Validación final al enviar el formulario ---
form.addEventListener('submit', (evento) => {
  evento.preventDefault(); // evita que la página se recargue

  const nombreValido = validarNombre();
  const emailValido = validarEmail();
  const mensajeValido = validarMensaje();

  if (nombreValido && emailValido && mensajeValido) {
    alert('¡Mensaje enviado con éxito! Pronto te contactaré.');
    form.reset();
  }
});