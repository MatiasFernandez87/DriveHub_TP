import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import GeneradorDeReporte from '../src/reportes/generadorReporte';
import Vehiculo from '../src/vehiculo';
import Reserva from '../src/reserva';


describe ("Test de la clase generadorReporte", () => {

    let generadorReporte = new GeneradorDeReporte();
    let vehiculoMock: DeepMockProxy<Vehiculo> = mockDeep<Vehiculo>();
    let reservaMock: DeepMockProxy<Reserva> = mockDeep<Reserva>();

    it("Debe ser una instancia de la clase GeneradorDeReporte", () => {
        expect(generadorReporte).toBeInstanceOf(GeneradorDeReporte);
    });

    // it.skip("vehiculoMasAlquilado debe retornar el vehiculo mas alquilado", () => {
    //     let fechaInicio = new Date('2024-01-15');
    //     let fechaFin = new Date("2024-12-21")

    //     let vehiculos = [vehiculoMock, vehiculoMock, vehiculoMock, vehiculoMock, vehiculoMock];



    //     let reserva1: DeepMockProxy<Reserva> = mockDeep<Reserva>();
    //     reserva1.getFechaInicio.mockReturnValue(new Date('2024-07-10'));
    //     reserva1.getFechaFin.mockReturnValue(new Date('2024-07-20'));

    //     let reserva2: DeepMockProxy<Reserva> = mockDeep<Reserva>();
    //     reserva2.getFechaInicio.mockReturnValue(new Date('2024-06-01'));
    //     reserva2.getFechaFin.mockReturnValue(new Date('2024-06-10'));

    //     let reserva3: DeepMockProxy<Reserva> = mockDeep<Reserva>();
    //     reserva3.getFechaInicio.mockReturnValue(new Date('2024-07-14'));
    //     reserva3.getFechaFin.mockReturnValue(new Date('2024-07-16'));

    //     let reservas = [reserva1,reserva2,reserva3]


    //     let vehiculoMasAlquilado = generadorReporte.vehiculoMasAlquilado(fechaInicio, fechaFin,vehiculos,reservas)


        
    // });

       

    it("vehiculosOcupados debe retornar el porcentaje correcto de vehiculos ocupados", () => {
        let fechaBusqueda = new Date('2024-07-15');
        let vehiculos = [vehiculoMock, vehiculoMock, vehiculoMock, vehiculoMock, vehiculoMock];

        let reserva1: DeepMockProxy<Reserva> = mockDeep<Reserva>();
        reserva1.getFechaInicio.mockReturnValue(new Date('2024-07-10'));
        reserva1.getFechaFin.mockReturnValue(new Date('2024-07-20'));

        let reserva2: DeepMockProxy<Reserva> = mockDeep<Reserva>();
        reserva2.getFechaInicio.mockReturnValue(new Date('2024-06-01'));
        reserva2.getFechaFin.mockReturnValue(new Date('2024-06-10'));

        let reserva3: DeepMockProxy<Reserva> = mockDeep<Reserva>();
        reserva3.getFechaInicio.mockReturnValue(new Date('2024-07-14'));
        reserva3.getFechaFin.mockReturnValue(new Date('2024-07-16'));

        let reservas = [reserva1, reserva2, reserva3];

        let porcentajeOcupacion = generadorReporte.vehiculosOcupados(fechaBusqueda, vehiculos, reservas);

        expect(porcentajeOcupacion).toBe(40); // 2 de 5 vehiculos estan ocupados, lo que es el 40%
    });

});