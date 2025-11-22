import Vehiculo from "./vehiculo";
import Cliente from "./cliente";
import Reserva from "./reserva";
import IGeneradorReporte from "./reportes/IgeneradorReporte";
import GeneradorDeReporte from "./reportes/generadorReporte";
import GestorTemporada from "./temporadas/gestorTemporada";

/**
 * Sistema principal de DriveHub.
 *
 * Se encarga de gestionar vehículos, clientes, reservas
 * y de generar reportes basados en dichos datos.
 */
export default class SistemaDriveHub {

  /** Lista completa de vehículos registrados en el sistema. */
  private vehiculos: Vehiculo[] = [];

  /** Clientes cargados en el sistema. */
  private clientes: Cliente[] = [];

  /** Reservas creadas por los clientes. */
  private reservas: Reserva[] = [];

  /** Generador de reportes utilizado por el sistema. */
  private generadorReporte: IGeneradorReporte = new GeneradorDeReporte();

  /**
   * Mapa de rentabilidad acumulada por vehículo.
   * La clave es el vehículo y el valor es su ganancia actual.
   */
  private rentabilidadVehiculos: Map<Vehiculo, number> = new Map();



  /**
   * Crea una nueva reserva si el vehículo está disponible.
   *
   * @param cliente - Cliente que realiza la reserva.
   * @param vehiculo - Vehículo a reservar.
   * @param fechaInicio - Fecha de inicio de la reserva.
   * @param fechaFin - Fecha de fin de la reserva.
   * @throws Error Si el vehículo no está disponible para alquilar.
   */
  public crearReserva(cliente: Cliente, vehiculo: Vehiculo, fechaInicio: Date, fechaFin: Date) {
    if (vehiculo.getEstado().puedeAlquilar()) {
      let reserva = new Reserva(vehiculo, cliente, fechaInicio, fechaFin, GestorTemporada.asignarTemporadaMedia());
      this.reservas.push(reserva);
      vehiculo.alquilar();
      cliente.setReserva(reserva);
    } else {
      throw new Error("El vehiculo no esta disponible.");
    }
  }

  /**
   * Calcula la tarifa final de una reserva considerando
   * base, temporada y mantenimiento del vehículo.
   *
   * @param reserva - Reserva a calcular.
   * @returns Tarifa final aplicada.
   */
  public calcularTarifaFinal(reserva: Reserva): number {
    const vehiculo = reserva.getVehiculo();
    const tarifaBase = vehiculo.calcularTarifa(reserva);
    const porcentajeTemporada = reserva.getTemporada().calculoPorTemporada();
    const tarifaFinal = tarifaBase * porcentajeTemporada;

    vehiculo.necesitaMantenimiento();
    this.asignarRentabilidad(vehiculo, tarifaFinal);

    return tarifaFinal;
  }

  /**
   * Asigna y actualiza la rentabilidad de un vehículo.
   *
   * @param vehiculo - Vehículo al que se asigna la rentabilidad.
   * @param tarifaFinal - Importe generado por la reserva.
   * @private
   */
  private asignarRentabilidad(vehiculo: Vehiculo, tarifaFinal: number) {
    const rentabilidadActual = this.rentabilidadVehiculos.get(vehiculo) ?? 0;
    this.rentabilidadVehiculos.set(vehiculo, (rentabilidadActual + tarifaFinal) - vehiculo.getCostoTotalMantenimiento());
  }

  /**
   * Genera un reporte con la cantidad de vehículos ocupados en una fecha específica.
   *
   * @param fechaBusqueda - Fecha a consultar.
   * @returns Cantidad de vehículos ocupados.
   */
  public reporteVehiculosOcupados(fechaBusqueda: Date): number {
    const ocupados = this.generadorReporte.vehiculosOcupados(
      fechaBusqueda,
      this.vehiculos,
      this.reservas
    );
    return ocupados;
  }

  /**
   * Reporte del vehículo más alquilado en un rango de fechas.
   *
   * @param fechaInicio - Desde qué fecha consultar.
   * @param fechaFin - Hasta qué fecha consultar.
   * @returns Vehículo más alquilado.
   */
  public reporteVehiculoMasAlquilado(fechaInicio: Date, fechaFin: Date): Vehiculo {
    const vehiculoMasAlquilado = this.generadorReporte.vehiculoMasAlquilado(
      fechaInicio,
      fechaFin,
      this.reservas
    );
    return vehiculoMasAlquilado;
  }

  /**
   * Reporte del vehículo menos alquilado en un rango de fechas.
   *
   * @param fechaInicio - Fecha inicial del análisis.
   * @param fechaFin - Fecha final del análisis.
   * @returns Vehículo menos alquilado.
   */
  public reporteVehiculoMenosAlquilado(fechaInicio: Date, fechaFin: Date): Vehiculo {
    const vehiculoMenosAlquilado = this.generadorReporte.vehiculoMenosAlquilado(
      fechaInicio,
      fechaFin,
      this.reservas
    );
    return vehiculoMenosAlquilado;
  }

  /**
   * Obtiene el vehículo con mayor rentabilidad.
   *
   * @returns Vehículo más rentable.
   */
  public reporteVehiculoMasRentable(): Vehiculo {
    const vehiculoMasRentable = this.generadorReporte.vehiculoMasRentable(
      this.rentabilidadVehiculos
    );
    return vehiculoMasRentable;
  }

  /**
   * Obtiene el vehículo con menor rentabilidad.
   *
   * @returns Vehículo menos rentable.
   */
  public reporteVehiculoMenosRentable(): Vehiculo {
    const vehiculoMenosRentable = this.generadorReporte.vehiculoMenosRentable(
      this.rentabilidadVehiculos
    );
    return vehiculoMenosRentable;
  }

  /**
   * Devuelve la lista de vehículos cargados.
   *
   * @returns Arreglo de vehículos.
   */
  public getVehiculos(): Vehiculo[] {
    return this.vehiculos;
  }

  /**
   * Devuelve la lista de clientes cargados.
   *
   * @returns Arreglo de clientes.
   */
  public getClientes(): Cliente[] {
    return this.clientes;
  }

  /**
   * Devuelve todas las reservas existentes.
   *
   * @returns Arreglo de reservas.
   */
  public getReservas(): Reserva[] {
    return this.reservas;
  }

  /**
   * Obtiene el generador de reportes configurado.
   *
   * @returns Instancia del generador de reportes.
   */
  public getGeneradorReporte(): IGeneradorReporte {
    return this.generadorReporte;
  }

  /**
   * Permite sustituir el generador de reportes.
   *
   * @param generadorReporte - Nuevo generador que implementa la interfaz.
   */
  public setGeneradorReporte(generadorReporte: IGeneradorReporte): void {
    this.generadorReporte = generadorReporte;
  }
}
