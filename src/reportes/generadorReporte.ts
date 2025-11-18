import Vehiculo from "../vehiculo";
import Reserva from "../reserva";
import IGeneradorReporte from "./IgeneradorReporte";
import moment from "moment";

/**
 * Genera distintos reportes estadísticos a partir de vehículos y reservas.
 * Implementa la interfaz {@link IGeneradorReporte}.
 */
export default class GeneradorDeReporte implements IGeneradorReporte {
  /**
   * Crea una nueva instancia de GeneradorDeReporte.
   */
  constructor() {}

  /**
   * Obtiene el vehículo más alquilado dentro de un período de tiempo.
   *
   * Solo se consideran las reservas que se superponen con el rango
   * `[fechaInicio, fechaFin]`.
   *
   * @param fechaInicio - Fecha desde la cual se empieza a analizar.
   * @param fechaFin - Fecha hasta la cual se analiza.
   * @param reservas - Listado de reservas a evaluar.
   * @returns El vehículo con mayor cantidad de alquileres en el período.
   * @throws Si no hay vehículos alquilados en el período especificado.
   */
  public vehiculoMasAlquilado(
    fechaInicio: Date,
    fechaFin: Date,
    reservas: Reserva[]
  ): Vehiculo {
    const vehiculosAlquilados = new Map<Vehiculo, number>();
    let masAlquilado: Vehiculo = undefined as unknown as Vehiculo;
    let max = 0;

    const reservasActivas = reservas.filter(
      (r) =>
        moment(fechaInicio).isBefore(r.getFechaFin()) &&
        moment(fechaFin).isAfter(r.getFechaInicio())
    );

    reservasActivas.forEach((r) => {
      const vehiculo = r.getVehiculo();
      const cantAlquiler = vehiculosAlquilados.get(vehiculo) ?? 0;
      vehiculosAlquilados.set(vehiculo, cantAlquiler + 1);
    });

    if (vehiculosAlquilados.size === 0) {
      throw new Error("No hay vehiculos alquilados en el periodo especificado.");
    }

    vehiculosAlquilados.forEach((cantidad, v) => {
      if (cantidad > max) {
        max = cantidad;
        masAlquilado = v;
      }
    });

    return masAlquilado;
  }

  /**
   * Obtiene el vehículo menos alquilado dentro de un período de tiempo.
   *
   * Solo se consideran las reservas que se superponen con el rango
   * `[fechaInicio, fechaFin]`.
   *
   * @param fechaInicio - Fecha desde la cual se empieza a analizar.
   * @param fechaFin - Fecha hasta la cual se analiza.
   * @param reservas - Listado de reservas a evaluar.
   * @returns El vehículo con menor cantidad de alquileres en el período.
   * @throws Si no hay vehículos alquilados en el período especificado.
   */
  public vehiculoMenosAlquilado(
    fechaInicio: Date,
    fechaFin: Date,
    reservas: Reserva[]
  ): Vehiculo {
    const vehiculosAlquilados = new Map<Vehiculo, number>();
    let min = Infinity;
    let menosAlquilado: Vehiculo = undefined as unknown as Vehiculo;

    const reservasActivas = reservas.filter(
      (r) =>
        moment(fechaInicio).isBefore(r.getFechaFin()) &&
        moment(fechaFin).isAfter(r.getFechaInicio())
    );

    reservasActivas.forEach((r) => {
      const vehiculo = r.getVehiculo();
      const cantAlquiler = vehiculosAlquilados.get(vehiculo) ?? 0;
      vehiculosAlquilados.set(vehiculo, cantAlquiler + 1);
    });

    if (vehiculosAlquilados.size === 0) {
      throw new Error("No hay vehiculos alquilados en el periodo especificado.");
    }

    vehiculosAlquilados.forEach((cantidad, v) => {
      if (cantidad < min) {
        min = cantidad;
        menosAlquilado = v;
      }
    });

    return menosAlquilado;
  }

  /**
   * Obtiene el vehículo más rentable según una métrica de rentabilidad.
   *
   * El mapa recibido debe contener pares `(vehículo → valorDeRentabilidad)`,
   * donde el valor numérico representa, por ejemplo, ingresos generados,
   * margen, etc.
   *
   * @param vehiculos - Mapa de vehículos con su valor de rentabilidad.
   * @returns El vehículo con mayor rentabilidad.
   */
  public vehiculoMasRentable(vehiculos: Map<Vehiculo, number>): Vehiculo {
    let masRentable: Vehiculo = undefined as unknown as Vehiculo;
    let max = -Infinity;

    vehiculos.forEach((rentabilidad, v) => {
      if (rentabilidad > max) {
        max = rentabilidad;
        masRentable = v;
      }
    });

    return masRentable;
  }

  /**
   * Obtiene el vehículo menos rentable según una métrica de rentabilidad.
   *
   * El mapa recibido debe contener pares `(vehículo → valorDeRentabilidad)`.
   *
   * @param vehiculos - Mapa de vehículos con su valor de rentabilidad.
   * @returns El vehículo con menor rentabilidad.
   */
  public vehiculoMenosRentable(vehiculos: Map<Vehiculo, number>): Vehiculo {
    let menosRentable: Vehiculo = undefined as unknown as Vehiculo;
    let min = -Infinity;

    vehiculos.forEach((rentabilidad, v) => {
      if (rentabilidad < min) {
        min = rentabilidad;
        menosRentable = v;
      }
    });

    return menosRentable;
  }

  /**
   * Calcula el porcentaje de vehículos ocupados (en alquiler) en una fecha determinada.
   *
   * La ocupación se calcula como:
   * `cantidadVehiculosEnAlquiler / totalVehiculos * 100`.
   *
   * @param fechaBusqueda - Fecha en la que se quiere consultar la ocupación.
   * @param vehiculo - Listado total de vehículos de la flota.
   * @param reserva - Listado de reservas existentes.
   * @returns Porcentaje de vehículos ocupados en esa fecha (0–100).
   */
  public vehiculosOcupados(
    fechaBusqueda: Date,
    vehiculo: Vehiculo[],
    reserva: Reserva[]
  ): number {
    const totalVehiculos = vehiculo.length;
    let enAlquiler = 0;

    const reservasActivas = reserva.filter(r =>
      moment(fechaBusqueda).isBetween(r.getFechaInicio(), r.getFechaFin())
    );

    enAlquiler = reservasActivas.length;

    return (enAlquiler / totalVehiculos) * 100;
  }
}
