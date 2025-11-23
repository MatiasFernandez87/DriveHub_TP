import Cliente from "../src/cliente";
import Reserva from "../src/reserva";
import GestorTemporada from "../src/temporadas/gestorTemporada";
import TemporadaAlta from "../src/temporadas/temporada_alta";
import TemporadaBaja from "../src/temporadas/temporada_baja";
import TemporadaMedia from "../src/temporadas/temporada_media";
import Vehiculo from "../src/vehiculo";
import {DeepMockProxy, mockDeep} from "jest-mock-extended";


describe("Test clase Reserva", () => {
        let vehiculoMock: DeepMockProxy<Vehiculo> = mockDeep<Vehiculo>();
        let clienteMock: DeepMockProxy<Cliente> = mockDeep<Cliente>();
        let fechaInicio = new Date("2025-11-10");
        let fechaFin = new Date("2025-11-20");
        let temporada = GestorTemporada.asignarTemporadaMedia()
        let reserva = new Reserva(vehiculoMock, clienteMock, fechaInicio, fechaFin, temporada);
        
        afterEach(() => {
            reserva = new Reserva(vehiculoMock, clienteMock, fechaInicio, fechaFin, temporada);
        });

    it("Debe registrar los km hechos al total del vehiculo", () => {

        reserva.registrarUsoVehiculo(150, new Date("2025-11-11"));
        reserva.registrarUsoVehiculo(150, new Date("2025-11-12"));
        reserva.registrarUsoVehiculo(150, new Date("2025-11-13"));

        expect(vehiculoMock.getKilometraje.mockReturnValue(450));
        
    });

    it("getIdReserva devuelve un número", () => {
        expect(typeof reserva.getIdReserva()).toBe("number");
    });

    it("getCliente devuelve el cliente asociado", () => {
        expect(reserva.getCliente()).toBe(clienteMock);
    });

    it("getVehiculo devuelve el vehículo asociado", () => {
        expect(reserva.getVehiculo()).toBe(vehiculoMock);
    });

    it("getFechaInicio devuelve la fecha de inicio correcta", () => {
        expect(reserva.getFechaInicio()).toBe(fechaInicio);
    });

    it("getFechaFin devuelve la fecha de fin correcta", () => {
        expect(reserva.getFechaFin()).toEqual(fechaFin);
    });

    it("getKmRecorridos debe contener la cantidad exacta", () => {
        reserva.registrarUsoVehiculo(150, new Date("2025-11-11"));
        reserva.registrarUsoVehiculo(150, new Date("2025-11-12"));
        reserva.registrarUsoVehiculo(150, new Date("2025-11-13"));
        expect(reserva.getKmRecorridos().size).toBe(3);
    });

    it("getTemporada devuelve una instancia de TemporadaMedia para Noviembre", () => {
        temporada = GestorTemporada.asignarTemporadaMedia();
        reserva = new Reserva(vehiculoMock, clienteMock, fechaInicio, fechaFin, temporada);
        expect(reserva.getTemporada()).toBeInstanceOf(TemporadaMedia);
    });

    it("getTemporada devuelve una instancia de TemporadaAlta para Enero", () => {
        temporada = GestorTemporada.asignarTemporadaAlta();
        reserva = new Reserva(vehiculoMock, clienteMock, fechaInicio, fechaFin, temporada);
        expect(reserva.getTemporada()).toBeInstanceOf(TemporadaAlta);
    });

    it("getTemporada devuelve una instancia de TemporadaBaja para Abril", () => {
        temporada = GestorTemporada.asignarTemporadaBaja();
        reserva = new Reserva(vehiculoMock, clienteMock, fechaInicio, fechaFin, temporada);
        expect(reserva.getTemporada()).toBeInstanceOf(TemporadaBaja);
    });

    
});