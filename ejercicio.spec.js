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

let jugador1;
let jugador2;

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


describe("pasarPorElBanco()", () => {

    beforeEach(function() {
        jugador1 = new Personaje("Carolina", 500, "Accionista", [], [pasarPorElBanco]);
    })

    it("Deberia aumentar $40 y cambiar la tactica del jugador a 'Comprador compulsivo'", () => {
        pasarPorElBanco.ejecutar(jugador1);
        jugador1.should.be.eql(new Personaje("Carolina", 540, "Comprador compulsivo", [], [pasarPorElBanco]))
    });
});


describe("enojarse()", () => {

    beforeEach(function() {
        jugador2 = new Personaje("Manuel", 500, "Oferente singular", [], [enojarse]);
    })

    it("Deberia aumentar $50 y agregar gritar a sus acciones", () => {
        enojarse.ejecutar(jugador2)
        jugador2.should.be.eql(new Personaje("Manuel", 550, "Oferente singular", [], [enojarse, gritar]))
    });
});


describe("pagarAAccionistas()", () => {

    it("Deberia aumentar $200 si la tactica del jugador es 'Accionista'", () => {
        const jugador1 = new Personaje("Carolina", 500, "Accionista", [], [pagarAAccionistas]);
        pagarAAccionistas.ejecutar(jugador1);
        jugador1.should.be.eql(new Personaje("Carolina", 700, "Accionista", [], [pagarAAccionistas]))
    });

    it("Deberia restar $100 si la tactica del jugador NO es 'Accionista'", () => {
        const jugador1 = new Personaje("Carolina", 500, "Comprador compulsivo", [], [pagarAAccionistas]);
        pagarAAccionistas.ejecutar(jugador1);
        jugador1.should.be.eql(new Personaje("Carolina", 400, "Comprador compulsivo", [], [pagarAAccionistas]))
    });
});


describe("subastar()", () => {
    it("Deberia permitir comprar una propiedad para los jugadores con tactica 'Accionista' o 'Comprador compulsivo'", () => {
        const jugador1 = new Personaje("Carolina", 500, "Accionista", [], [subastar]);
        subastar.ejecutar(jugador1, propiedad1);
        jugador1.should.be.eql(new Personaje("Carolina", 440, "Accionista", [propiedad1], [subastar]))
    });
});


describe("cobrarAlquileres()", () => {
    it("Deberia cobrar $10 para las propiedades baratas de cada jugador y $20 para las propiedades caras", () => {
        const jugador2 = new Personaje("Manuel", 500, "Oferente singular", [propiedad1, propiedad12], [cobrarAlquileres]);
        cobrarAlquileres.ejecutar(jugador2);
        jugador2.should.be.eql(new Personaje("Manuel", 530, "Oferente singular", [propiedad1, propiedad12], [cobrarAlquileres]))
    });
});


describe("hacerBerrinchePor()", () => {
    it("Deberia sumar $10 e intentar comprar la propiedad que desea. En caso que no llegue con el dinero, suma $10 hasta que pueda comprar la misma", () => {
        const jugador1 = new Personaje("Carolina", 100, "Accionista", [propiedad4], [hacerBerrinchePor]);
        hacerBerrinchePor.ejecutar(jugador1, propiedad1, propiedad11);
        jugador1.should.be.eql(new Personaje("Carolina", 0, "Accionista", [propiedad4, propiedad11], [hacerBerrinchePor]))
    });
});


