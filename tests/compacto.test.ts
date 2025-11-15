import Compacto from "../src/compacto";
import Reserva from "../src/reserva";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";

describe("Tests de la clase Compacto", () => {
  let compacto: Compacto;

  beforeEach(() => {
    compacto = new Compacto("ABC123", 0);
  });

  it("Debe ser una instancia de la clase Compacto", () => {
    expect(compacto).toBeInstanceOf(Compacto);
  });

  it("Debe calcular la tarifa correctamente sin km extra", () => {
    const reservaMock: DeepMockProxy<Reserva> = mockDeep<Reserva>();

    reservaMock.getKmRecorridos.mockReturnValue(
      new Map<Date, number>([
        [new Date(2025, 1, 1), 80],
        [new Date(2025, 1, 2), 90],
      ])
    );

    expect(compacto.calcularTarifa(reservaMock)).toBe(60);
  });
  it("Debe calcular la tarifa correctamente con km extra", () => {
    const reservaMock: DeepMockProxy<Reserva> = mockDeep<Reserva>();
    reservaMock.getKmRecorridos.mockReturnValue(
      new Map<Date, number>([
        [new Date(2025, 1, 1), 120],
        [new Date(2025, 1, 2), 150],
      ])
    );

    expect(compacto.calcularTarifa(reservaMock)).toBe(70.5);
  });

  it("Debe poder sumar km correctamente al historial del vehiculo y devolverlo", () => {
    let kilometraje = 0;
    compacto.setKilometraje(kilometraje);

    compacto.actualizarKilometraje(200);
    expect(compacto.getKilometraje()).toBe(200);
  });

  it("Debe setear una matricula correctamente y devolverla", () => {
    compacto.setMatricula("XYZ789");
    expect(compacto.getMatricula()).toBe("XYZ789");
  });

  it("Debe setear una tarifa base correctamente y devolverlo", () => {
    compacto.setTarifaBase(80);
    expect(compacto.getTarifaBase()).toBe(80);
  });

  it("Debe setear un cargo extra correctamente y devolverlo", () => {
    compacto.setCargoExtra(15);
    expect(compacto.getCargoExtra()).toBe(15);
  });

  it("Debe setear el kilometraje correctamente y devolverlo", () => {
    compacto.setKilometraje(5000);
    expect(compacto.getKilometraje()).toBe(5000);
  });

  it("Debe devolver el estado del vehiculo 'disponible' ", () => {
    expect(compacto.getEstado().constructor.name).toBe("Disponible");
  });

  it("Debe cambiar el estado del vehiculo a 'enMantenimiento' ", () => {
    compacto.enviarAMantenimiento(new Date());
    expect(compacto.getEstado().constructor.name).toBe("En_Mantenimiento");   
  });

  it("Debe cambiar el estado del vehiculo a 'necesitaLimpieza' ", () => {
    compacto.limpiar();
    expect(compacto.getEstado().constructor.name).toBe("Necesita_Limpieza");
  });

  it("Debe cambiar el estado del vehiculo a 'alquilar' ", () => {
    compacto.alquilar();
    expect(compacto.getEstado().constructor.name).toBe("En_Alquiler");
  });

  it("puedeaAlquilar debe devolver true si el vehiculo esta disponible", () => {
    expect(compacto.getEstado().puedeAlquilar()).toBe(true);
  });

  it("puedeaAlquilar debe devolver false si el vehiculo no esta disponible", () => {
    compacto.enviarAMantenimiento(new Date);
    expect(compacto.getEstado().puedeAlquilar()).toBe(false);
  });
});
