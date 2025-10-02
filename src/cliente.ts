import Reserva from "./reserva";
import Vehiculo from "./vehiculo";
import moment from "moment";

export default class Cliente {
    static idBase:number=1;
    private idCliente:number;
    private nombre: string;
    private apellido:string;
    private reserva: Reserva = undefined as unknown as Reserva;

    constructor(nombre:string, apellido:string){
        this.idCliente=Cliente.idBase++;
        this.nombre=nombre;
        this.apellido=apellido;
    
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
     // Debe llamar al metodo crearReserva() de la clase Sistema.
    };

    public manejar(kilometros: number, dia: Date): void{
     //Debe registrar la cantidad de kilometros recorridos en un dia indicado.
    }
    
}