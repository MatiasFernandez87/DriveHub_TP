import { mockDeep, DeepMockProxy } from "jest-mock-extended";
import Vehiculo from "../src/vehiculo";
import En_Alquiler from "../src/estadosVehiculo/en_Alquiler";

describe("Estado En_Alquiler - Cobertura completa", () => {

    let vehiculoMock: DeepMockProxy<Vehiculo>;
    let estado!: En_Alquiler; 
    

    beforeEach(() => {
        vehiculoMock = mockDeep<Vehiculo>();

        
        vehiculoMock.cambiarEstado.mockImplementation((nuevoEstado) => {
            vehiculoMock.getEstado.mockReturnValue(nuevoEstado);
        });

        estado = new En_Alquiler(vehiculoMock);
    });

    it("Debe tirar error si se intenta asignarAlquiler()", () => {
        expect(() => estado.asignarAlquiler())
            .toThrow("El vehículo ya está en alquiler.");
    });

    it("Debe cambiar a Disponible", () => {
        estado.asignarDisponible();
        expect(vehiculoMock.getEstado().constructor.name).toBe("Disponible");
    });

    it("Debe cambiar a En_Mantenimiento", () => {
        estado.asignarMantenimiento();
        expect(vehiculoMock.getEstado().constructor.name).toBe("En_Mantenimiento");
    });

    it("Debe cambiar a Necesita_Limpieza", () => {
        estado.asignarLimpieza();
        expect(vehiculoMock.getEstado().constructor.name).toBe("Necesita_Limpieza");
    });

    it("puedeAlquilar debe ser false", () => {
        expect(estado.puedeAlquilar()).toBe(false);
    });

    it("estaEnMantenimiento debe ser false", () => {
        expect(estado.estaEnMantenimiento()).toBe(false);
    });

    it("estaAlquilado debe ser true", () => {
        expect(estado.estaAlquilado()).toBe(true);
    });

});
