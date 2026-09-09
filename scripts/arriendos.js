// Constantes
const costo_estacionamiento = 5500;
const costo_pistola_agua = 2500;

const FormatoCLP = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
})


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


// Añadir listeners para mostrar costos de arriendo
document.getElementById("muelle_tiempo").addEventListener('input', () => {ActualizarCosto("muelle")});
document.getElementById("almacen_tiempo").addEventListener('input', () => {ActualizarCosto("almacen")});
document.getElementById("estacionamiento_tiempo").addEventListener('input', () => {ActualizarCosto("estacionamiento")});
document.getElementById("pistola_de_agua_tiempo").addEventListener('input', () => {ActualizarCosto("pistola_de_agua")});

document.getElementById("tamano_muelle").addEventListener('input', () => {ActualizarCosto("muelle")});
document.getElementById("muelle_tipo_tiempo").addEventListener('input', () => {ActualizarCosto("muelle")});
document.getElementById("tamano_almacen").addEventListener('input', () => {ActualizarCosto("almacen")});