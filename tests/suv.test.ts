import Reserva from "../src/reserva";
import SUV from "../src/suv";
import {DeepMockProxy, mockDeep} from 'jest-mock-extended';
import moment from "moment";

//Aca estan los test de SUV.TS y INECESITAMANTENIMIENTO.TS

describe('Tests de la clase SUV', () => {

    let suv : SUV;

    beforeEach(() => {
        suv = new SUV("ABC123", 15000);
      });


    it('Debe ser una instancia de la clase SUV',() => {
        expect(suv).toBeInstanceOf(SUV);
    });

    it('Debe calcular la tarifa correctamente sin km extra', () => {
        const reservaMock: DeepMockProxy<Reserva> = mockDeep<Reserva>();

        reservaMock.getKmRecorridos.mockReturnValue(new Map<Date, number>([
            [new Date(2025, 1, 1), 100],
            [new Date(2025, 1, 2), 150],
            [new Date(2025, 1, 3), 200],
        ]));
        expect(suv.calcularTarifa(reservaMock)).toBe(285);

    });

    it('Debe calcular la tarifa correctamente con km extra', () => {
        const reservaMock: DeepMockProxy<Reserva> = mockDeep<Reserva>();

        reservaMock.getKmRecorridos.mockReturnValue(new Map<Date,number>([
            [new Date(2025, 1, 1), 200],
            [new Date(2025, 1, 2), 200],
            [new Date(2025, 1, 3), 200],
        ]));

        expect(suv.calcularTarifa(reservaMock)).toBe(310);
    });

    it("NO debe enviar a mantenimiento si no cumple ninguna regla", () => {
    // Simulamos que el vehículo estaba alquilado
    suv.alquilar();

    // Configuramos valores que NO disparan mantenimiento
    suv.setCantidadViajes(1);
    suv.setKmUltimoMantenimiento(0);
    suv.setKilometraje(5000);
    suv.setFechaUltimoMantenimiento(moment().toDate());

    // Al finalizar la reserva se ejecuta esta lógica
    suv.necesitaMantenimiento();

    // Como NO necesita mantenimiento → se devuelve → pasa a Disponible
    expect(suv.getEstado().constructor.name).toBe("Disponible");
});
it("Debe enviar a mantenimiento si excede viajes", () => {
    suv.setCantidadViajes(5);

    suv.necesitaMantenimiento();

    expect(suv.getEstado().constructor.name).toBe("En_Mantenimiento");
});

it("Debe enviar a mantenimiento si supera los kilómetros permitidos", () => {
    suv.setKmUltimoMantenimiento(0);
    suv.setKilometraje(20000); 

    suv.necesitaMantenimiento(); 

    expect(suv.getEstado().constructor.name).toBe("En_Mantenimiento");
});

it("Debe enviar a mantenimiento si pasaron más de 12 meses desde el último mantenimiento", () => {
    suv.setFechaUltimoMantenimiento(
        moment().subtract(13, "months").toDate()
    );

    suv.necesitaMantenimiento();

    expect(suv.getEstado().constructor.name).toBe("En_Mantenimiento");
});

});

    

