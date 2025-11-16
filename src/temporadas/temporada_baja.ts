import ITemporada from "./Itemporada";

/**
 * Representa la temporada baja dentro del sistema de reservas.
 *
 * Durante la temporada baja se aplica un descuento sobre la tarifa base
 * del alquiler debido a la menor demanda estacional.
 *
 * @class TemporadaBaja
 * @implements {ITemporada}
 */
export default class TemporadaBaja implements ITemporada {

    /**
     * Retorna el factor de reducción correspondiente a la temporada baja.
     *
     * Este valor se utiliza para multiplicar la tarifa base del vehículo.
     * Por ejemplo, un valor de 0.9 indica un 10% de descuento.
     *
     * @returns {number} El factor de descuento de la temporada baja.
     */
    calculoPorTemporada(): number {
        return 0.9;
    }
}