import { mockDeep, DeepMockProxy } from "jest-mock-extended";
import Vehiculo from "../src/vehiculo";
import Necesita_Limpieza from "../src/estadosVehiculo/necesita_Limpieza";
import Disponible from "../src/estadosVehiculo/disponible";
import En_Mantenimiento from "../src/estadosVehiculo/en_Mantenimiento";

describe("Estado Necesita_Limpieza", () => {

  let vehiculoMock: DeepMockProxy<Vehiculo>;
  let estado: Necesita_Limpieza;

  beforeEach(() => {
    vehiculoMock = mockDeep<Vehiculo>();
    estado = new Necesita_Limpieza(vehiculoMock);
  });

  test("No está en mantenimiento", () => {
    expect(estado.estaEnMantenimiento()).toBe(false);
  });

  test("No puede alquilar", () => {
    expect(estado.puedeAlquilar()).toBe(false);
  });

  test("Debe lanzar error al intentar asignar alquiler", () => {
    expect(() => estado.asignarAlquiler()).toThrow(
      "El vehículo necesita limpieza y no puede ser alquilado."
    );
  });

  test("Debe pasar a estado Disponible", () => {
    estado.asignarDisponible();

    expect(vehiculoMock.cambiarEstado).toHaveBeenCalledWith(
      expect.any(Disponible)
    );
  });

  test("Debe pasar a estado En_Mantenimiento", () => {
    estado.asignarMantenimiento();

    expect(vehiculoMock.cambiarEstado).toHaveBeenCalledWith(
      expect.any(En_Mantenimiento)
    );
  });

  test("Debe lanzar error al intentar volver a Necesita_Limpieza", () => {
    expect(() => estado.asignarLimpieza()).toThrow(
      "El vehículo ya está en estado de 'Necesita Limpieza'."
    );
  });

});
