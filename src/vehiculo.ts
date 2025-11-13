import { ESTADO_VEHICULO } from "./enums/estado_Vehiculo";
import Reserva from "./reserva";

export default abstract class Vehiculo{
    protected matricula: string;
    protected tarifaBase: number;
    protected kilometraje: number;
    protected cargoExtra: number;
    protected estado : ESTADO_VEHICULO;

    constructor(matricula: string, tarifaBase: number, kilometraje: number, cargoExtra: number){
        this.matricula = matricula;
        this.tarifaBase = tarifaBase;
        this.kilometraje = kilometraje;
        this.cargoExtra = cargoExtra;
        this.estado = ESTADO_VEHICULO.DISPONIBLE;
    }


    public setMatricula(matricula:string):void{
        this.matricula = matricula;
    }

    public setTarifaBase(tarifaBase:number):void{
        this.tarifaBase = tarifaBase;
    }

    public setKilometraje(kilometraje:number):void{
        this.kilometraje = kilometraje;
    }

    public setCargoExtra(cargoExtra:number):void{
        this.cargoExtra = cargoExtra;
    }   

    public setEstado(estado:ESTADO_VEHICULO):void{
        this.estado = estado;
    }

    public getMatricula():string{
        return this.matricula;
    }
    public getTarifaBase():number{
        return this.tarifaBase;
    }  
    public getKilometraje():number{
        return this.kilometraje;
    }
    public getCargoExtra():number{
        return this.cargoExtra;
    }
    
    public getEstado():ESTADO_VEHICULO{
        return this.estado;
    }

    public actualizarKilometraje(nuevoKilometraje: number): void {
         this.kilometraje += nuevoKilometraje;
}

    public estaDisponible(): boolean {
        return this.estado === ESTADO_VEHICULO.DISPONIBLE;
    }

    public ponerEnMantenimiento(): void{
        this.estado = ESTADO_VEHICULO.EN_MANTENIMIENTO;
    }

    public abstract calcularTarifa(reserva: Reserva): number; 
    
}