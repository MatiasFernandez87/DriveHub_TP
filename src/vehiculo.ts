import IEstadoVehiculo from "./estadosVehiculo/IEstadoVehiculo";
import Reserva from "./reserva";
import Disponible from "./estadosVehiculo/disponible";

export default abstract class Vehiculo{
    protected matricula: string;
    protected tarifaBase: number;
    protected kilometraje: number;
    protected cargoExtra: number;
    protected estadoVehiculo: IEstadoVehiculo;

    constructor(matricula: string, tarifaBase: number, kilometraje: number, cargoExtra: number) {
        this.matricula = matricula;
        this.tarifaBase = tarifaBase;
        this.kilometraje = kilometraje;
        this.cargoExtra = cargoExtra;
        this.estadoVehiculo = new Disponible(this);
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
        return this.estadoVehiculo;
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
    }

    public devolver(): void {
        this.estadoVehiculo.asignarDisponible();
    }

    public enviarAMantenimiento(): void {
        this.estadoVehiculo.asignarMantenimiento();
    }

    public limpiar(): void {
        this.estadoVehiculo.asignarLimpieza();
    } 

    
    public abstract calcularTarifa(reserva: Reserva): number;
}