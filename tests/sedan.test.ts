import Reserva from '../src/reserva';
import Sedan from '../src/sedan';
import {DeepMockProxy, mockDeep} from 'jest-mock-extended';

describe('Tests de la clase Sedan', () => {

    let sedan = new Sedan("XYZ789", 0, 20000);


    it('Debe ser una instancia de clase Sedan', () =>{
        expect(sedan).toBeInstanceOf(Sedan);
    });

    it('Debe calcular la tarifa correctamente', () => {
        const reservaMock: DeepMockProxy<Reserva> = mockDeep<Reserva>();

        reservaMock.getKmRecorridos.mockReturnValue(new Map<Date, number>([
            [new Date(2025, 2, 1), 50],
            [new Date(2025, 2, 2), 70],
        ]));

        expect(sedan.calcularTarifa(reservaMock)).toBe(84);



    });

});