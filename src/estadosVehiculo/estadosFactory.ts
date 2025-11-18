import En_Alquiler from "../estadosVehiculo/en_Alquiler";
import Disponible from "../estadosVehiculo/disponible";
import En_Mantenimiento from "../estadosVehiculo/en_Mantenimiento";
import Necesita_Limpieza from "../estadosVehiculo/necesita_Limpieza";
import Vehiculo from "../vehiculo";

/**
 * Fábrica de estados para vehículos.
 *
 * Implementa el patrón **Factory Method**, permitiendo crear instancias
 * de los distintos estados posibles de un vehículo:
 * - Disponible
 * - En alquiler
 * - En mantenimiento
 * - Necesita limpieza
 *
 * Cada método genera un nuevo estado asociado a un vehículo específico.
 */
export default class EstadoFactory {

    /**
     * Crea una instancia del estado **Disponible** para un vehículo.
     *
     * @param vehiculo - Vehículo al que se asignará el estado.
     * @returns Instancia del estado `Disponible`.
     *
     * @example
     * ```ts
     * const estado = EstadoFactory.crearDisponible(miVehiculo);
     * ```
     */
    static crearDisponible(vehiculo: Vehiculo): Disponible {
        return new Disponible(vehiculo);
    }

    /**
     * Crea una instancia del estado **En_Alquiler** para un vehículo.
     *
     * @param vehiculo - Vehículo al que se asignará el estado.
     * @returns Instancia del estado `En_Alquiler`.
     */
    static crearEnAlquiler(vehiculo: Vehiculo): En_Alquiler {
        return new En_Alquiler(vehiculo);
    }

    /**
     * Crea una instancia del estado **En_Mantenimiento** para un vehículo.
     *
     * @param vehiculo - Vehículo al que se asignará el estado.
     * @returns Instancia del estado `En_Mantenimiento`.
     */
    static crearENMantenimiento(vehiculo: Vehiculo): En_Mantenimiento {
        return new En_Mantenimiento(vehiculo);
    }

    /**
     * Crea una instancia del estado **Necesita_Limpieza** para un vehículo.
     *
     * @param vehiculo - Vehículo al que se asignará el estado.
     * @returns Instancia del estado `Necesita_Limpieza`.
     */
    static crearNecesitaLimpieza(vehiculo: Vehiculo): Necesita_Limpieza {
        return new Necesita_Limpieza(vehiculo);
    }
}
