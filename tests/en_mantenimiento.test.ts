import { mockDeep, DeepMockProxy } from "jest-mock-extended";
import Vehiculo from "../src/vehiculo";
import En_Mantenimiento from "../src/estadosVehiculo/en_Mantenimiento";

describe("Estado En_Mantenimiento (con mocks)", () => {

    let vehiculoMock: DeepMockProxy<Vehiculo>;
    let estado: En_Mantenimiento;

    beforeEach(() => {
        vehiculoMock = mockDeep<Vehiculo>();

        
        vehiculoMock.cambiarEstado.mockImplementation((nuevoEstado) => {
            vehiculoMock.getEstado.mockReturnValue(nuevoEstado);
        });

        estado = new En_Mantenimiento(vehiculoMock);
    });

    it("estaEnMantenimiento() debe devolver true", () => {
        expect(estado.estaEnMantenimiento()).toBe(true);
    });

    it("Debe tirar error si se intenta asignarAlquiler()", () => {
        expect(() => estado.asignarAlquiler())
            .toThrow("El vehículo está en mantenimiento y no puede ser alquilado.");
    });

    it("Debe tirar error si se intenta asignarMantenimiento() nuevamente", () => {
        expect(() => estado.asignarMantenimiento())
            .toThrow("El vehículo ya está en mantenimiento.");
    });

    it("Debe cambiar a Disponible con asignarDisponible()", () => {
        estado.asignarDisponible();

        expect(vehiculoMock.getEstado().constructor.name)
            .toBe("Disponible");
    });

    it("Debe cambiar a Necesita_Limpieza con asignarLimpieza()", () => {
        estado.asignarLimpieza();

        expect(vehiculoMock.getEstado().constructor.name)
            .toBe("Necesita_Limpieza");
    });

    it("puedeAlquilar() debe devolver false", () => {
        expect(estado.puedeAlquilar()).toBe(false);
    });

});
