import IEstadoVehiculo from "./IEstadoVehiculo";
import Vehiculo from "../vehiculo";
import En_Alquiler from "./en_Alquiler";
import En_Mantenimiento from "./en_Mantenimiento";
import Necesita_Limpieza from "./necesita_Limpieza";


/**
 * Estado concreto del Patrón State que representa que el vehículo
 * **está disponible** para ser alquilado.
 *
 * En este estado:
 * - Puede alquilarse sin restricciones.
 * - Puede enviarse a mantenimiento.
 * - Puede pasar a necesitar limpieza.
 * - No puede volver a asignarse como "Disponible" porque ya lo está.
 */
export default class Disponible implements IEstadoVehiculo {


    
   
    /**
     * Crea una instancia del estado "Disponible" para el vehículo dado.
     *
     * @param {Vehiculo} vehiculo - Vehículo cuyo estado se administra.
     */
    constructor(private vehiculo: Vehiculo) {}



    /**
     * Indica si el vehículo se encuentra en mantenimiento.
     *
     * @returns {boolean} Siempre `false` en este estado.
     */
    estaEnMantenimiento(): boolean {
        return false;
    }

    /**
     * Asigna el estado "En Alquiler" al vehículo.
     *
     * Se ejecuta cuando un cliente alquila el vehículo.
     */
    asignarAlquiler(): void {
        this.vehiculo.cambiarEstado(new En_Alquiler(this.vehiculo));
    }

    /**
     * Intenta asignar nuevamente el estado "Disponible".
     *
     * @throws {Error} Siempre, porque el vehículo ya se encuentra disponible.
     */
    asignarDisponible(): void {
        throw new Error("El vehículo ya está disponible.");
    }

    /**
     * Asigna el estado "En Mantenimiento".
     *
     * Se usa cuando el vehículo debe ingresar a revisión o reparación.
     */
    asignarMantenimiento(): void {
        this.vehiculo.cambiarEstado(new En_Mantenimiento(this.vehiculo));
    }

    /**
     * Asigna el estado "Necesita Limpieza".
     *
     * Este estado puede aplicarse por inspección, devolución previa,
     * o como parte del flujo interno del sistema.
     */
    asignarLimpieza(): void {
        this.vehiculo.cambiarEstado(new Necesita_Limpieza(this.vehiculo));
    }

    /**
     * Indica si el vehículo puede ser alquilado.
     *
     * @returns {boolean} Siempre `true` en este estado.
     */
    puedeAlquilar(): boolean {
        return true;
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
        throw new Error("El vehiculo se encuentra Disponible");
    }
}
