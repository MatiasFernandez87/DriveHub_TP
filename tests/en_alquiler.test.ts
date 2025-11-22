import { mockDeep, DeepMockProxy } from "jest-mock-extended";
import Vehiculo from "../src/vehiculo";
import En_Alquiler from "../src/estadosVehiculo/en_Alquiler";
import Disponible from "../src/estadosVehiculo/disponible";
import En_Mantenimiento from "../src/estadosVehiculo/en_Mantenimiento";
import Necesita_Limpieza from "../src/estadosVehiculo/necesita_Limpieza";

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

    it("Debe cambiar a En_Mantenimiento", () => {
        estado.asignarMantenimiento();
        expect(vehiculoMock.getEstado()).toBeInstanceOf(En_Mantenimiento);
    });

    it("Debe cambiar a Necesita_Limpieza", () => {
        estado.asignarLimpieza();
        expect(vehiculoMock.getEstado()).toBeInstanceOf(Necesita_Limpieza);
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
