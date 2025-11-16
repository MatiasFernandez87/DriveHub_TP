import Reserva from "./reserva";
import SistemaDriveHub from "./sistema";
import Vehiculo from "./vehiculo";
import moment from "moment";

/**
 * Representa un cliente dentro del sistema DriveHub.
 * Se encarga de gestionar su información personal y sus reservas.
 */
export default class Cliente {
    /**
     * Contador interno para generar IDs automáticos de clientes.
     * @private
     */
    private static idBase: number = 1;

    /** Identificador único del cliente. */
    private idCliente: number;

    /** Nombre del cliente. */
    private nombre: string;

    /** Apellido del cliente. */
    private apellido: string;

    /** Reserva asociada al cliente (si existe). */
    private reserva: Reserva = undefined as unknown as Reserva;

    /** Referencia al sistema principal encargado de gestionar reservas. */
    private readonly sistema: SistemaDriveHub;

    /**
     * Crea una nueva instancia de Cliente.
     *
     * @param nombre - Nombre del cliente.
     * @param apellido - Apellido del cliente.
     * @param sistema - Instancia del sistema DriveHub asociada.
     */
    constructor(nombre: string, apellido: string, sistema: SistemaDriveHub) {
        this.idCliente = Cliente.idBase++;
        this.nombre = nombre;
        this.apellido = apellido;
        this.sistema = sistema;
    }

    /**
     * Obtiene el ID único del cliente.
     * @returns ID numérico del cliente.
     */
    public getIdCliente(): number {
        return this.idCliente;
    }

    /**
     * Obtiene el nombre del cliente.
     * @returns Nombre como cadena.
     */
    public getNombre(): string {
        return this.nombre;
    }

    /**
     * Obtiene el apellido del cliente.
     * @returns Apellido como cadena.
     */
    public getApellido(): string {
        return this.apellido;
    }

    /**
     * Obtiene la reserva actual del cliente.
     * @returns La reserva asociada o undefined.
     */
    public getReserva(): Reserva {
        return this.reserva;
    }

    /**
     * Actualiza el nombre del cliente.
     * @param nombre - Nuevo nombre.
     */
    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    /**
     * Actualiza el apellido del cliente.
     * @param apellido - Nuevo apellido.
     */
    public setApellido(apellido: string): void {
        this.apellido = apellido;
    }

    /**
     * Establece la reserva del cliente.
     * @param reserva - Instancia de reserva a asignar.
     */
    public setReserva(reserva: Reserva): void {
        this.reserva = reserva;
    }

    /**
     * Solicita una nueva reserva para un vehículo dentro de un rango de fechas.
     *
     * @param vehiculo - Vehículo a reservar.
     * @param fechaInicio - Fecha de inicio de la reserva.
     * @param fechaFin - Fecha de fin de la reserva.
     */
    public solicitarReserva(vehiculo: Vehiculo, fechaInicio: Date, fechaFin: Date): void {
        this.sistema.crearReserva(this, vehiculo, fechaInicio, fechaFin);
    }

    /**
     * Registra el uso del vehículo reservado por el cliente.
     *
     * @param kilometros - Cantidad de kilómetros recorridos.
     * @param dia - Día en el cual se realizó el recorrido.
     */
    public manejar(kilometros: number, dia: Date): void {
        this.reserva.registrarUsoVehiculo(kilometros, dia);
    }
}
