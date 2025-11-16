import ITemporada from "./Itemporada";

/**
 * Representa la temporada alta dentro del sistema de reservas.
 * 
 * Durante la temporada alta se aplica un incremento al costo base
 * del alquiler debido a la mayor demanda.
 * 
 * @class TemporadaAlta
 * @implements {ITemporada}
 */
export default class TemporadaAlta implements ITemporada {

    /**
     * Retorna el factor de aumento correspondiente a la temporada alta.
     * 
     * Este valor se utiliza para multiplicar la tarifa base del vehículo.
     * Por ejemplo, un valor de 1.20 indica un 20% de incremento.
     *
     * @returns {number} El factor de aumento de la temporada alta.
     */
    calculoPorTemporada(): number {
        return 1.20;
    }
}