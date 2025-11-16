import Vehiculo from "../vehiculo";

/**
 * Estrategia del Patrón **Strategy** que determina si un vehículo
 * necesita mantenimiento según los kilómetros recorridos desde
 * el último servicio.
 *
 * Regla:
 * - El vehículo debe enviarse a mantenimiento cuando haya recorrido
 *   **10.000 km o más** desde el último mantenimiento registrado.
 *
 * La lógica compara:
 * ```
 * kmUltimoMantenimiento + 10000 <= kilometrajeActual
 * ```
 * Si se cumple, el vehículo supera el límite de seguridad.
 */
export default class KilometrosParaMantenimiento {

    /**
     * Verifica si el vehículo superó el límite de 10.000 km desde
     * su último mantenimiento.
     *
     * @param {Vehiculo} vehiculo - El vehículo a evaluar.
     * @returns {boolean} `true` si debe enviarse a mantenimiento; `false` en caso contrario.
     */
    public necesitaMantenimiento(vehiculo: Vehiculo): boolean {
        return (
            vehiculo.getKmUltimoMantenimiento() + 10000 <=
            vehiculo.getKilometraje()
        );
    }
}
