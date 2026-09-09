let boton = document.getElementById("guardar");

boton.addEventListener("click", function() {

    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("correo").value;
    let contraseña = document.getElementById("contraseña").value;
    let contraseñaRepetida = document.getElementById("contraseñaRepetida").value;
    let telefono = document.getElementById("telefono").value;
    let direccion = document.getElementById("direccion").value;
    let velero = document.getElementById("velero").value;

    if (nombre.trim() === "" || correo.trim() === "" || contraseña.trim() === "" || contraseñaRepetida.trim() === "" || direccion.trim() === "" || velero.trim() === "") {
        alert("Es importante que rellenes todos los datos!");
        return;
    }

    let expresionNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;

    if (!expresionNombre.test(nombre)) {
        alert("El nombre no puede contener números ni caracteres especiales");
        return;
    }

    let expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!expresionCorreo.test(correo)) {
        alert("El correo electrónico no es válido");
        return;
    }

    if (contraseña.length < 10) {
        alert("La contraseña debe contener 10 caracteres mínimo");
        return;
    }

    if (contraseña !== contraseñaRepetida) {
        alert("Las contraseñas no coinciden");
        return;
    }

    let expresionTelefono = /^\+?[0-9]+$/

    if (telefono !== "" && !expresionTelefono.test(telefono)) {
        alert("El teléfono solo puede contener números y el + inicial en caso de ser necesario");
        return;
    }

    let tieneNumero = /[0-9]/.test(direccion);
    let tieneLetras = /[A-Za-zÁÉÍÓÚáéíóúÑñ]/.test(direccion);

    if (!tieneLetras || !tieneNumero) {
        alert("La dirección debe contener un nombre de calle y el número de casa o departamento");
        return;
    }

    window.location.href = "index.html"
});

let botonCancelar = document.getElementById("cancelar");

botonCancelar.addEventListener("click", function() {
    window.location.href = "inicio.html";
});