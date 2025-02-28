function login() {
  const userType = document.getElementById("userType").value;
  const nombre = document.getElementById("user").value;
  const correo = document.getElementById("email").value;
  const contraseña = document.getElementById("password").value;

  // Validaciones básicas
  if (nombre.length < 3 || nombre.length > 25) {
    alert("Nombre inválido");
    return;
  }

  // Guardar datos de sesión
  localStorage.setItem("nombreUsuario", nombre);
  localStorage.setItem("tipoUsuario", userType);
  localStorage.setItem("correoUsuario", correo); // Guardar el correo como identificador único

  // Redirección
  if (userType === "paciente") {
    window.location.href = "Paciente/patient.html"; // Ruta corregida
  } else {
    window.location.href = "Doctor/doctor.html"; // Ruta corregida
  }
}

function cerrarSesion() {
  localStorage.removeItem("nombreUsuario");
  localStorage.removeItem("tipoUsuario");
  localStorage.removeItem("correoUsuario"); // Eliminar el correo al cerrar sesión
  window.location.href = "index.html"; // Ruta corregida
}