const {
    Personaje,
    Propiedad,
    pasarPorElBanco,
    gritar,
    enojarse,
    pagarAAccionistas,
    subastar,
    cobrarAlquileres,
    hacerBerrinchePor,
    últimaRonda
} = require('./Ej_PdepMonopoly.js');
require("should");

const jugador1 = new Personaje("Carolina", 500, "Accionista", [], [pasarPorElBanco]);
const jugador2 = new Personaje("Manuel", 500, "Oferente singular", [], [pasarPorElBanco]);

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


describe("Test", () => {
    describe("Pasar por el banco", () => {
        it("Deberia aumentar $40 y cambiar la tactica del pj", () => {
            if (jugador1.acciones.includes(pasarPorElBanco)) {
                pasarPorElBanco.ejecutar(jugador1)
                jugador1.should.match({
                    nombre: "Carolina",
                    dinero: 540,
                    tactica: "Comprador compulsivo",
                    propiedades: [],
                    acciones: [{
                        valorFijoPorRetirar: 40,
                        ejecutar: function ejecutar(jugador, propiedadSubastar, propiedadComprar) {
                            jugador.dinero += this.valorFijoPorRetirar;
                            jugador.tactica = "Comprador compulsivo";
                        }
                    }]
                })
            }
            if (jugador2.acciones.includes(pasarPorElBanco)) {
                pasarPorElBanco.ejecutar(jugador2)
                jugador2.should.match({
                    nombre: "Manuel",
                    dinero: 540,
                    tactica: "Comprador compulsivo",
                    propiedades: [],
                    acciones: [{
                        valorFijoPorRetirar: 40,
                        ejecutar: function ejecutar(jugador, propiedadSubastar, propiedadComprar) {
                            jugador.dinero += this.valorFijoPorRetirar;
                            jugador.tactica = "Comprador compulsivo";
                        }
                    }]
                })
            }
        });
    });
});