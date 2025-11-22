/**
 * Interfaz que define el comportamiento de los estados posibles de un vehículo.
 *
 * Forma parte del **Patrón State**, donde cada estado concreto
 * (Disponible, En_Alquiler, En_Mantenimiento, Necesita_Limpieza)
 * implementa estas reglas de transición.
 *
 * Cada método representa una acción que el vehículo puede intentar realizar,
 * y cada estado decide si la acción es válida o si debe lanzar un error.
 */
export default interface IEstadoVehiculo {

    /**
     * Asigna el estado "En Alquiler" al vehículo.
     * 
     * Debe lanzar un error si el vehículo no puede ser alquilado
     * desde su estado actual.
     */
    asignarAlquiler(): void;

    /**
     * Asigna el estado "Disponible" al vehículo.
     * 
     * Se utiliza cuando el vehículo finaliza un proceso de alquiler,
     * mantenimiento o limpieza.
     */
    asignarDisponible(): void;

    /**
     * Asigna el estado "En Mantenimiento" al vehículo.
     *
     * Debe utilizarse cuando alguna regla de mantenimiento lo requiera
     * o cuando el flujo del sistema indique que debe ingresar a taller.
     */
    asignarMantenimiento(): void;

    /**
     * Asigna el estado "Necesita Limpieza" al vehículo.
     * 
     * Representa la transición posterior a la devolución del vehículo,
     * antes de poder volver a alquilarse.
     */
    asignarLimpieza(): void;

    /**
     * Indica si el vehículo está disponible para ser alquilado.
     * 
     * @returns {boolean} `true` si el estado permite alquilar, `false` en caso contrario.
     */
    puedeAlquilar(): boolean;

    /**
     * Indica si el vehículo se encuentra actualmente en estado de mantenimiento.
     * 
    * @returns {boolean} `true` si el estado representa "En Mantenimiento".
     */
    estaEnMantenimiento(): boolean;



    
    evaluarMantenimiento(): void;
}
