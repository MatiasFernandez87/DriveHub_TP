import Cliente from "../src/cliente";
import Vehiculo from "../src/vehiculo";
import SistemaDriveHub from "../src/sistema";
import Reserva from "../src/reserva";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import IEstadoVehiculo from "../src/estadosVehiculo/IEstadoVehiculo";
import GeneradorDeReporte from "../src/reportes/generadorReporte";

describe("Tests de la clase SistemaDriveHub", () => {
  let sistema: SistemaDriveHub;
  let vehiculoMock: DeepMockProxy<Vehiculo>
  let clienteMock: DeepMockProxy<Cliente>
  let reservaMock: DeepMockProxy<Reserva>
  let generadorMock: DeepMockProxy<GeneradorDeReporte>

  beforeEach(() => {
    vehiculoMock = mockDeep<Vehiculo>();
    clienteMock = mockDeep<Cliente>();
    reservaMock = mockDeep<Reserva>();
    generadorMock = mockDeep<GeneradorDeReporte>();

    sistema = new SistemaDriveHub();
    sistema.setGeneradorReporte(generadorMock);
  });


  afterEach(() => {
    sistema["reservas"] = [];
  });

  it("Debe ser una instancia de la clase SistemaDriveHub", () => {
    expect(sistema).toBeInstanceOf(SistemaDriveHub);
  });

  it("Debe poder crear una reserva si el vehiculo esta disponible", () => {
    const clienteMock: DeepMockProxy<Cliente> = mockDeep<Cliente>();
    const vehiculoMock: DeepMockProxy<Vehiculo> = mockDeep<Vehiculo>();

    const estadoMock: IEstadoVehiculo = {
      estaEnMantenimiento: jest.fn(),
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
      estaEnMantenimiento: jest.fn(),
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

  it("Debe poder calcular la tarifaFinal de una reserva correctamente", () => {
    reservaMock.getVehiculo.mockReturnValue(vehiculoMock);
    vehiculoMock.calcularTarifa.mockReturnValue(1000);
    reservaMock.getTemporada.mockReturnValue({ calculoPorTemporada: () => 1.2 });
    vehiculoMock.getCostoTotalMantenimiento.mockReturnValue(50);

    const tarifaFinal = sistema.calcularTarifaFinal(reservaMock);

    expect(tarifaFinal).toBe(1200);
    expect(vehiculoMock.necesitaMantenimiento).toHaveBeenCalled();
    const rentabilidadMap = sistema["rentabilidadVehiculos"];
    expect(rentabilidadMap.get(vehiculoMock)).toBe(1150);
  })

  it("Debe poder actualizar la rentabilidad de un vehiculo correctamente", () => {
    sistema["rentabilidadVehiculos"].set(vehiculoMock, 1000);
    const rentabilidadMap = sistema["rentabilidadVehiculos"];
    vehiculoMock.getCostoTotalMantenimiento.mockReturnValue(200);
    sistema["asignarRentabilidad"](vehiculoMock, 500);
    
    expect(rentabilidadMap.get(vehiculoMock)).toBe(1300);
  })
  
  it("Debe llamar al metodo reporteVehiculosOcupados del generador, y devolver el valor correcto del metodo.", () => {
    generadorMock.vehiculosOcupados.mockReturnValue(5);
    const resultado = sistema.reporteVehiculosOcupados(new Date());
    const fechaBusqueda = new Date();

    generadorMock.vehiculosOcupados.calledWith(fechaBusqueda, sistema["vehiculos"], sistema["reservas"])
    expect(resultado).toBe(5);
    expect(generadorMock.vehiculosOcupados).toHaveBeenCalledWith(fechaBusqueda, sistema["vehiculos"], sistema["reservas"]);

  });

  it("Debe llamar al metodo reporteVehiculoMasAlquilado del generador, y devolver el valor correcto del metodo.", () => {
    generadorMock.vehiculoMasAlquilado.mockReturnValue(vehiculoMock);
    const resultado = sistema.reporteVehiculoMasAlquilado(new Date(), new Date());
    expect(generadorMock.vehiculoMasAlquilado).toHaveBeenCalled();
    expect(resultado).toBe(vehiculoMock);
  })

  it("Debe llamar al metodo reporteVehiculoMenosAlquilado del generador, y devolver el valor correcto del metodo.", () => {
    generadorMock.vehiculoMenosAlquilado.mockReturnValue(vehiculoMock);
    const resultado = sistema.reporteVehiculoMenosAlquilado(new Date(), new Date());
    expect(generadorMock.vehiculoMenosAlquilado).toHaveBeenCalled();
    expect(resultado).toBe(vehiculoMock);

  })

  it("Debe llamar al metodo reporteVehiculoMasRentable del generador, y devolver el valor correcto del metodo.", () => {
    generadorMock.vehiculoMasRentable.mockReturnValue(vehiculoMock);
    const resultado = sistema.reporteVehiculoMasRentable();
    expect(generadorMock.vehiculoMasRentable).toHaveBeenCalledWith(sistema["rentabilidadVehiculos"]);
    expect(resultado).toBe(vehiculoMock);

  })
  
  it("Debe llamar al metodo reporteVehiculoMenosRentable del generador, y devolver el valor correcto del metodo.", () => {
    generadorMock.vehiculoMenosRentable.mockReturnValue(vehiculoMock);
    const resultado = sistema.reporteVehiculoMenosRentable();
    expect(generadorMock.vehiculoMenosRentable).toHaveBeenCalledWith(sistema["rentabilidadVehiculos"]);
    expect(resultado).toBe(vehiculoMock);
  })

    it("Debe devolver la lista de vehículos mediante getVehiculos()", () => {
    const vehiculo1 = mockDeep<Vehiculo>();
    const vehiculo2 = mockDeep<Vehiculo>();

    sistema["vehiculos"] = [vehiculo1, vehiculo2];

    const resultado = sistema.getVehiculos();

    expect(resultado).toHaveLength(2);
    expect(resultado).toContain(vehiculo1);
    expect(resultado).toContain(vehiculo2);
    });
  
    it("Debe devolver todas las reservas mediante getReservas()", () => {
    const reserva1 = mockDeep<Reserva>();
    const reserva2 = mockDeep<Reserva>();

    sistema["reservas"] = [reserva1, reserva2];

    const resultado = sistema.getReservas();

    expect(resultado).toHaveLength(2);
    expect(resultado).toContain(reserva1);
    expect(resultado).toContain(reserva2);
    });
  
  
  it("Debe devolver el generador de reportes mediante getGeneradorReporte()", () => {
    const generador = generadorMock
    sistema.setGeneradorReporte(generador);

    const resultado = sistema.getGeneradorReporte();

    expect(resultado).toBe(generador);
  });

    it("Debe permitir reemplazar el generador de reportes mediante setGeneradorReporte()", () => {
    const generador1 = generadorMock;
    const generador2 = mockDeep<GeneradorDeReporte>();

    sistema.setGeneradorReporte(generador1);
    expect(sistema.getGeneradorReporte()).toBe(generador1);

    sistema.setGeneradorReporte(generador2);
    expect(sistema.getGeneradorReporte()).toBe(generador2);
  });

}); 






