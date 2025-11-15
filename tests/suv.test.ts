import Reserva from "../src/reserva";
import SUV from "../src/suv";
import {DeepMockProxy, mockDeep} from 'jest-mock-extended';

describe('Tests de la clase SUV', () => {

    let suv = new SUV("ABC123", 15000);

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
    })

});