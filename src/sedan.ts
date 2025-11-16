import Vehiculo from "./vehiculo";
import Reserva from "./reserva";

/**
 * Representa un vehículo tipo **Sedan** dentro del sistema de alquiler.
 *
 * Extiende la clase base {@link Vehiculo} y define sus parámetros específicos:
 * - Tarifa base por día: **30**
 * - Cargo por kilómetro recorrido: **0.20**
 * - Capacidad máxima de carga: **2000**
 *
 * Este tipo de vehículo se caracteriza por aplicar un cargo por km
 * sobre la totalidad de kilómetros recorridos en la reserva.
 */
export default class Sedan extends Vehiculo {

    /**
     * Crea una nueva instancia de un vehículo Sedan.
     *
     * @param {string} matricula - Identificador único del vehículo.
     * @param {number} kilometraje - Kilometraje inicial del vehículo.
     *
     * Valores fijados para esta categoría de vehículo:
     * - Tarifa base diaria: **30**
     * - Cargo por kilómetro adicional: **0.20**
     * - Capacidad máxima permitida: **2000**
     */
    constructor(matricula: string, kilometraje: number) {
        super(matricula, 30, kilometraje, 0.20, 2000);
    }

    /**
     * Calcula la tarifa final correspondiente a la reserva del Sedan.
     *
     * Este cálculo considera:
     * - **Días totales de alquiler**, uno por cada registro de kilómetros.
     * - **Kilómetros totales recorridos durante la reserva.**
     * - Se cobra **cargo extra por cada kilómetro recorrido**, sin límites diarios.
     *
     * ### Fórmula
     * ```
     * tarifaFinal = (días * tarifaBase) + (kmTotales * cargoExtra)
     * ```
     *
     * @param {Reserva} reserva - La reserva desde la cual se obtienen los kilómetros recorridos.
     * @returns {number} Tarifa total a cobrar por el alquiler del vehículo.
     */
    public calcularTarifa(reserva: Reserva): number {
        let diasAlquiler: number = 0;
        let kmRecorrido: number = 0;

        // Contabiliza días y acumula los km diarios
        for (const valor of reserva.getKmRecorridos().values()) { 
            ++diasAlquiler;
            kmRecorrido += valor;
        }

        const tarifaFinal =
            (diasAlquiler * this.tarifaBase) +
            (kmRecorrido * this.cargoExtra);

        return tarifaFinal;  
    }
}
