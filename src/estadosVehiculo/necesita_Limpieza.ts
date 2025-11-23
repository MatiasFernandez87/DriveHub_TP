import IEstadoVehiculo from "./IEstadoVehiculo";
import Vehiculo from "../vehiculo";
import Disponible from "./disponible";
import En_Mantenimiento from "./en_Mantenimiento";

/**
 * Estado concreto del Patrón State que representa que el vehículo
 * **necesita limpieza** antes de volver a estar disponible para alquilarse.
 *
 * En este estado:
 * - No puede alquilarse.
 * - Puede pasar a "Disponible" tras la limpieza.
 * - Puede enviarse a "Mantenimiento" si el sistema lo requiere.
 * - No puede volver a asignarse a este mismo estado.
 */
export default class Necesita_Limpieza implements IEstadoVehiculo {

    /**
     * Crea un nuevo estado "Necesita Limpieza" asociado a un vehículo.
     *
     * @param {Vehiculo} vehiculo - Vehículo cuyo estado se está gestionando.
     */
    constructor(private vehiculo: Vehiculo) {}



    /**
     * Indica si el vehículo está en mantenimiento.
     *
     * @returns {boolean} Siempre `false`, ya que este estado representa limpieza, no mantenimiento.
     */
    estaEnMantenimiento(): boolean {
        return false;
    }

    /**
     * Intenta asignar el estado "En Alquiler".
     *
     * Lanza un error porque un vehículo que necesita limpieza
     * **no puede ser entregado a un cliente** todavía.
     *
     * @throws {Error} Cuando se intenta alquilar en este estado.
     */
    asignarAlquiler(): void {
        throw new Error("El vehículo necesita limpieza y no puede ser alquilado.");
    }

    /**
     * Asigna el estado "Disponible", indicando que la limpieza se realizó correctamente.
     */
    asignarDisponible(): void {
        this.vehiculo.cambiarEstado(new Disponible(this.vehiculo));
    }

    /**
     * Asigna el estado "En Mantenimiento".
     *
     * Se permite porque la limpieza puede detectar un problema que requiera taller.
     */
    asignarMantenimiento(): void {
        this.vehiculo.cambiarEstado(new En_Mantenimiento(this.vehiculo));
    }

    /**
     * Intenta asignar nuevamente el estado "Necesita Limpieza".
     *
     * @throws {Error} Siempre, ya que no tiene sentido volver a este mismo estado.
     */
    asignarLimpieza(): void {
        throw new Error("El vehículo ya está en estado de 'Necesita Limpieza'.");
    }

    /**
     * Indica si el vehículo está en condiciones de ser alquilado.
     *
     * @returns {boolean} Siempre `false`, porque aún no fue limpiado.
     */
    puedeAlquilar(): boolean {
        return false;
    }

    evaluarMantenimiento(): void {
        throw new Error("El vehiculo está en mantenimiento");
    }
}