describe("ÚltimaRonda()", () => {
    describe("Ejecuta las acciones para cada jugador y lo retorna con los cambios", () => {

        beforeEach(function() {
            jugador1 = new Personaje("Carolina", 500, "Accionista", [], [pasarPorElBanco, pagarAAccionistas, subastar, cobrarAlquileres, hacerBerrinchePor]);
            jugador2 = new Personaje("Manuel", 500, "Oferente singular", [], [pasarPorElBanco, enojarse, subastar, cobrarAlquileres, hacerBerrinchePor]);
        })

        describe('Ej: Carolina: "Avenida Mediterráneo" y "Avenida Estados" - Manuel: "Plaza San Carlos" y "Avenida Indiana"', () => {
            it('Debería retornar: {nombre: "Carolina", dinero: 310, tactica: "Comprador compulsivo", propiedades: [{nombre: "Avenida Estados", precio: 140, disponibilidad: false}], acciones: []}', () => {
                últimaRonda(jugador1, propiedad1, propiedad6);
                jugador1.should.be.eql(new Personaje("Carolina", 310, "Comprador compulsivo", [propiedad6], [pasarPorElBanco, pagarAAccionistas, subastar, cobrarAlquileres, hacerBerrinchePor]))
            });

            it('Debería retornar: {nombre: "Manuel", dinero: 230, tactica: "Comprador compulsivo", propiedades: [{nombre: "Avenida Indiana", precio: 220, disponibilidad: false}], acciones: []}', () => {
                últimaRonda(jugador2, propiedad5, propiedad10);
                jugador2.should.be.eql(new Personaje("AHHHHManuel", 380, "Comprador compulsivo", [propiedad10], [pasarPorElBanco, enojarse, subastar, cobrarAlquileres, hacerBerrinchePor, gritar]))
            });
        });

        describe('Ej: Carolina: "Plaza Santiago" y "Plaza Park" - Manuel: "El Muelle" y "Avenida Báltica"', () => {
            it('Debería retornar: {nombre: "Carolina", dinero: 100, tactica: "Comprador compulsivo", propiedades: [{nombre: "Plaza Park", precio: 350, disponibilidad: false}], acciones: []}', () => {
                últimaRonda(jugador1, propiedad7, propiedad13);
                jugador1.should.be.eql(new Personaje("Carolina", 100, "Comprador compulsivo", [propiedad13], [pasarPorElBanco, pagarAAccionistas, subastar, cobrarAlquileres, hacerBerrinchePor]))
            });

            it('Debería retornar: {nombre: "Manuel", dinero: 400, tactica: "Comprador compulsivo", propiedades: [{nombre: "Avenida Nueva York", precio: 200, disponibilidad: false}], acciones: []}', () => {
                últimaRonda(jugador2, propiedad14, propiedad8);
                jugador2.should.be.eql(new Personaje("AHHHHManuel", 400, "Comprador compulsivo", [propiedad8], [pasarPorElBanco, enojarse, subastar, cobrarAlquileres, hacerBerrinchePor, gritar]))
            });
        });
    });
});


describe("juegoFinal()", () => {
    describe("Devuelve como ganador al jugador con mas dinero", () => {

        beforeEach(function() {
            jugador1 = new Personaje("Carolina", 500, "Accionista", [], [pasarPorElBanco, pagarAAccionistas, subastar, cobrarAlquileres, hacerBerrinchePor]);
            jugador2 = new Personaje("Manuel", 500, "Oferente singular", [], [pasarPorElBanco, enojarse, subastar, cobrarAlquileres, hacerBerrinchePor]);
        })

        describe('Ej: Carolina: "Avenida Mediterráneo" y "Avenida Estados" - Manuel: "Plaza San Carlos" y "Avenida Indiana"', () => {
            it('Debería retornar: {nombre: "AHHHHManuel", dinero: 380, tactica: "Comprador compulsivo", propiedades: [{nombre: "Avenida Indiana", precio: 220, disponibilidad: false}], acciones: []}', () => {
                últimaRonda(jugador1, propiedad1, propiedad6);
                últimaRonda(jugador2, propiedad5, propiedad10);
                juegoFinal(jugador1, jugador2).should.be.eql(new Personaje("AHHHHManuel", 380, "Comprador compulsivo", [propiedad10], [pasarPorElBanco, enojarse, subastar, cobrarAlquileres, hacerBerrinchePor, gritar]))
            });
        });

        describe('Ej: Carolina: "Plaza Santiago" y "Plaza Park" - Manuel: "El Muelle" y "Avenida Báltica"', () => {
            it('Debería retornar: {nombre: "AHHHHManuel", dinero: 400, tactica: "Comprador compulsivo", propiedades: [{nombre: "Avenida Nueva York", precio: 200, disponibilidad: false}], acciones: []}', () => {
                últimaRonda(jugador1, propiedad7, propiedad13);
                últimaRonda(jugador2, propiedad14, propiedad8);
                juegoFinal(jugador1, jugador2).should.be.eql(new Personaje("AHHHHManuel", 400, "Comprador compulsivo", [propiedad8], [pasarPorElBanco, enojarse, subastar, cobrarAlquileres, hacerBerrinchePor, gritar]))
            });
        });
    });
});