import IEstadoVehiculo from "./IEstadoVehiculo";
import Vehiculo from "../vehiculo";
import moment from "moment";
import Disponible from "./disponible";
import Necesita_Limpieza from "./necesita_Limpieza";


/**
 * Estado concreto del Patrón State que representa que el vehículo
 * **se encuentra en mantenimiento**.
 *
 * En este estado:
 * - No puede alquilarse.
 * - Puede pasar a "Disponible" cuando termine el mantenimiento.
 * - Puede pasar a "Necesita Limpieza" (por ejemplo, al salir del taller).
 * - No puede asignarse nuevamente a "En Mantenimiento".
 */
export default class En_Mantenimiento implements IEstadoVehiculo {

    /**
     * Crea un nuevo estado "En Mantenimiento" asociado a un vehículo.
     *
     * @param {Vehiculo} vehiculo - Vehículo cuyo estado se está gestionando.
     */
    constructor(private vehiculo: Vehiculo) {}


    /**
     * Indica si el vehículo está en mantenimiento.
     *
     * @returns {boolean} Siempre `true` en este estado.
     */
    estaEnMantenimiento(): boolean {
        return true;
    }

    /**
     * Intenta asignar el estado "En Alquiler".
     *
     * @throws {Error} Siempre, porque un vehículo en mantenimiento
     * no puede ser entregado a un cliente.
     */
    asignarAlquiler(): void {
        throw new Error("El vehículo está en mantenimiento y no puede ser alquilado.");
    }

    /**
     * Asigna el estado "Disponible".
     *
     * Se usa cuando el mantenimiento ya finalizó.
     */
    asignarDisponible(): void {
        this.vehiculo.cambiarEstado(new Disponible(this.vehiculo));
    }

    /**
     * Intenta asignar nuevamente el estado "En Mantenimiento".
     *
     * @throws {Error} Siempre, ya que no tiene sentido reasignar el mismo estado.
     */
    asignarMantenimiento(): void {
        throw new Error("El vehículo ya está en mantenimiento.");
    }

    /**
     * Asigna el estado "Necesita Limpieza".
     *
     * En muchos sistemas, al salir del taller el vehículo
     * pasa primero por limpieza antes de estar disponible.
     */
    asignarLimpieza(): void {
        this.vehiculo.cambiarEstado(new Necesita_Limpieza(this.vehiculo));
    }

    /**
     * Indica si el vehículo está en condiciones de ser alquilado.
     *
     * @returns {boolean} Siempre `false` mientras esté en mantenimiento.
     */

    puedeAlquilar(): boolean {
        const hace24hs = moment().subtract(24, "hours");
        
        if (moment(this.vehiculo.getFechaUltimoMantenimiento()).isBefore(hace24hs)) {
            this.vehiculo.setCostoTotalMantenimiento(this.vehiculo.getCostoPorMantenimiento())
            this.vehiculo.asignarDisponible();
            return true;
        }
         return false;
    }       
    
    /**
     * Evalúa si el vehículo debe ingresar a mantenimiento según el estado actual.
     *
     * En este estado, el metodo lanza una excepcion, porque no esta permitido.
     *
     * @throws Error Cuando el estado del vehículo no admite esta operación.
     * @returns void
     */
    evaluarMantenimiento(): void {
        throw new Error("El vehiculo ya se encuentra en mantenimiento");
    }
}
