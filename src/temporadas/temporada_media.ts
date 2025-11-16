import ITemporada from "./Itemporada";

/**
 * Representa la temporada media dentro del sistema de reservas.
 *
 * En esta temporada no se aplican aumentos ni descuentos a la
 * tarifa base del alquiler. Se considera el período estándar
 * sin variaciones de demanda.
 *
 * @class TemporadaMedia
 * @implements {ITemporada}
 */
export default class TemporadaMedia implements ITemporada {

    /**
     * Retorna el factor correspondiente a la temporada media.
     *
     * Este valor es neutro (1), indicando que no hay incremento
     * ni descuento aplicado a la tarifa base.
     *
     * @returns {number} El factor neutro de la temporada media.
     */
    calculoPorTemporada(): number {
        return 1;
    }
}
