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
    últimaRonda,
    juegoFinal
} = require("./Ej_PdepMonopoly.js");
require("should");

const jugador1 = new Personaje("Carolina", 500, "Accionista", [], [pasarPorElBanco, pagarAAccionistas, subastar, cobrarAlquileres, hacerBerrinchePor]);
const jugador2 = new Personaje("Manuel", 500, "Oferente singular", [], [pasarPorElBanco, enojarse, subastar, cobrarAlquileres, hacerBerrinchePor]);

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

describe("ÚltimaRonda()", () => {
    describe("Ejecuta las acciones para cada jugador y lo retorna con los cambios", () => {
    describe('Ej: Carolina: "Avenida Mediterráneo" y "Avenida Estados" - Manuel: "Plaza San Carlos" y "Avenida Indiana"', () => {
        it('Debería retornar: {nombre: "Carolina", dinero: 310, tactica: "Comprador compulsivo", propiedades: [{nombre: "Avenida Estados", precio: 140, disponibilidad: false}], acciones: []}', () => {
            últimaRonda(jugador1, propiedad1, propiedad6)
            jugador1.should.match({
                nombre: "Carolina",
                dinero: 310,
                tactica: "Comprador compulsivo",
                propiedades: [{
                    nombre: "Avenida Estados",
                    precio: 140,
                    disponibilidad: false
                }],
                acciones: []
            })
        });

        it('Debería retornar: {nombre: "Manuel", dinero: 230, tactica: "Comprador compulsivo", propiedades: [{nombre: "Avenida Indiana", precio: 220, disponibilidad: false}], acciones: []}', () => {
            últimaRonda(jugador2, propiedad5, propiedad10)
            jugador2.should.match({
                nombre: "AHHHHManuel",
                dinero: 380,
                tactica: "Comprador compulsivo",
                propiedades: [{
                    nombre: "Avenida Indiana",
                    precio: 220,
                    disponibilidad: false
                }],
                acciones: []
            })
        });
    });
});
});

describe("juegoFinal()", () => {
    describe("Devuelve como ganador al jugador con mas dinero", () => {
    describe('Ej: Carolina: "Avenida Mediterráneo" y "Avenida Estados" - Manuel: "Plaza San Carlos" y "Avenida Indiana"', () => {
        it('Debería retornar: {nombre: "AHHHHManuel", dinero: 380, tactica: "Comprador compulsivo", propiedades: [{nombre: "Avenida Indiana", precio: 220, disponibilidad: false}], acciones: []}', () => { 
            juegoFinal(jugador1, jugador2).should.match({
                nombre: "AHHHHManuel",
                dinero: 380,
                tactica: "Comprador compulsivo",
                propiedades: [{
                    nombre: "Avenida Indiana",
                    precio: 220,
                    disponibilidad: false
                }],
                acciones: []
            })
        });
    });
    });
});