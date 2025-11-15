import Cliente from "../src/cliente";
import Vehiculo from "../src/vehiculo";
import SistemaDriveHub from "../src/sistema";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import IEstadoVehiculo from "../src/estadosVehiculo/IEstadoVehiculo";

describe("Tests de la clase SistemaDriveHub", () => {
  let sistema = new SistemaDriveHub();

  afterEach(() => {
    sistema["reservas"] = [];
    sistema["mantenimientos"] = [];
  });

  it("Debe ser una instancia de la clase SistemaDriveHub", () => {
    expect(sistema).toBeInstanceOf(SistemaDriveHub);
  });

  it("Debe poder crear una reserva si el vehiculo esta disponible", () => {
const clienteMock = mockDeep<Cliente>();
const vehiculoMock = mockDeep<Vehiculo>();

const estadoMock: IEstadoVehiculo = {
  puedeAlquilar: jest.fn().mockReturnValue(true),
  asignarAlquiler: jest.fn(),
  asignarDisponible: jest.fn(),
  asignarMantenimiento: jest.fn(),
  asignarLimpieza: jest.fn(),
};

vehiculoMock.getEstado.mockReturnValue(estadoMock);

   sistema.crearReserva(
     clienteMock,
     vehiculoMock,
     new Date(2025, 1, 1),
     new Date(2025, 1, 5)
   );

   expect(sistema["reservas"]).toHaveLength(1);
});


  it("No debe poder crear una reserva si el vehiculo no esta disponible", () => {
    const clienteMock: DeepMockProxy<Cliente> = mockDeep<Cliente>();
    const vehiculoMock: DeepMockProxy<Vehiculo> = mockDeep<Vehiculo>();

    const estadoMock: IEstadoVehiculo = {
      puedeAlquilar: jest.fn().mockReturnValue(false),
      asignarAlquiler: jest.fn(),
      asignarDisponible: jest.fn(),
      asignarMantenimiento: jest.fn(),
      asignarLimpieza: jest.fn(),
    };

    vehiculoMock.getEstado.mockReturnValue(estadoMock);

    expect(() => sistema.crearReserva(clienteMock, vehiculoMock, new Date(2025, 1, 1), new Date(2025, 1, 5))).toThrow("El vehiculo no esta disponible.");
    expect(sistema["reservas"]).toHaveLength(0);
  });
});
