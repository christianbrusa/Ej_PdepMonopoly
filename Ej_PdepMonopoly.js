const _ = require("lodash");
const limitePropiedadBarata = 150;
const gananciaPropiedadBarata = 10;
const gananciaPropiedadCara = 20;

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
        return propiedad.precio < limitePropiedadBarata;
    }
}

//Modelando las diferentes acciones
const pasarPorElBanco = {
    valorFijoPorRetirar: 40,
    ejecutar: function(jugador, propiedadSubastar, propiedadComprar) {
        jugador.dinero += this.valorFijoPorRetirar;
        jugador.tactica = "Comprador compulsivo";
    }
}

const gritar = {
    ejecutar: (jugador, propiedadSubastar, propiedadComprar) => {
        jugador.nombre = "AHHHH" + jugador.nombre;
    }
}

const enojarse = {
    valorFijoSumar: 50,
    ejecutar: function(jugador, propiedadSubastar, propiedadComprar) {
        jugador.dinero += this.valorFijoSumar;
        jugador.acciones.push(gritar);
        //gritar.ejecutar(jugador);
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
            if (prop.esBarata(prop)) {
                jugador.dinero += gananciaPropiedadBarata;
            } else {
                jugador.dinero += gananciaPropiedadCara;
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

//Creando personajes
const jugador1 = new Personaje("Carolina", 500, "Accionista", [], []);
const jugador2 = new Personaje("Manuel", 500, "Oferente singular", [], []);

/*Polimorfismo: Cada objeto recibe un mismo mensaje (mismo nombre de método y mismos parametros)
Se aplica polimorfismo ya que todas las acciones entienden ejecutar*/
function últimaRonda(jugador, propiedadSubastar, propiedadComprar) {
    return jugador.acciones.forEach(x => x.ejecutar(jugador, propiedadSubastar, propiedadComprar));
}

function juegoFinal(jugador1, jugador2) {
    if (jugador1.dinero > jugador2.dinero) {
        return jugador1;
    } else {
        return jugador2;
    }
}

juegoFinal(jugador1, jugador2);

module.exports = {
    Personaje,
    Propiedad,
    pasarPorElBanco,
    gritar,
    enojarse,
    pagarAAccionistas,
    subastar,
    cobrarAlquileres,
    hacerBerrinchePor,
    últimaRonda,
    juegoFinal
};