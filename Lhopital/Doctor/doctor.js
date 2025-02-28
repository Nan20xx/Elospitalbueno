// Bandera de compilación (cambia este valor manualmente al compilar)
const compilacionId = "compilacion-1"; // Cambia a "compilacion-2", "compilacion-3", etc., al recompilar

// Verificar si la bandera de compilación ha cambiado
if (localStorage.getItem("compilacionId") !== compilacionId) {
  localStorage.clear(); // Borrar todos los datos del localStorage
  localStorage.setItem("compilacionId", compilacionId); // Guardar la nueva bandera
}

// Función para guardar la respuesta del doctor
function guardarRespuesta() {
  const respuesta = document.getElementById("respuestaDoctor").value;
  const pacienteIndex = document.querySelector(".paciente-item.selected")?.dataset.index;

  if (pacienteIndex === undefined) {
    alert("Seleccione un paciente primero.");
    return;
  }

  // Obtener la lista de pacientes
  const pacientes = JSON.parse(localStorage.getItem("pacientes") || "[]");

  // Guardar la respuesta en el paciente seleccionado y marcarlo como atendido
  pacientes[pacienteIndex].respuestaDoctor = respuesta;
  pacientes[pacienteIndex].atendido = true; // Marcar como atendido
  localStorage.setItem("pacientes", JSON.stringify(pacientes));

  alert("Respuesta guardada correctamente.");
}

// Función para mostrar detalles del paciente seleccionado
function mostrarDetalle(index) {
  const pacientes = JSON.parse(localStorage.getItem("pacientes"));
  const paciente = pacientes[index];

  // Mostrar síntomas y comentarios del paciente
  document.getElementById("listaSintomas").innerHTML = 
    paciente.sintomas.map(s => `<li>${s}</li>`).join("");
  document.getElementById("comentariosPaciente").textContent = 
    paciente.comentarios;

  // Mostrar la respuesta del doctor (si existe)
  document.getElementById("respuestaDoctor").value = 
    paciente.respuestaDoctor || "";

  // Marcar el paciente seleccionado
  const botonesPacientes = document.querySelectorAll(".paciente-item");
  botonesPacientes.forEach(btn => btn.classList.remove("selected"));
  botonesPacientes[index].classList.add("selected");

  // Mostrar el detalle del paciente
  document.getElementById("detallePaciente").style.display = "block";
}

// Función para cargar la lista de pacientes
function cargarPacientes() {
  const pacientes = JSON.parse(localStorage.getItem("pacientes") || "[]");
  const lista = document.getElementById("listaPacientes");

  lista.innerHTML = pacientes.map((paciente, index) => `
    <button class="paciente-item" data-index="${index}" onclick="mostrarDetalle(${index})">
      ${paciente.nombre} - ${paciente.fecha}
      ${paciente.atendido ? " (Atendido)" : ""} <!-- Mostrar "Atendido" si ya fue atendido -->
    </button>
  `).join("");
}

// Función para cerrar sesión
function cerrarSesion() {
  localStorage.removeItem("nombreUsuario");
  localStorage.removeItem("tipoUsuario");
  localStorage.removeItem("correoUsuario"); // Eliminar el correo al cerrar sesión
  window.location.href = "../index.html"; // Corregir la ruta para redirigir al index.html
}

// Cargar la lista de pacientes al iniciar la página
document.addEventListener("DOMContentLoaded", () => {
  const tipoUsuario = localStorage.getItem("tipoUsuario");
  if (tipoUsuario !== "doctor") {
    window.location.href = "../index.html"; // Redirigir al index.html si no es un doctor
  }

  document.getElementById("nombreDoctor").textContent = 
    localStorage.getItem("nombreUsuario");

  cargarPacientes();
});