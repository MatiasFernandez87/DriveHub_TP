import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import Cliente from "../src/cliente";
import Reserva from "../src/reserva";
import SistemaDriveHub from "../src/sistema";
import Vehiculo from "../src/vehiculo";

describe("Test de la clase cliente", () => {
  let sistemaMock: DeepMockProxy<SistemaDriveHub> = mockDeep<SistemaDriveHub>();
  let cliente = new Cliente("Max", "Verstappen", sistemaMock);
  let vehiculoMock: DeepMockProxy<Vehiculo> = mockDeep<Vehiculo>();

  it("Debe ser una instancia de la clase Cliente", () => {
    expect(cliente).toBeInstanceOf(Cliente);
  });

  it("Debe tener nombre y apellido asignados", () => {
    expect(cliente.getNombre()).toBe("Max");
    expect(cliente.getApellido()).toBe("Verstappen");
  });

  it("Debe llamar al metodo crearReserva del sistema", () => {
    let fechaInicio = new Date();
    let fechaFin = new Date();
    cliente.solicitarReserva(vehiculoMock, fechaInicio, fechaFin);

    expect(sistemaMock.crearReserva).toHaveBeenCalledWith(cliente,vehiculoMock,fechaInicio,fechaFin);
  });

  it("Debe manejar el vehiculo y registrar los kilometros recorridos", () => {
    let reservaMock: DeepMockProxy<Reserva> = mockDeep<Reserva>();
    cliente.setReserva(reservaMock);

    let dia = new Date();
    cliente.manejar(150, dia);

    expect(reservaMock.registrarUsoVehiculo).toHaveBeenCalledWith(150, dia);
  });
});
