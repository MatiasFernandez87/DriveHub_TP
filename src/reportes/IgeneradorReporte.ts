import Reserva from "../reserva";
import Vehiculo from "../vehiculo";

/**
 * Interfaz que define los métodos necesarios para generar distintos
 * reportes estadísticos sobre vehículos y reservas.
 *
 * Implementada por {@link GeneradorDeReporte}.
 */
export default interface IGeneradorReporte {
  /**
   * Obtiene el vehículo más alquilado dentro de un período de tiempo.
   *
   * Solo deben considerarse las reservas que se superponen con el rango
   * definido entre `fechaInicio` y `fechaFin`.
   *
   * @param fechaInicio - Fecha desde la cual comienza el análisis.
   * @param fechaFin - Fecha límite del análisis.
   * @param reserva - Listado de reservas a evaluar.
   * @returns El vehículo con mayor cantidad de alquileres en el período.
   */
  vehiculoMasAlquilado(
    fechaInicio: Date,
    fechaFin: Date,
    reserva: Reserva[]
  ): Vehiculo;

  /**
   * Obtiene el vehículo menos alquilado dentro de un período de tiempo.
   *
   * Solo deben considerarse las reservas que se superponen con el rango
   * definido entre `fechaInicio` y `fechaFin`.
   *
   * @param fechaInicio - Fecha desde la cual comienza el análisis.
   * @param fechaFin - Fecha límite del análisis.
   * @param reserva - Listado de reservas a evaluar.
   * @returns El vehículo con menor cantidad de alquileres en el período.
   */
  vehiculoMenosAlquilado(
    fechaInicio: Date,
    fechaFin: Date,
    reserva: Reserva[]
  ): Vehiculo;

  /**
   * Determina el vehículo más rentable de acuerdo con un mapa de valores numéricos.
   *
   * El mapa debe contener pares `(vehículo → valorDeRentabilidad)`, donde el
   * valor numérico puede representar ingresos generados, margen, beneficio, etc.
   *
   * @param vehiculos - Mapa de vehículos con su valor asociado de rentabilidad.
   * @returns El vehículo con mayor rentabilidad.
   */
  vehiculoMasRentable(vehiculos: Map<Vehiculo, number>): Vehiculo;

  /**
   * Determina el vehículo menos rentable de acuerdo con un mapa de valores numéricos.
   *
   * @param vehiculos - Mapa de vehículos con su valor asociado de rentabilidad.
   * @returns El vehículo con menor rentabilidad.
   */
  vehiculoMenosRentable(vehiculos: Map<Vehiculo, number>): Vehiculo;

  /**
   * Calcula el porcentaje de vehículos ocupados (en alquiler) en una fecha específica.
   *
   * La ocupación se calcula mediante la fórmula:
   * `cantidadDeVehiculosEnAlquiler / totalVehiculos * 100`.
   *
   * @param fechaBusqueda - Fecha para la cual se calcula la ocupación.
   * @param vehiculo - Listado total de vehículos de la flota.
   * @param reserva - Reservas existentes en el sistema.
   * @returns Porcentaje de ocupación entre 0 y 100.
   */
  vehiculosOcupados(
    fechaBusqueda: Date,
    vehiculo: Vehiculo[],
    reserva: Reserva[]
  ): number;
}
