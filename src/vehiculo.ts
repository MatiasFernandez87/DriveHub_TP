import IEstadoVehiculo from "./estadosVehiculo/IEstadoVehiculo";
import Reserva from "./reserva";
import Disponible from "./estadosVehiculo/disponible";
import INecesitaMantenimiento from "./necesitaMantenimiento/INecesitaMantenimiento";
import KilometrosParaMantenimiento from "./necesitaMantenimiento/kilometrosParaMantenimiento";
import CantViajes from "./necesitaMantenimiento/cantViajes";
import UltimoMantenimiento from "./necesitaMantenimiento/ultimoMantenimiento";
import moment from  "moment";

export default abstract class Vehiculo{
    protected matricula: string;
    protected tarifaBase: number;
    protected kilometraje: number;
    protected cargoExtra: number;
    protected estadoVehiculo: IEstadoVehiculo;
    protected kmUltimoMantenimiento: number;
    protected cantidadViajes: number;
    protected fechaUltimoMantenimiento:Date = undefined as unknown as Date;
    protected condicionesMantenimiento : INecesitaMantenimiento[] = [new KilometrosParaMantenimiento(), new CantViajes(), new UltimoMantenimiento()];
    

    constructor(matricula: string, tarifaBase: number, kilometraje: number, cargoExtra: number) {
        this.matricula = matricula;
        this.tarifaBase = tarifaBase;
        this.kilometraje = kilometraje;
        this.cargoExtra = cargoExtra;
        this.estadoVehiculo = new Disponible(this);
        this.kmUltimoMantenimiento = 0;
        this.cantidadViajes = 0;
    }


    public necesitaMantenimiento(): void{
        for(const r of this.condicionesMantenimiento){
            if(r.necesitaMantenimiento(this)){
                this.enviarAMantenimiento(new Date());
                this.fechaUltimoMantenimiento = new Date();
                return;
            }
        }
        this.devolver();
    }

  
    public getMatricula(): string {
        return this.matricula;
    }

  public getTarifaBase(): number {
    return this.tarifaBase;
  }

  public getKilometraje(): number {
    return this.kilometraje;
  }

  public getCargoExtra(): number {
    return this.cargoExtra;
  }

    public getEstado(): IEstadoVehiculo {
        
         if (this.estadoVehiculo.estaEnMantenimiento()) {

        const hace24hs = moment().subtract(24, "hours");

        if (moment(this.fechaUltimoMantenimiento).isBefore(hace24hs)) {
            this.devolver();
        }
    }

        return this.estadoVehiculo;
    }

    public setKmUltimoMantenimiento(km: number): void {
        this.kmUltimoMantenimiento = km;
    }
    public setCantidadViajes(cant: number): void {
        this.cantidadViajes = cant;
    }

    public setFechaUltimoMantenimiento(fecha: Date): void {
        this.fechaUltimoMantenimiento = fecha;
    }

    public getCantidadViajes(): number {
        return this.cantidadViajes;
    }

    public getFechaUltimoMantenimiento(): Date {
        return this.fechaUltimoMantenimiento;
    }


    public getKmUltimoMantenimiento(): number {
        return this.kmUltimoMantenimiento;
    }

    
    public setMatricula(matricula: string): void {
        this.matricula = matricula;
    }

  public setTarifaBase(tarifaBase: number): void {
    this.tarifaBase = tarifaBase;
  }

  public setKilometraje(kilometraje: number): void {
    this.kilometraje = kilometraje;
  }

  public setCargoExtra(cargoExtra: number): void {
    this.cargoExtra = cargoExtra;
  }

  public actualizarKilometraje(nuevo: number): void {
    this.kilometraje += nuevo;
  }

    public cambiarEstado(estado: IEstadoVehiculo): void {
        this.estadoVehiculo = estado;
    }

   
    public alquilar(): void {
        this.estadoVehiculo.asignarAlquiler();
        this.cantidadViajes++;
    }

  public devolver(): void {
    this.estadoVehiculo.asignarDisponible();
  }

    public enviarAMantenimiento(ingreso : Date): void {
        this.fechaUltimoMantenimiento = ingreso;
        this.estadoVehiculo.asignarMantenimiento();
    }

  public limpiar(): void {
    this.estadoVehiculo.asignarLimpieza();
  }

  public abstract calcularTarifa(reserva: Reserva): number;
}
