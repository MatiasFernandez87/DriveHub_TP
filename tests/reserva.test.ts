import Cliente from "../src/cliente";
import { ESTADO_RESERVA } from "../src/enums/estado_Reserva";
import Reserva from "../src/reserva";
import TemporadaAlta from "../src/temporadas/temporada_alta";
import TemporadaBaja from "../src/temporadas/temporada_baja";
import TemporadaMedia from "../src/temporadas/temporada_media";
import Vehiculo from "../src/vehiculo";
import {DeepMockProxy, mockDeep} from "jest-mock-extended";


describe("Test clase Reserva", () => {
        let vehiculoMock: DeepMockProxy<Vehiculo> = mockDeep<Vehiculo>();
        let clienteMock: DeepMockProxy<Cliente> = mockDeep<Cliente>();
        let fechaInicio = new Date("2025-02-10");
        let fechaFin = new Date("2025-02-15");
        let reserva = new Reserva(vehiculoMock, clienteMock, fechaInicio, fechaFin);
        
        afterEach(() => {
            reserva = new Reserva(vehiculoMock, clienteMock, fechaInicio, fechaFin);
        });

    it("Debe registrar los km hechos al total del vehiculo", () => {

        reserva.registrarUsoVehiculo(150, new Date());
        reserva.registrarUsoVehiculo(150, new Date());
        reserva.registrarUsoVehiculo(150, new Date());

        expect(vehiculoMock.getKilometraje.mockReturnValue(450));
        
    });

    it("getIdReserva devuelve un número", () => {
        expect(typeof reserva.getIdReserva()).toBe("number");
    });

    it("getEstado devuelve el estado EN_CURSO", () => {
        expect(reserva.getEstado()).toBe(ESTADO_RESERVA.EN_CURSO);
    });

    it("getCliente devuelve el cliente asociado", () => {
        expect(reserva.getCliente()).toBe(clienteMock);
    });

    it("getVehiculo devuelve el vehículo asociado", () => {
        expect(reserva.getVehiculo()).toBe(vehiculoMock);
    });

    it("getKmRecorridos debe contener la cantidad exacta", () => {
        reserva.registrarUsoVehiculo(150, new Date());
        reserva.registrarUsoVehiculo(150, new Date());
        reserva.registrarUsoVehiculo(150, new Date());
        expect(reserva.getKmRecorridos().size).toBe(3);
    });

    it("getTemporada devuelve una instancia de TemporadaAlta para Enero", () => {
        expect(reserva.getTemporada()).toBeInstanceOf(TemporadaAlta);
    });

    it("getTemporada devuelve una instancia de TemporadaMedia para Septiembre", () => {
        fechaInicio = new Date("2025-12-01");
        fechaFin = new Date("2025-12-02");
        reserva = new Reserva(vehiculoMock, clienteMock, fechaInicio, fechaFin);
        expect(reserva.getTemporada()).toBeInstanceOf(TemporadaMedia);
    });

    it("getTemporada devuelve una instancia de TemporadaBaja para Abril", () => {
        fechaInicio = new Date("2025-04-02");
        fechaFin = new Date("2025-04-05");
        reserva = new Reserva(vehiculoMock, clienteMock, fechaInicio, fechaFin);
        expect(reserva.getTemporada()).toBeInstanceOf(TemporadaBaja);
    });
});