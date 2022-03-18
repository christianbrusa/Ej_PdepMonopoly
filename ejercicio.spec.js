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
const jugador2 = new Personaje("Manuel", 500, "Oferente singular", [], []);

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
            if (jugador1.acciones.includes(pasarPorElBanco) && jugador1.acciones.length <= 1) {
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
            if (jugador2.acciones.includes(pasarPorElBanco) && jugador1.acciones.length <= 1) {
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


    describe("El jugador se enoja", () => {
        it("Deberia aumentar $50 y agregar gritar a sus acciones", () => {
            if (jugador1.acciones.includes(enojarse) && jugador1.acciones.includes(pasarPorElBanco)) {
                enojarse.ejecutar(jugador1)
                should(jugador1).match({
                    //jugador1.should.be.eql({ me devolvió error al comparar los objetos
                    nombre: "AHHHHCarolina",
                    dinero: 590,
                    tactica: "Comprador compulsivo",
                    propiedades: [],
                    acciones: [{
                        valorFijoPorRetirar: 40,
                        ejecutar: function ejecutar(jugador, propiedadSubastar, propiedadComprar) {
                            jugador.dinero += this.valorFijoPorRetirar;
                            jugador.tactica = "Comprador compulsivo";
                        }
                    }, {
                        valorFijoSumar: 50,
                        ejecutar: function(jugador, propiedadSubastar, propiedadComprar) {
                            jugador.dinero += this.valorFijoSumar;
                        }
                    }]
                })
            }
            //if (jugador1.acciones.includes(enojarse) && !jugador1.acciones.includes(pasarPorElBanco)) {
            else if (jugador1.acciones.includes(enojarse) && jugador1.acciones.length <= 1) {
                enojarse.ejecutar(jugador1)
                should(jugador1).match({
                    //jugador1.should.be.eql({ me devolvió error al comparar los objetos
                    nombre: "AHHHHCarolina",
                    dinero: 550,
                    tactica: "Accionista",
                    propiedades: [],
                    acciones: [{
                        valorFijoSumar: 50,
                        ejecutar: function(jugador, propiedadSubastar, propiedadComprar) {
                            jugador.dinero += this.valorFijoSumar;
                        }
                    }]
                })
            } else if (jugador2.acciones.includes(enojarse) && jugador2.acciones.includes(pasarPorElBanco)) {
                enojarse.ejecutar(jugador2)
                should(jugador2).match({
                    //jugador1.should.be.eql({ me devolvió error al comparar los objetos
                    nombre: "AHHHHManuel",
                    dinero: 590,
                    tactica: "Comprador compulsivo",
                    propiedades: [],
                    acciones: [{
                        valorFijoPorRetirar: 40,
                        ejecutar: function ejecutar(jugador, propiedadSubastar, propiedadComprar) {
                            jugador.dinero += this.valorFijoPorRetirar;
                            jugador.tactica = "Comprador compulsivo";
                        }
                    }, {
                        valorFijoSumar: 50,
                        ejecutar: function(jugador, propiedadSubastar, propiedadComprar) {
                            jugador.dinero += this.valorFijoSumar;
                        }
                    }]
                })
            } else if (jugador2.acciones.includes(enojarse) && jugador2.acciones.length <= 1) {
                enojarse.ejecutar(jugador2)
                should(jugador2).match({
                    //jugador1.should.be.eql({ me devolvió error al comparar los objetos
                    nombre: "AHHHHManuel",
                    dinero: 550,
                    tactica: "Oferente singular",
                    propiedades: [],
                    acciones: [{
                        valorFijoSumar: 50,
                        ejecutar: function(jugador, propiedadSubastar, propiedadComprar) {
                            jugador.dinero += this.valorFijoSumar;
                        }
                    }]
                })
            }
        });
    });
});