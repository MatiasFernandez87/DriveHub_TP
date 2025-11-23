import IEstadoVehiculo from "./IEstadoVehiculo";
import Vehiculo from "../vehiculo";
import INecesitaMantenimiento from "../necesitaMantenimiento/INecesitaMantenimiento";
import Disponible from "./disponible";
import En_Mantenimiento from "./en_Mantenimiento";
import Necesita_Limpieza from "./necesita_Limpieza";
import KilometrosParaMantenimiento from "../necesitaMantenimiento/kilometrosParaMantenimiento";
import CantViajes from "../necesitaMantenimiento/cantViajes";
import UltimoMantenimiento from "../necesitaMantenimiento/ultimoMantenimiento";

/**
 * Estado concreto del Patrón State que representa que el vehículo
 * **actualmente se encuentra alquilado**.
 *
 * En este estado:
 * - No puede alquilarse nuevamente.
 * - Puede pasar a "Disponible" cuando finaliza el alquiler.
 * - Puede pasar a "Mantenimiento" si durante el alquiler se detecta algún problema.
 * - Puede pasar a "Necesita Limpieza" cuando el cliente devuelve el vehículo.
 */
export default class En_Alquiler implements IEstadoVehiculo {


    /**
     * Crea un nuevo estado "En Alquiler" para el vehículo especificado.
     *
     * @param {Vehiculo} vehiculo - Vehículo asociado al estado actual.
     */
    constructor(private vehiculo: Vehiculo) {}

   

    /**
     * Indica si el vehículo se encuentra en mantenimiento.
     *
     * @returns {boolean} Siempre `false`, ya que está alquilado, no en taller.
     */
    estaEnMantenimiento(): boolean {
        return false;
    }

    /**
     * Intenta alquilar el vehículo nuevamente.
     *
     * @throws {Error} Siempre, porque un vehículo ya alquilado
     * no puede ser alquilado otra vez.
     */
    asignarAlquiler(): void {
        throw new Error("El vehículo ya está en alquiler.");
    }

    /**
     * Asigna el estado "Disponible", representando que el alquiler finalizó
     * y el vehículo puede volver a ser utilizado.
     */
    asignarDisponible(): void {
        
        this.vehiculo.cambiarEstado(new Disponible(this.vehiculo));
        this.evaluarMantenimiento();
    }

    /**
     * Asigna el estado "En Mantenimiento".
     *
     * Se usa si el vehículo presenta fallas o necesita revisión
     * inmediatamente después o durante el alquiler.
     */
    asignarMantenimiento(): void {
        this.vehiculo.cambiarEstado(new En_Mantenimiento(this.vehiculo));
    }

    /**
     * Asigna el estado "Necesita Limpieza".
     *
     * Normalmente se aplica cuando el cliente devuelve el vehículo.
     */
    asignarLimpieza(): void {
        this.vehiculo.cambiarEstado(new Necesita_Limpieza(this.vehiculo));
    }

    /**
     * Indica si el vehículo puede ser alquilado.
     *
     * @returns {boolean} Siempre `false` mientras está en alquiler.
     */
    puedeAlquilar(): boolean {
        return false;
    }

    /**
     * Indica si el vehículo se encuentra en estado de alquiler.
     *
     * @returns {boolean} Siempre `true` en este estado.
     */
    estaAlquilado(): boolean {
        return true;
    }


    /**
     * Conjunto de reglas utilizadas para determinar si un vehículo
     * debe pasar por mantenimiento.
     *
     * Cada implementación de `INecesitaMantenimiento` define una condición
     * distinta (kilometraje, cantidad de viajes, tiempo desde el último
     * mantenimiento, etc.).
     */
    private condicionesMantenimiento: INecesitaMantenimiento[] = [
        new KilometrosParaMantenimiento(),
        new CantViajes(),
        new UltimoMantenimiento(),
    ];

    /**
     * Evalúa si el vehículo requiere mantenimiento según las reglas definidas.
     *
     * Recorre todas las condiciones de mantenimiento y, si alguna determina
     * que es necesario, cambia el estado del vehículo a mantenimiento y
     * registra la información correspondiente.
     *
     * @returns void
     */
    public evaluarMantenimiento(): void {
        const necesitaMantenimiento = this.condicionesMantenimiento.some(
            regla => regla.necesitaMantenimiento(this.vehiculo)
        );

        if (necesitaMantenimiento) {
            this.asignarMantenimiento();
            this.vehiculo.actualizarInfoMantenimiento();
            return;
        }
    }
        
}