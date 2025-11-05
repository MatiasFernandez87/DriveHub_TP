import Reserva from "./reserva";
import SistemaDriveHub from "./sistema";
import Vehiculo from "./vehiculo";
import moment from "moment";

export default class Cliente {
    private static idBase: number = 1;
    private idCliente: number;
    private nombre: string;
    private apellido: string;
    private reserva: Reserva = undefined as unknown as Reserva;
    private readonly sistema: SistemaDriveHub;

    constructor(nombre:string, apellido:string, sistema: SistemaDriveHub){
        this.idCliente = Cliente.idBase++;
        this.nombre = nombre;
        this.apellido = apellido;
        this.sistema = sistema;    
    }

    public getIdCliente():number{
        return this.idCliente;
    }

    public getNombre():string{
        return this.nombre;
    }

    public getApellido():string{
        return this.apellido;
    }

    public getReserva():Reserva{
        return this.reserva;
    }

    public setNombre(nombre:string):void{
        this.nombre=nombre;
    }

    public setApellido(apellido:string):void{
        this.apellido=apellido;
    }

    public setReserva(reserva:Reserva):void{
        this.reserva=reserva;
    }

    public solicitarReserva(vehiculo: Vehiculo, fechaInicio: Date, fechaFin: Date): void{
        this.sistema.crearReserva(this, vehiculo, fechaInicio, fechaFin);
    };

    public manejar(kilometros: number, dia: Date): void{
        //Debe registrar la cantidad de kilometros recorridos en un dia indicado.
        this.reserva.registrarUsoVehiculo(kilometros, dia)
    }
    
}