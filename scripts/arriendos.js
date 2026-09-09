// Constantes
const costo_estacionamiento = 5500;
const costo_pistola_agua = 2500;

const FormatoCLP = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
})

// Variables Carrito
var total_carrito = 0;


// Utilidades
function ObtenerCostoMuelle(tamano_muelle, unidad_tiempo) {
    switch (tamano_muelle) {
        case "muelle_8":
            switch (unidad_tiempo) {
                case "m_dias":
                    return 13000;

                case "m_semanas":
                    return 77200;

                case "m_meses":
                    return 331500;
            }
            
        case "muelle_10_5": 
            switch (unidad_tiempo) {
                case "m_dias":
                    return 15000;

                case "m_semanas":
                    return 89250;

                case "m_meses":
                    return 382500;
            }


        case "muelle_15_5":
            switch (unidad_tiempo) {
                case "m_dias":
                    return 29000;

                case "m_semanas":
                    return 172000;

                case "m_meses":
                    return 739500;
            }

        case "muelle_18": 
            switch (unidad_tiempo) {
                case "m_dias":
                    return 40000;

                case "m_semanas":
                    return 172000;

                case "m_meses":
                    return 1020000;
            }

        case "muelle_23":
            switch (unidad_tiempo) {
                case "m_dias":
                    return 40000;

                case "m_semanas":
                    return 172000;

                case "m_meses":
                    return 1020000;
            }
    }
}

function ObtenerCostoAlmacen(tamano_almacen) {
    switch (tamano_almacen) {
        case "almacen_8":
            return 85000;

        case "almacen_12":
            return 115000;

        case "almacen_16":
            return 135000;

        case "almacen_20":
            return 147000;

        case "almacen":
            return 180000;
    }
}

function ActualizarCosto(servicio) {
    let i_tiempo;
    let tiempo;
    let p_costo;
    let costo;
    
    switch (servicio) {
        case "muelle":
            i_tiempo = document.getElementById("muelle_tiempo");
            break;

        case "almacen":
            i_tiempo = document.getElementById("almacen_tiempo");
            break;

        case "estacionamiento":
            i_tiempo = document.getElementById("estacionamiento_tiempo");
            break;

        case "pistola_de_agua":
            i_tiempo = document.getElementById("pistola_de_agua_tiempo");
            break;
    }

    if (isNaN(i_tiempo.value)) {
        i_tiempo.value = '';
        return;
    }

    tiempo = Number(i_tiempo.value);
   

    switch (servicio) {
        case "muelle":
            p_costo = document.getElementById("costo_muelle");

            costo = i_tiempo.value * ObtenerCostoMuelle(
                document.getElementById("tamano_muelle").value,
                document.getElementById("muelle_tipo_tiempo").value
            );

            break;

        case "almacen":
            p_costo = document.getElementById("costo_almacen");
            costo = i_tiempo.value * ObtenerCostoAlmacen(
                document.getElementById("tamano_almacen").value
            );
            break;

        case "estacionamiento":
            p_costo = document.getElementById("costo_estacionamiento");
            costo = i_tiempo.value * costo_estacionamiento;
            break;

        case "pistola_de_agua":
            p_costo = document.getElementById("costo_pistola_de_agua");
            costo = i_tiempo.value * costo_pistola_agua;
            break;
    }

    p_costo.textContent = FormatoCLP.format(Number(costo));
}

function anadirArriendo(arriendo) {
    let nombre;
    let costo_unitario;
    let tiempo;
    let subtotal;

    // Variables switch
    let tamano;
    let tamano_index;
    let n_tiempo;
    
    switch (arriendo) {
        case "muelle":
            tamano = document.getElementById("tamano_muelle")
            tamano_index = tamano.selectedIndex;

            nombre = "Muelle (" + tamano.options[tamano_index].text + ")";

            costo_unitario = ObtenerCostoMuelle(
                tamano.value, 
                document.getElementById("muelle_tipo_tiempo").value
            );
            
            n_tiempo = Number(document.getElementById("muelle_tiempo").value);

            let tipo_tiempo = document.getElementById("muelle_tipo_tiempo");
            let tiempo_index = document.getElementById("muelle_tipo_tiempo").selectedIndex;
            tiempo = n_tiempo + " " + tipo_tiempo[tiempo_index].text;

            subtotal = costo_unitario * n_tiempo;
            break;

        case "almacen":
            tamano = document.getElementById("tamano_almacen")
            tamano_index = tamano.selectedIndex;

            nombre = "Almacen (" + tamano.options[tamano_index].text + ")";

            costo_unitario = ObtenerCostoAlmacen(tamano.value);
            console.log(tamano.value);
            
            n_tiempo = Number(document.getElementById("almacen_tiempo").value);
            tiempo = n_tiempo + " Mes(es)"

            subtotal = costo_unitario * n_tiempo;
            break;

        case "estacionamiento":
            nombre = "Estacionamiento";
            costo_unitario = costo_estacionamiento;

            n_tiempo = Number(document.getElementById("estacionamiento_tiempo").value);
            tiempo = n_tiempo + " Dia(s)"
            subtotal = costo_unitario * n_tiempo;
            break;

        case "pistola_de_agua":
            nombre = "Pistola de Agua a Presion";
            costo_unitario = costo_pistola_agua;

            n_tiempo = Number(document.getElementById("pistola_de_agua_tiempo").value);
            tiempo = n_tiempo + " Hora(s)"
            subtotal = costo_unitario * n_tiempo;
            break;
    }

    // Actualizar Total
    total_carrito += subtotal;
    document.getElementById("total_carrito").textContent = FormatoCLP.format(total_carrito);

    // Actualizar Tabla
    let tabla_carrito = document.getElementById("elementos_carrito");
    let nueva_fila = tabla_carrito.insertRow(-1);
    let c_nombre = nueva_fila.insertCell(-1);
    let c_costo_unitario = nueva_fila.insertCell(-1);
    let c_tiempo = nueva_fila.insertCell(-1);
    let c_subtotal = nueva_fila.insertCell(-1);

    c_nombre.textContent = nombre; 
    c_costo_unitario.textContent = FormatoCLP.format(costo_unitario); 
    c_tiempo.textContent = tiempo; 
    c_subtotal.textContent = FormatoCLP.format(subtotal); 
}


function Pagar() {
    total_carrito = 0;
    document.getElementById("total_carrito").textContent = "$0";

    let tabla_carrito = document.getElementById("elementos_carrito");
    while (tabla_carrito.rows.length > 1) {
        tabla_carrito.deleteRow(1);
    }
}

// Añadir listeners para mostrar costos de arriendo
document.getElementById("muelle_tiempo").addEventListener('input', () => {ActualizarCosto("muelle")});
document.getElementById("almacen_tiempo").addEventListener('input', () => {ActualizarCosto("almacen")});
document.getElementById("estacionamiento_tiempo").addEventListener('input', () => {ActualizarCosto("estacionamiento")});
document.getElementById("pistola_de_agua_tiempo").addEventListener('input', () => {ActualizarCosto("pistola_de_agua")});

document.getElementById("tamano_muelle").addEventListener('input', () => {ActualizarCosto("muelle")});
document.getElementById("muelle_tipo_tiempo").addEventListener('input', () => {ActualizarCosto("muelle")});
document.getElementById("tamano_almacen").addEventListener('input', () => {ActualizarCosto("almacen")});