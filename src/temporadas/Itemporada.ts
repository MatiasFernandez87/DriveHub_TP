
/**
 * Interfaz que define el comportamiento de una temporada
 * dentro del sistema de reservas.  
 * 
 * Cada implementación de temporada (Alta, Media, Baja)
 * debe proporcionar su propio cálculo de recargo o
 * modificación del costo base del alquiler.
 *
 * @interface ITemporada
 */
export default interface ITemporada {

    /**
     * Calcula el porcentaje o factor correspondiente a la temporada.
     * 
     * Este valor será aplicado sobre la tarifa base del vehículo
     * para ajustar su precio según la temporada vigente.
     * 
     * @returns {number} Valor numérico asociado a la temporada
     * (por ejemplo: 1.2 = 20% de aumento).
     */
    calculoPorTemporada(): number;
}