// Bandera de compilación (cambia este valor manualmente al compilar)
const compilacionId = "compilacion-1"; // Cambia a "compilacion-2", "compilacion-3", etc., al recompilar

// Verificar si la bandera de compilación ha cambiado
if (localStorage.getItem("compilacionId") !== compilacionId) {
  localStorage.clear(); // Borrar todos los datos del localStorage
  localStorage.setItem("compilacionId", compilacionId); // Guardar la nueva bandera
}

// Función para guardar síntomas y comentarios
function guardarSintomas() {
  const sintomas = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
    .map(input => input.value);

  const comentarios = document.getElementById("comentarios").value;

  // Crear objeto de paciente
  const paciente = {
    nombre: localStorage.getItem("nombreUsuario"),
    correo: localStorage.getItem("correoUsuario"), // Guardar el correo como identificador único
    sintomas: sintomas,
    comentarios: comentarios,
    fecha: new Date().toLocaleString(),
    atendido: false // Por defecto, el paciente no ha sido atendido
  };

  // Guardar en localStorage
  const pacientes = JSON.parse(localStorage.getItem("pacientes") || "[]");
  pacientes.push(paciente);
  localStorage.setItem("pacientes", JSON.stringify(pacientes));

  alert("Información guardada correctamente.");
}

// Función para cargar la respuesta del doctor
function cargarRespuestaDoctor() {
  const pacientes = JSON.parse(localStorage.getItem("pacientes") || "[]");
  const correoPaciente = localStorage.getItem("correoUsuario");

  // Buscar al paciente actual
  const paciente = pacientes.find(p => p.correo === correoPaciente);

  if (paciente?.respuestaDoctor) {
    document.getElementById("respuestaDoctor").textContent = paciente.respuestaDoctor;
    document.getElementById("respuestaDoctorContainer").style.display = "block";
  }
}

// Función para cerrar sesión
function cerrarSesion() {
  localStorage.removeItem("nombreUsuario");
  localStorage.removeItem("tipoUsuario");
  localStorage.removeItem("correoUsuario"); // Eliminar el correo al cerrar sesión
  window.location.href = "../index.html"; // Corregir la ruta para redirigir al index.html
}

// Cargar la respuesta del doctor al iniciar la página
document.addEventListener("DOMContentLoaded", () => {
  const tipoUsuario = localStorage.getItem("tipoUsuario");
  if (tipoUsuario !== "paciente") {
    window.location.href = "../index.html"; // Redirigir al index.html si no es un paciente
  }

  document.getElementById("nombrePaciente").textContent = 
    localStorage.getItem("nombreUsuario");

  cargarRespuestaDoctor();
});