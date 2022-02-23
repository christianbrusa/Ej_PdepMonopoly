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
}

//Creando personajes
const jugador1 = new Personaje("Carolina", 500, "Accionista", {},
    function pagarAAccionistas() {
        if (this.tactica === "Accionista") {
            this.dinero += 200;
        } else {
            this.dinero -= 100;
        }
    }
);

const jugador2 = new Personaje("Manuel", 500, "Oferente singular", {},
    function enojarse() {
        this.dinero += 50;
        jugador2.gritar();
    }
);