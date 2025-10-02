import Vehiculo from "./vehiculo";
import { ESTADO_RESERVA } from "./enums/estado_Reserva"; 

export default class Reserva{
    private static idBase = 0;
    private idReserva: number;
    private vehiculo: Vehiculo;
    private cliente: Cliente;
    private fechaInicio: Date;
    private fechaFin: Date;
    private kmInicial: number;
    private kmRecorridos: number;
    private estadoReserva: ESTADO_RESERVA;

    constructor(vehiculo: Vehiculo, cliente: Cliente, fechaInicio: Date, fechaFin: Date){

        this.idReserva = Reserva.idBase++;
        this.vehiculo = vehiculo;
        this.cliente = cliente;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.kmInicial = vehiculo.getKilometraje();
        this.kmRecorridos = 0;
        this.estadoReserva = ESTADO_RESERVA.EN_CURSO;
    }

    public getIdReserva(): number{
        return this.idReserva;
    }

    public getEstado(): ESTADO_RESERVA{
        return this.estadoReserva;
    }

    public getCliente(): Cliente{
        return this.cliente;
    }

    public getVehiculo(): Vehiculo{
        return this.vehiculo;
    }

    public registrarUsoVehiculo(kilometros: number): void {
        this.kmRecorridos += kilometros;
        this.vehiculo.actualizarKilometraje(kilometros);
    }
}