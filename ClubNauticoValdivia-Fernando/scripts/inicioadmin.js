let boton = document.getElementById("iniciar");

boton.addEventListener("click", function() {

    let correo = document.getElementById("correo").value;
    let contraseña = document.getElementById("contraseña").value;

    if (correo.trim() === "" || contraseña.trim() === "") {
        alert("Debes ingresar todos los datos para iniciar sesión");
        return;
    }

    let expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!expresionCorreo.test(correo)) {
        alert("El correo electrónico no es válido");
        return;
    }

    if (contraseña.length < 10) {
        alert("La contraseña que estás utilizando debe contener 10 caracteres mínimo");
        return;
    }

});