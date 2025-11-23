import IEstadoVehiculo from "./estadosVehiculo/IEstadoVehiculo";
import Reserva from "./reserva";
import Disponible from "./estadosVehiculo/disponible";


/**
 * Clase base abstracta para todos los tipos de vehículos del sistema.
 *
 * Este modelo combina dos patrones de diseño:
 *
 * - **State Pattern:** para manejar los estados del vehículo
 *   (`Disponible`, `En_Alquiler`, `En_Mantenimiento`, `Necesita_Limpieza`).
 *
 * - **Strategy Pattern:** para evaluar múltiples reglas de mantenimiento
 *   (km recorridos, cantidad de viajes, último mantenimiento, etc.)
 *
 * Cada vehículo concreto (Compacto, SUV, Sedan, etc.) hereda esta clase.
 */
export default abstract class Vehiculo {

    /** Matrícula / patente del vehículo. */
    protected matricula: string;
    
    /** Tarifa base diaria del vehículo. */
    protected tarifaBase: number;
    
    /** Kilometraje actual del vehículo. */
    protected kilometraje: number;
    
    /** Cargo adicional por km extra. */
    protected cargoExtra: number;
    
    /** Estado actual del vehículo (State Pattern). */
    protected estadoVehiculo: IEstadoVehiculo;

    /** Kilometraje registrado al último mantenimiento. */
    protected kmUltimoMantenimiento: number;
    
    /** Cantidad de viajes realizados por el vehículo. */
    protected cantidadViajes: number;

    /** Fecha del último mantenimiento realizado. */
    protected fechaUltimoMantenimiento: Date = undefined as unknown as Date;

  
    /** Monto acumulado de gastos de mantenimiento del vehículo. */
    protected costoTotalMantenimiento: number;

    /** Costo fijo por cada mantenimiento realizado. */
    protected costoPorMantenimiento: number;

    /** Historial de mantenimientos de un vehiculo. */
    protected historialMantenimientos: Map<Date, number> = new Map();


    /**
     * Crea una instancia base de un vehículo.
     *
     * @param {string} matricula - Identificador único del vehículo.
     * @param {number} tarifaBase - Tarifa diaria del alquiler.
     * @param {number} kilometraje - Kilometraje inicial del vehículo.
     * @param {number} cargoExtra - Cargo por km adicional.
     * @param {number} costoPorMantenimiento - Costo de cada mantenimiento realizado.
     */
    constructor(
        matricula: string,
        tarifaBase: number,
        kilometraje: number,
        cargoExtra: number,
        costoPorMantenimiento: number
    ) {
        this.matricula = matricula;
        this.tarifaBase = tarifaBase;
        this.kilometraje = kilometraje;
        this.cargoExtra = cargoExtra;
        this.estadoVehiculo = new Disponible(this);
        this.kmUltimoMantenimiento = 0;
        this.cantidadViajes = 0;
        this.costoTotalMantenimiento = 0;
        this.costoPorMantenimiento = costoPorMantenimiento;
    }

    /**
     * Evalúa todas las reglas de mantenimiento aplicando Strategy Pattern.
     * 
     * Si alguna regla indica que el vehículo debe ir a mantenimiento:
     * - se envía al estado `En_Mantenimiento`
     * - se actualiza la fecha
     * - se acumula el costo de mantenimiento
     *
     * Si ninguna regla aplica:
     * - el vehículo se devuelve normalmente (pasa a `Disponible`)
     */


    /** @returns Costo total acumulado en mantenimientos */
    public getCostoTotalMantenimiento(): number {
        return this.costoTotalMantenimiento;
    }

    /** @returns Matrícula del vehículo */
    public getMatricula(): string {
        return this.matricula;
    }

    /** @returns Tarifa base diaria */
    public getTarifaBase(): number {
        return this.tarifaBase;
    }

    /** @returns Kilometraje actual */
    public getKilometraje(): number {
        return this.kilometraje;
    }

    /** @returns Cargo por km adicional */
    public getCargoExtra(): number {
        return this.cargoExtra;
    }

    public getHistorialMantenimiento(): Map<Date, number> {
        return this.historialMantenimientos
    }

    /**
     * Devuelve el estado actual del vehículo.
     *
     * Si el vehículo está en mantenimiento, verifica si ya pasaron 24 horas.
     * En tal caso, el vehículo es devuelto automáticamente al estado Disponible.
     *
     * @returns {IEstadoVehiculo} Estado actual del vehículo.
     */
    public getEstado(): IEstadoVehiculo {
        return this.estadoVehiculo;
    }

    /** Establece el km del último mantenimiento. */
    public setKmUltimoMantenimiento(km: number): void {
        this.kmUltimoMantenimiento = km;
    }

