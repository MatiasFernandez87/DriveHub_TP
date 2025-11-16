import Vehiculo from "../vehiculo";

/**
 * Estrategia del Patrón **Strategy** que determina si un vehículo
 * necesita mantenimiento según la cantidad de viajes realizados.
 *
 * Regla:
 * - Si el vehículo realizó **5 viajes o más** desde el último mantenimiento,
 *   debe enviarse a revisión.
 *
 * Notas importantes:
 * - Si la regla se cumple o no, el contador de viajes se **resetea a 0**
 *   después de evaluarse.  
 *   Esto garantiza que el contador vuelva a comenzar desde cero
 *   para futuros mantenimientos.
 */
export default class CantViajes {

    /**
     * Evalúa si el vehículo superó la cantidad máxima de viajes permitidos.
     *
     * @param {Vehiculo} vehiculo - El vehículo a evaluar.
     * @returns {boolean} `true` si realizó 5 o más viajes; `false` en caso contrario.
     */
    public necesitaMantenimiento(vehiculo: Vehiculo): boolean {
        const superaViajes: boolean = vehiculo.getCantidadViajes() >= 5;

        // Reinicia el contador para el siguiente ciclo de mantenimiento
        vehiculo.setCantidadViajes(0);

        return superaViajes;
    }
}
