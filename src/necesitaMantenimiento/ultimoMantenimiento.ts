import Vehiculo from "../vehiculo";
import moment from "moment";

/**
 * Estrategia del Patrón **Strategy** que determina si un vehículo
 * necesita mantenimiento según la fecha del último servicio.
 *
 * Regla:
 * - El vehículo debe enviarse a mantenimiento si han pasado
 *   **más de 12 meses** desde su último mantenimiento.
 *
 * Para realizar la comparación se utiliza `moment.js`.
 *
 * Lógica:
 * ```
 * fechaUltimoMantenimiento < (hoy - 12 meses)
 * ```
 */
export default class UltimoMantenimiento {

    /**
     * Verifica si han transcurrido más de 12 meses desde
     * el último mantenimiento registrado.
     *
     * @param {Vehiculo} vehiculo - Vehículo a evaluar.
     * @returns {boolean} `true` si supera el límite de 12 meses, `false` en caso contrario.
     */
    public necesitaMantenimiento(vehiculo: Vehiculo): boolean {
        const ultimaFecha = moment(vehiculo.getFechaUltimoMantenimiento());
        const haceDoceMeses = moment().subtract(12, "months");

        return ultimaFecha.isBefore(haceDoceMeses);
    }
}
