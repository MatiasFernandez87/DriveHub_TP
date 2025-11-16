import Vehiculo from "./vehiculo";
import Reserva from "./reserva";

/**
 * Representa un vehículo compacto dentro del sistema de alquiler.
 * 
 * Hereda del tipo base {@link Vehiculo} y define los valores
 * específicos de tarifa base, cargo por kilómetro extra y límite
 * de kilómetros diarios incluidos en el alquiler.
 */
export default class Compacto extends Vehiculo {
    
    /**
     * Crea una nueva instancia de un vehículo Compacto.
     *
     * @param {string} matricula - Identificador único del vehículo.
     * @param {number} kilometraje - Kilometraje inicial del vehículo.
     *
     * Valores establecidos automáticamente:
     * - Tarifa base: **30**
     * - Cargo por km extra: **0.15**
     * - Carga máxima permitida: **1500**
     */
    constructor(matricula: string, kilometraje: number) {
        super(matricula, 30, kilometraje, 0.15, 1500);
    }

    /**
     * Calcula la tarifa final de la reserva según:
     * 
     * - Cantidad de días de alquiler (1 por cada entrada en `kmRecorridos`)
     * - Kilómetros extra por encima de 100 km por día
     * - Tarifa base (30 por día)
     * - Cargo adicional por kilómetro extra (0.15)
     *
     * Fórmula final:
     * ```
     * tarifaFinal = (días * tarifaBase) + (kmExtra * cargoExtra)
     * ```
     *
     * @param {Reserva} reserva - Reserva asociada al vehículo.
     * @returns {number} Tarifa total calculada para la reserva.
     */
    public calcularTarifa(reserva: Reserva): number {
        let diasAlquiler: number = 0;
        let kmExtra: number = 0;

        for (const valor of reserva.getKmRecorridos().values()) {
            ++diasAlquiler;
            if (valor > 100) {
                kmExtra += valor - 100;            
            }
        }

        const tarifaFinal = (diasAlquiler * this.tarifaBase) + (kmExtra * this.cargoExtra);
        return tarifaFinal;
    }
}
