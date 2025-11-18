import { mockDeep, DeepMockProxy } from "jest-mock-extended";
import GeneradorDeReporte from "../src/reportes/generadorReporte";
import Vehiculo from "../src/vehiculo";
import Reserva from "../src/reserva";

describe("Tests de la clase GeneradorDeReporte", () => {

    let generadorReporte: GeneradorDeReporte;

    // Vehículos mockeados
    let v1: DeepMockProxy<Vehiculo>;
    let v2: DeepMockProxy<Vehiculo>;
    let v3: DeepMockProxy<Vehiculo>;
    let v4: DeepMockProxy<Vehiculo>;
    let v5: DeepMockProxy<Vehiculo>;

    beforeEach(() => {
        generadorReporte = new GeneradorDeReporte();

        v1 = mockDeep<Vehiculo>();
        v2 = mockDeep<Vehiculo>();
        v3 = mockDeep<Vehiculo>();
        v4 = mockDeep<Vehiculo>();
        v5 = mockDeep<Vehiculo>();

  
        v1.getMatricula.mockReturnValue("AAA111");
        v2.getMatricula.mockReturnValue("BBB222");
        v3.getMatricula.mockReturnValue("CCC333");
        v4.getMatricula.mockReturnValue("DDD444");
        v5.getMatricula.mockReturnValue("EEE555");
    });


    it("vehiculosOcupados debe retornar el porcentaje correcto", () => {
        const fechaBusqueda = new Date("2024-07-15");
        const vehiculos = [v1, v2, v3, v4, v5];

        const r1 = mockDeep<Reserva>();
        r1.getFechaInicio.mockReturnValue(new Date("2024-07-10"));
        r1.getFechaFin.mockReturnValue(new Date("2024-07-20"));

        const r2 = mockDeep<Reserva>();
        r2.getFechaInicio.mockReturnValue(new Date("2024-06-01"));
        r2.getFechaFin.mockReturnValue(new Date("2024-06-10"));

        const r3 = mockDeep<Reserva>();
        r3.getFechaInicio.mockReturnValue(new Date("2024-07-14"));
        r3.getFechaFin.mockReturnValue(new Date("2024-07-16"));

        const reservas = [r1, r2, r3];

        const porcentaje = generadorReporte.vehiculosOcupados(
            fechaBusqueda,
            vehiculos,
            reservas
        );

        expect(porcentaje).toBe(40); 
    });

    it("vehiculoMasAlquilado debe retornar el vehículo más alquilado", () => {
        const fi = new Date("2024-07-01");
        const ff = new Date("2024-07-31");

        const r1 = mockDeep<Reserva>();
        r1.getVehiculo.mockReturnValue(v1);
        r1.getFechaInicio.mockReturnValue(new Date("2024-07-03"));
        r1.getFechaFin.mockReturnValue(new Date("2024-07-05"));

        const r2 = mockDeep<Reserva>();
        r2.getVehiculo.mockReturnValue(v1);
        r2.getFechaInicio.mockReturnValue(new Date("2024-07-10"));
        r2.getFechaFin.mockReturnValue(new Date("2024-07-12"));

        const r3 = mockDeep<Reserva>();
        r3.getVehiculo.mockReturnValue(v1);
        r3.getFechaInicio.mockReturnValue(new Date("2024-07-20"));
        r3.getFechaFin.mockReturnValue(new Date("2024-07-25"));

        const r4 = mockDeep<Reserva>();
        r4.getVehiculo.mockReturnValue(v2);
        r4.getFechaInicio.mockReturnValue(new Date("2024-07-08"));
        r4.getFechaFin.mockReturnValue(new Date("2024-07-09"));

        const reservas = [r1, r2, r3, r4];

        const resultado = generadorReporte.vehiculoMasAlquilado(fi, ff, reservas);
        expect(resultado).toBe(v1);
    });

    it("vehiculoMasAlquilado debe lanzar error si no hay reservas activas", () => {
        const fi = new Date("2024-07-01");
        const ff = new Date("2024-07-31");
        const reservas: Reserva[] = [];

        expect(() =>
            generadorReporte.vehiculoMasAlquilado(fi, ff, reservas)
        ).toThrow("No hay vehiculos alquilados en el periodo especificado.");
    });


    it("vehiculoMenosAlquilado debe retornar el vehículo menos alquilado", () => {
        const fi = new Date("2024-07-01");
        const ff = new Date("2024-07-31");

        const r1 = mockDeep<Reserva>();
        r1.getVehiculo.mockReturnValue(v1);
        r1.getFechaInicio.mockReturnValue(new Date("2024-07-05"));
        r1.getFechaFin.mockReturnValue(new Date("2024-07-07"));

        const r2 = mockDeep<Reserva>();
        r2.getVehiculo.mockReturnValue(v1);
        r2.getFechaInicio.mockReturnValue(new Date("2024-07-10"));
        r2.getFechaFin.mockReturnValue(new Date("2024-07-12"));

        const r3 = mockDeep<Reserva>();
        r3.getVehiculo.mockReturnValue(v2);
        r3.getFechaInicio.mockReturnValue(new Date("2024-07-15"));
        r3.getFechaFin.mockReturnValue(new Date("2024-07-16"));

        const reservas = [r1, r2, r3];

        const resultado = generadorReporte.vehiculoMenosAlquilado(fi, ff, reservas);
        expect(resultado).toBe(v2);
    });

    it("vehiculoMenosAlquilado debe lanzar error si no hay reservas activas", () => {
        const fi = new Date("2024-07-01");
        const ff = new Date("2024-07-31");
        const reservas: Reserva[] = [];

        expect(() =>
            generadorReporte.vehiculoMenosAlquilado(fi, ff, reservas)
        ).toThrow("No hay vehiculos alquilados en el periodo especificado.");
    });

    
    it("vehiculoMasRentable debe retornar el vehículo más rentable", () => {
        const mapa = new Map<Vehiculo, number>();
        mapa.set(v1, 200);
        mapa.set(v2, 500);
        mapa.set(v3, 100);

        const resultado = generadorReporte.vehiculoMasRentable(mapa);
        expect(resultado).toBe(v2);
    });

   

    it("vehiculoMenosRentable debe retornar undefined si el mapa está vacío", () => {
        const mapa = new Map<Vehiculo, number>();

        const resultado = generadorReporte.vehiculoMenosRentable(mapa);

        expect(resultado).toBeUndefined();
    });

});
