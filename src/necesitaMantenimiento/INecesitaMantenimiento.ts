import Vehiculo from "../vehiculo";

/**
 * Interfaz del Patrón **Strategy** utilizada para evaluar
 * si un vehículo necesita mantenimiento según distintas reglas.
 *
 * Cada implementación representa una condición independiente,
 * por ejemplo:
 * - Kilómetros desde el último mantenimiento
 * - Cantidad de viajes realizados
 * - Tiempo transcurrido desde el último mantenimiento
 *
 * La clase {@link Vehiculo} ejecuta todas las estrategias
 * almacenadas en su arreglo `condicionesMantenimiento`,
 * y si alguna devuelve `true` el vehículo es enviado a mantenimiento.
 */
export default interface INecesitaMantenimiento {

    /**
     * Evalúa una condición específica de mantenimiento.
     *
     * @param {Vehiculo} vehiculo - Vehículo al que se le aplica la regla.
     * @returns {boolean} `true` si la condición requiere mantenimiento, `false` en caso contrario.
     */
    necesitaMantenimiento(vehiculo: Vehiculo): boolean;
}
