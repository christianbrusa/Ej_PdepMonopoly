const _ = require("lodash");

//Idea de como se forma un Personaje
class Personaje {
    //Metodo constructor
    constructor(nombre, dinero, tactica, propiedades, acciones) {
        this.nombre = nombre;
        this.dinero = dinero;
        this.tactica = tactica;
        this.propiedades = propiedades;
        this.acciones = acciones;
    }
}

//Idea de como se forma una Propiedad
class Propiedad {
    //Metodo constructor
    constructor(nombre, precio, disponibilidad) {
        this.nombre = nombre;
        this.precio = precio;
        this.disponibilidad = disponibilidad;
    }

    esBarata(propiedad) {
        return propiedad.precio < 150;
    }
}

//Modelando las diferentes acciones
const pasarPorElBanco = {
    ejecutar: function(jugador, propiedadSubastar, propiedadComprar) {
        jugador.dinero += 40;
        jugador.tactica = "Comprador compulsivo";
    }
}

const gritar = {
    ejecutar: (jugador, propiedadSubastar, propiedadComprar) => {
        jugador.nombre = "AHHHH" + jugador.nombre;
    }
}

const pagarAAccionistas = {
    ejecutar: (jugador, propiedadSubastar, propiedadComprar) => {
        if (jugador.tactica === "Accionista") {
            jugador.dinero += 200;
        } else {
            jugador.dinero -= 100;
        }
    }
}

const subastar = {
    ejecutar: (jugador, propiedadSubastar, propiedadComprar) => {
        if ((jugador.tactica === "Oferente singular" || jugador.tactica === "Accionista") &&
            (jugador.dinero >= propiedadSubastar.precio) && (propiedadSubastar.disponibilidad)) {
            jugador.propiedades.push(propiedadSubastar);
            jugador.dinero -= propiedadSubastar.precio;
            propiedadSubastar.disponibilidad = false;
        }
    }
}

/*Delegar una función que defina si la propiedad es barata o no y usarla aqui*/
const cobrarAlquileres = {
    ejecutar: (jugador, propiedadSubastar, propiedadComprar) => {
        jugador.propiedades.forEach(prop => {
            if (jugador.propiedades.esBarata) {
                jugador.dinero += 10;
            } else {
                jugador.dinero += 20;
            }
        })
    }
}

const hacerBerrinchePor = {
    ejecutar: (jugador, propiedadSubastar, propiedadComprar) => {
        jugador.dinero += 10;
        while (jugador.dinero < propiedadComprar.precio) {
            jugador.dinero += 10;
        }
        if (jugador.dinero >= propiedadComprar.precio) {
            jugador.propiedades.push(propiedadComprar);
            jugador.dinero -= propiedadComprar.precio;
            propiedadComprar.disponibilidad = false;
        }
    }
}

//Creando personajes
const jugador1 = new Personaje("Carolina", 500, "Accionista", [], []);
const jugador2 = new Personaje("Manuel", 500, "Oferente singular", [], []);

//Creando propiedades
const propiedad1 = new Propiedad("Avenida Mediterráneo", 60, true);
const propiedad2 = new Propiedad("Avenida Báltica", 60, true);
const propiedad3 = new Propiedad("Avenida Oriental", 100, true);
const propiedad4 = new Propiedad("Avenida Vermont", 100, true);
const propiedad5 = new Propiedad("Plaza San Carlos", 140, true);
const propiedad6 = new Propiedad("Avenida Estados", 140, true);
const propiedad7 = new Propiedad("Plaza Santiago", 180, true);
const propiedad8 = new Propiedad("Avenida Nueva York", 200, true);
const propiedad9 = new Propiedad("Avenida Kentucky", 220, true);
const propiedad10 = new Propiedad("Avenida Indiana", 220, true);
const propiedad11 = new Propiedad("Avenida Pacifico", 300, true);
const propiedad12 = new Propiedad("Avenida Pensylvania", 320, true);
const propiedad13 = new Propiedad("Plaza Park", 350, true);
const propiedad14 = new Propiedad("El Muelle", 400, true);

/*Polimorfismo: Cada objeto recibe un mismo mensaje (mismo nombre de método y mismos parametros)
Se aplica polimorfismo ya que todas las acciones entienden ejecutar*/
function últimaRonda(jugador) {
    return jugador.acciones.forEach(x => x.ejecutar(jugador, propiedad12, propiedad13));
}