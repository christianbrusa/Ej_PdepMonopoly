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

    subastar(propiedad) {
        let filtro = x => x.nombre === propiedad;
        let posicion = _.findIndex(propiedades, filtro);
        if ((this.tactica === "Oferente singular" || this.tactica === "Accionista") &&
            (this.dinero >= propiedades[posicion].precio) && propiedades[posicion].disponible) {
            this.propiedades.push(propiedades[posicion]);
            this.dinero -= propiedades[posicion].precio;
            propiedades[posicion].disponible = false;
        }
    }

    cobrarAlquileres() {
        this.propiedades.forEach(prop => {
            if (prop.precio < 150) {
                this.dinero += 10;
            } else {
                this.dinero += 20;
            }
        })
    }

    hacerBerrinchePor(propiedad) {
        this.dinero += 10;
        this.gritar();
        let filtro = x => x.nombre === propiedad;
        let posicion = _.findIndex(propiedades, filtro);
        while (this.dinero < propiedades[posicion].precio) {
            this.dinero += 10;
            //console.log("+ $10 para llegar a comprar la propiedad");
        }
        if (this.dinero >= propiedades[posicion].precio) {
            this.propiedades.push(propiedades[posicion]);
            this.dinero -= propiedades[posicion].precio;
            propiedades[posicion].disponible = false;
        }
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

function últimaRonda(jugador1, jugador2) {
    jugador1.acciones();
    jugador1.subastar("El Muelle");
    jugador1.subastar("Avenida Vermont");
    jugador1.pasarPorElBanco();
    jugador1.cobrarAlquileres();
    jugador1.hacerBerrinchePor("Avenida Pensylvania");

    jugador2.acciones();
    jugador2.subastar("Avenida Indiana");
    jugador2.subastar("Avenida Vermont");
    jugador2.pasarPorElBanco();
    jugador2.cobrarAlquileres();
    jugador2.hacerBerrinchePor("Plaza Park");

    console.log(jugador1);
    console.log(jugador2);

    if (jugador1.dinero > jugador2.dinero) {
        return jugador1.nombre;
    } else {
        return jugador2.nombre;
    }
}
últimaRonda(jugador1, jugador2);