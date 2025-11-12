import Mantenimiento from "../src/mantenimiento";
import Vehiculo from "../src/vehiculo";
import { DeepMockProxy, mock, mockDeep } from "jest-mock-extended";

describe("Test clase Mantenimiento", () => {

    let vehiculoMock: DeepMockProxy<Vehiculo> = mockDeep<Vehiculo>();

    let mantenimiento: Mantenimiento;

    beforeEach(() => {
        mantenimiento = new Mantenimiento(
            vehiculoMock,
            new Date("2024-01-01"),
            5000
        );
    });

    it("getVehiculo devuelve el vehículo correcto", () => {
        expect(mantenimiento.getVehiculo()).toBe(vehiculoMock);
    });

    it("setVehiculo asigna un nuevo vehículo", () => {
        mantenimiento.setVehiculo(vehiculoMock);
        expect(mantenimiento.getVehiculo()).toBe(vehiculoMock);
    })

    it("getFecha devuelve la fecha correcta", () => {
        const fecha = new Date("2024-01-01");
        expect(mantenimiento.getFecha()).toEqual(fecha);
    });

    it("setFecha asigna una nueva fecha", () => {
        const nuevaFecha = new Date("2025-05-15");
        mantenimiento.setFecha(nuevaFecha);
        expect(mantenimiento.getFecha()).toEqual(nuevaFecha);
    });     

    it("getCosto devuelve el costo correcto", () => {
        expect(mantenimiento.getCosto()).toBe(5000);
    });

    it("setCosto asigna un nuevo costo", () => {
        mantenimiento.setCosto(7500);
        expect(mantenimiento.getCosto()).toBe(7500);
    }); 

    it("Debe ser una instancia de la clase Mantenimiento", () => {
        expect(mantenimiento).toBeInstanceOf(Mantenimiento);
    });

});