    /** Establece la cantidad de viajes realizados. */
    public setCantidadViajes(cant: number): void {
        this.cantidadViajes = cant;
    }

    public setHistorialMantenimiento(fecha: Date, costoMantenimiento: number) {
        this.historialMantenimientos.set(fecha, costoMantenimiento);
    }

    /** Establece la fecha del último mantenimiento. */
    public setFechaUltimoMantenimiento(fecha: Date): void {
        this.fechaUltimoMantenimiento = fecha;
    }

    /** @returns Cantidad de viajes realizados */
    public getCantidadViajes(): number {
        return this.cantidadViajes;
    }

    /** @returns Fecha del último mantenimiento */
    public getFechaUltimoMantenimiento(): Date {
        return this.fechaUltimoMantenimiento;
    }

    /** @returns Kilometraje del último mantenimiento */
    public getKmUltimoMantenimiento(): number {
        return this.kmUltimoMantenimiento;
    }

    /**
     * Incrementa el costo acumulado de mantenimiento.
     *
     * @param {number} costoMantenimiento - Costo a agregar al acumulado.
     */
    public setCostoTotalMantenimiento(costoMantenimiento: number): void {
        this.costoTotalMantenimiento += costoMantenimiento;
    }

    /** Devuelve el costo por mantenimiento. */
    public getCostoPorMantenimiento(): number {
        return this.costoPorMantenimiento;
    }

    /** Actualiza la matrícula del vehículo. */
    public setMatricula(matricula: string): void {
        this.matricula = matricula;
    }

    /** Actualiza la tarifa base diaria. */
    public setTarifaBase(tarifaBase: number): void {
        this.tarifaBase = tarifaBase;
    }

    /** Actualiza el kilometraje del vehículo. */
    public setKilometraje(kilometraje: number): void {
        this.kilometraje = kilometraje;
    }

    /** Actualiza el cargo por km adicional. */
    public setCargoExtra(cargoExtra: number): void {
        this.cargoExtra = cargoExtra;
    }

    /**
     * Suma kilómetros al vehículo.
     * @param {number} nuevo - Cantidad de kilómetros recorridos.
     */
    public actualizarKilometraje(nuevo: number): void {
        this.kilometraje += nuevo;
    }

    /**
     * Cambia el estado del vehículo dentro del State Pattern.
     *
     * @param {IEstadoVehiculo} estado - Nuevo estado del vehículo.
     */
    public cambiarEstado(estado: IEstadoVehiculo): void {
        this.estadoVehiculo = estado;
    }

    /**
     * Envía el vehículo al estado "En Alquiler".
     * Incrementa la cantidad de viajes realizados.
     */
    public asignarAlquiler(): void {
        this.estadoVehiculo.asignarAlquiler();
        this.cantidadViajes++;
    }

    /**
     * Devuelve el vehículo a estado Disponible.
     */
    public asignarDisponible(): void {
        this.estadoVehiculo.asignarDisponible();
    }

    /**
     * Envía el vehículo al estado "En Mantenimiento".
     * 
     * @param {Date} ingreso - Fecha de ingreso al mantenimiento.
     */
    public asignarMantenimiento(): void {
        this.estadoVehiculo.asignarMantenimiento();
    }
    

    /**
     * Envía el vehículo al estado "Necesita Limpieza".
     */
    public asignarLimpieza(): void {
        this.estadoVehiculo.asignarLimpieza();
    }

    /**
     * Método abstracto que cada tipo de vehículo debe implementar
     * para calcular su tarifa de alquiler.
     *
     * @param {Reserva} reserva - Reserva asociada al cálculo.
     * @returns {number} Tarifa calculada.
     */
    public abstract calcularTarifa(reserva: Reserva): number;

    /**
     * Indica si el vehículo está disponible para ser alquilado.
     *
     * Delegará la verificación en el estado actual del vehículo.
     *
     * @returns `true` si puede alquilarse, de lo contrario `false`.
     */
    public puedeAlquilar(): boolean {
        return this.estadoVehiculo.puedeAlquilar();
    }

    /**
     * Actualiza la información de mantenimiento del vehículo.
     *
     * Registra la fecha del último mantenimiento, actualiza el costo total
     * acumulado y agrega una nueva entrada al historial de mantenimiento.
     *
     * @returns void
     */
    public actualizarInfoMantenimiento(): void {
        const fechaMantenimiento = new Date();
        this.setFechaUltimoMantenimiento(fechaMantenimiento);
        this.setCostoTotalMantenimiento(this.getCostoPorMantenimiento());
        this.setHistorialMantenimiento(fechaMantenimiento, this.getCostoPorMantenimiento());
    }
}
