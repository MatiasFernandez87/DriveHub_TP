import Vehiculo from "./vehiculo";
import Reserva from "./reserva";

/**
 * Representa un vehículo SUV dentro del sistema de alquiler.
 *
 * Extiende la clase base {@link Vehiculo} definiendo sus valores propios:
 * - Tarifa base por día: **80**
 * - Cargo por kilómetro extra: **0.25**
 * - Capacidad máxima de carga: **2500**
 *
 * Además, este tipo de vehículo aplica:
 * - Un cargo fijo diario de seguro
 * - Un límite máximo de kilómetros permitidos por reserva
 */
export default class SUV extends Vehiculo {
    
    /**
     * Crea una nueva instancia de SUV.
     *
     * @param {string} matricula - Matrícula o patente del vehículo.
     * @param {number} kilometraje - Kilometraje inicial del vehículo.
     *
     * Valores particulares para un SUV:
     * - Tarifa base: **80**
     * - Cargo por km extra: **0.25**
     * - Capacidad máxima permitida: **2500**
     */
    constructor(matricula: string, kilometraje: number) {
        super(matricula, 80, kilometraje, 0.25, 2500);
    }

    /**
     * Calcula la tarifa total correspondiente a una reserva de un SUV.
     * 
     * Este cálculo considera:
     *
     * - **Días de alquiler:** uno por cada registro de kilómetros en la reserva.
     * - **Kilómetros recorridos en total**
     * - **Límite máximo permitido de 500 km por reserva**
     * - **Cargo diario fijo por seguro (15 unidades por día)**
     * - **Cargo adicional por km extra si se superan los 500 km**
     *
     * ### Fórmulas
     *
     * **Si no supera los 500 km:**
     * ```
     * tarifaFinal = días * (tarifaBase + cargoSeguro)
     * ```
     *
     * **Si supera los 500 km:**
     * ```
     * kmExtra = kmTotales - 500
     * tarifaFinal = (días * (tarifaBase + cargoSeguro)) + (kmExtra * cargoExtra)
     * ```
     *
     * @param {Reserva} reserva - La reserva con los registros de km diarios.
     * @returns {number} Tarifa total calculada.
     */
    public calcularTarifa(reserva: Reserva): number {
        let diasAlquiler: number = 0;        
        let kmRecorridos: number = 0;
        const cargoDiarioSeguro: number = 15;
        const kmMaximoPermitido: number = 500;

        // Contabilizamos días y acumulamos km
        for (const valor of reserva.getKmRecorridos().values()) {
            ++diasAlquiler;
            kmRecorridos += valor;        
        }

        // Caso: se supera el límite de km
        if (kmRecorridos > kmMaximoPermitido) {
            let kmExtra = kmRecorridos - kmMaximoPermitido;
            const tarifaFinal =
                (diasAlquiler * this.tarifaBase) +
                (diasAlquiler * cargoDiarioSeguro) +
                (kmExtra * this.cargoExtra);

            return tarifaFinal;
        }

        // Caso: dentro del límite permitido
        const tarifaFinal =
            diasAlquiler * this.tarifaBase +
            diasAlquiler * cargoDiarioSeguro;

        return tarifaFinal;
    }
}
