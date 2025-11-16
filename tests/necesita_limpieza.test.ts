import { mockDeep, DeepMockProxy } from "jest-mock-extended";
import Vehiculo from "../src/vehiculo";
import En_Alquiler from "../src/estadosVehiculo/en_Alquiler";
import Disponible from "../src/estadosVehiculo/disponible";
import En_Mantenimiento from "../src/estadosVehiculo/en_Mantenimiento";
import Necesita_Limpieza from "../src/estadosVehiculo/necesita_Limpieza";

describe("Tests del estado En_Alquiler", () => {

    let vehiculoMock: DeepMockProxy<Vehiculo>;
    let estado: En_Alquiler;

    beforeEach(() => {
        vehiculoMock = mockDeep<Vehiculo>();
        estado = new En_Alquiler(vehiculoMock);
    });

    

    it("estaEnMantenimiento() debe devolver false", () => {
        expect(estado.estaEnMantenimiento()).toBe(false);
    });

    it("puedeAlquilar() debe devolver false", () => {
        expect(estado.puedeAlquilar()).toBe(false);
    });

    it("estaAlquilado() debe devolver true", () => {
        expect(estado.estaAlquilado()).toBe(true);
    });


    it("Debe lanzar error al intentar asignarAlquiler() nuevamente", () => {
        expect(() => estado.asignarAlquiler()).toThrow(
            "El vehículo ya está en alquiler."
        );
    });

   

    it("Debe cambiar el estado a Disponible al ejecutar asignarDisponible()", () => {
        estado.asignarDisponible();
        expect(vehiculoMock.cambiarEstado).toHaveBeenCalled();
        expect(vehiculoMock.cambiarEstado.mock.calls[0][0]).toBeInstanceOf(Disponible);
    });

    it("Debe cambiar el estado a En_Mantenimiento al ejecutar asignarMantenimiento()", () => {
        estado.asignarMantenimiento();
        expect(vehiculoMock.cambiarEstado).toHaveBeenCalled();
        expect(vehiculoMock.cambiarEstado.mock.calls[0][0]).toBeInstanceOf(En_Mantenimiento);
    });

    it("Debe cambiar el estado a Necesita_Limpieza al ejecutar asignarLimpieza()", () => {
        estado.asignarLimpieza();
        expect(vehiculoMock.cambiarEstado).toHaveBeenCalled();
        expect(vehiculoMock.cambiarEstado.mock.calls[0][0]).toBeInstanceOf(Necesita_Limpieza);
    });

});
