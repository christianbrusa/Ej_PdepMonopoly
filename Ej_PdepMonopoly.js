const _ = require("lodash");
const propiedades = require("./propiedades");

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

    pasarPorElBanco() {
        this.dinero += 40;
        this.tactica = "Comprador compulsivo";
    }

    gritar() {
        let nuevoNombre = "AHHHH" + this.nombre;
        this.nombre = nuevoNombre;
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
            console.log("+ $10 para llegar a comprar la propiedad");
        }
        if (this.dinero >= propiedades[posicion].precio) {
            this.propiedades.push(propiedades[posicion]);
            this.dinero -= propiedades[posicion].precio;
            propiedades[posicion].disponible = false;
        }
    }
}

//Creando personajes
const jugador1 = new Personaje("Carolina", 500, "Accionista", [],
    function pagarAAccionistas() {
        if (this.tactica === "Accionista") {
            this.dinero += 200;
        } else {
            this.dinero -= 100;
        }
    }
);

const jugador2 = new Personaje("Manuel", 500, "Oferente singular", [],
    function enojarse() {
        this.dinero += 50;
        jugador2.gritar();
    }
);


jugador1.subastar("El Muelle");
jugador1.subastar("Avenida Vermont");
//jugador1.subastar("Avenida Nueva York");
//jugador2.subastar("Avenida Estados");
//console.log(jugador1);
//console.log(jugador2);
jugador1.cobrarAlquileres();
//jugador2.cobrarAlquileres();
console.log(jugador1);
//console.log(jugador2);
jugador1.hacerBerrinchePor("Avenida Pensylvania");
console.log(jugador1);