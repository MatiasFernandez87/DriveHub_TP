import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import GeneradorDeReporte from '../src/reportes/generadorReporte';
import Vehiculo from '../src/vehiculo';
import Reserva from '../src/reserva';

describe ("Test de la clase generadorReporte", () => {

    let generadorReporte = new GeneradorDeReporte();
    let vehiculoMock: DeepMockProxy<Vehiculo> = mockDeep<Vehiculo>();
    let vehiculoMock2: DeepMockProxy<Vehiculo> = mockDeep<Vehiculo>();
    let vehiculoMock3: DeepMockProxy<Vehiculo> = mockDeep<Vehiculo>();
    let vehiculoMock4: DeepMockProxy<Vehiculo> = mockDeep<Vehiculo>();
    let vehiculoMock5: DeepMockProxy<Vehiculo> = mockDeep<Vehiculo>();

    it("Debe ser una instancia de la clase GeneradorDeReporte", () => {
        expect(generadorReporte).toBeInstanceOf(GeneradorDeReporte);
    });

    it("vehiculosOcupados debe retornar el porcentaje correcto de vehiculos ocupados", () => {
        let fechaBusqueda = new Date('2024-07-15');
        let vehiculos = [vehiculoMock, vehiculoMock2, vehiculoMock3, vehiculoMock4, vehiculoMock5];

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

    // ---------------------------------------------------------
    // Tests para vehiculoMasAlquilado
    // ---------------------------------------------------------

    it("vehiculoMasAlquilado debe retornar el vehículo más alquilado en el período", () => {
        const fechaInicio = new Date('2024-07-01');
        const fechaFin = new Date('2024-07-31');

        // vehiculo1: 3 reservas dentro del período
        const r1: DeepMockProxy<Reserva> = mockDeep<Reserva>();
        r1.getVehiculo.mockReturnValue(vehiculoMock);
        r1.getFechaInicio.mockReturnValue(new Date('2024-07-05'));
        r1.getFechaFin.mockReturnValue(new Date('2024-07-10'));

        const r2: DeepMockProxy<Reserva> = mockDeep<Reserva>();
        r2.getVehiculo.mockReturnValue(vehiculoMock);
        r2.getFechaInicio.mockReturnValue(new Date('2024-07-15'));
        r2.getFechaFin.mockReturnValue(new Date('2024-07-18'));

        const r3: DeepMockProxy<Reserva> = mockDeep<Reserva>();
        r3.getVehiculo.mockReturnValue(vehiculoMock);
        r3.getFechaInicio.mockReturnValue(new Date('2024-07-20'));
        r3.getFechaFin.mockReturnValue(new Date('2024-07-22'));

        // vehiculo2: 1 reserva dentro del período
        const r4: DeepMockProxy<Reserva> = mockDeep<Reserva>();
        r4.getVehiculo.mockReturnValue(vehiculoMock2);
        r4.getFechaInicio.mockReturnValue(new Date('2024-07-10'));
        r4.getFechaFin.mockReturnValue(new Date('2024-07-12'));

        // vehiculo3: reserva fuera del período (no debe contarse)
        const r5: DeepMockProxy<Reserva> = mockDeep<Reserva>();
        r5.getVehiculo.mockReturnValue(vehiculoMock3);
        r5.getFechaInicio.mockReturnValue(new Date('2024-06-01'));
        r5.getFechaFin.mockReturnValue(new Date('2024-06-10'));

        const reservas: Reserva[] = [r1, r2, r3, r4, r5];

        const resultado = generadorReporte.vehiculoMasAlquilado(fechaInicio, fechaFin, reservas);

        expect(resultado).toBe(vehiculoMock);
    });

    it("vehiculoMasAlquilado debe lanzar error si no hay vehículos alquilados en el período", () => {
        const fechaInicio = new Date('2024-07-01');
        const fechaFin = new Date('2024-07-31');

        // Reservas fuera del período o directamente sin reservas
        const reservas: Reserva[] = [];

        expect(() =>
            generadorReporte.vehiculoMasAlquilado(fechaInicio, fechaFin, reservas)
        ).toThrow("No hay vehiculos alquilados en el periodo especificado.");
    });

    // ---------------------------------------------------------
    // Tests para vehiculoMenosAlquilado
    // ---------------------------------------------------------

    it("vehiculoMenosAlquilado debe retornar el vehículo menos alquilado en el período", () => {
        const fechaInicio = new Date('2024-07-01');
        const fechaFin = new Date('2024-07-31');

        // vehiculo1: 3 reservas
        const r1: DeepMockProxy<Reserva> = mockDeep<Reserva>();
        r1.getVehiculo.mockReturnValue(vehiculoMock);
        r1.getFechaInicio.mockReturnValue(new Date('2024-07-05'));
        r1.getFechaFin.mockReturnValue(new Date('2024-07-07'));

        const r2: DeepMockProxy<Reserva> = mockDeep<Reserva>();
        r2.getVehiculo.mockReturnValue(vehiculoMock);
        r2.getFechaInicio.mockReturnValue(new Date('2024-07-10'));
        r2.getFechaFin.mockReturnValue(new Date('2024-07-12'));

        const r3: DeepMockProxy<Reserva> = mockDeep<Reserva>();
        r3.getVehiculo.mockReturnValue(vehiculoMock);
        r3.getFechaInicio.mockReturnValue(new Date('2024-07-20'));
        r3.getFechaFin.mockReturnValue(new Date('2024-07-21'));

        // vehiculo2: 1 reserva (este debería ser el menos alquilado)
        const r4: DeepMockProxy<Reserva> = mockDeep<Reserva>();
        r4.getVehiculo.mockReturnValue(vehiculoMock2);
        r4.getFechaInicio.mockReturnValue(new Date('2024-07-15'));
        r4.getFechaFin.mockReturnValue(new Date('2024-07-16'));

        // vehiculo3: 2 reservas
        const r5: DeepMockProxy<Reserva> = mockDeep<Reserva>();
        r5.getVehiculo.mockReturnValue(vehiculoMock3);
        r5.getFechaInicio.mockReturnValue(new Date('2024-07-08'));
        r5.getFechaFin.mockReturnValue(new Date('2024-07-09'));

        const r6: DeepMockProxy<Reserva> = mockDeep<Reserva>();
        r6.getVehiculo.mockReturnValue(vehiculoMock3);
        r6.getFechaInicio.mockReturnValue(new Date('2024-07-18'));
        r6.getFechaFin.mockReturnValue(new Date('2024-07-19'));

        const reservas: Reserva[] = [r1, r2, r3, r4, r5, r6];

        const resultado = generadorReporte.vehiculoMenosAlquilado(fechaInicio, fechaFin, reservas);

        expect(resultado).toBe(vehiculoMock2);
    });

    it("vehiculoMenosAlquilado debe lanzar error si no hay vehículos alquilados en el período", () => {
        const fechaInicio = new Date('2024-07-01');
        const fechaFin = new Date('2024-07-31');

        const reservas: Reserva[] = [];

        expect(() =>
            generadorReporte.vehiculoMenosAlquilado(fechaInicio, fechaFin, reservas)
        ).toThrow("No hay vehiculos alquilados en el periodo especificado.");
    });
});