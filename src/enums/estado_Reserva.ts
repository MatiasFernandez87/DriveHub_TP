/**
 * Enum que representa los distintos estados posibles de una reserva.
 * 
 * @enum {number}
 * @readonly
 */
export enum ESTADO_RESERVA {
    /**
     * La reserva está activa y en proceso.
     */
    EN_CURSO,

    /**
     * La reserva fue completada y finalizada.
     */
    FINALIZADA
}