import {estadoVehiculo} from "./estadoVehiculo";
export default abstract class Vehiculo{
    protected matricula: string;
    protected tarifaBase: number;
    protected kilometraje: number;
    protected cargoExtra: number;
    protected estado : estadoVehiculo;

    constructor(matricula: string, tarifaBase: number, kilometraje: number, cargoExtra: number){
        this.matricula = matricula;
        this.tarifaBase = tarifaBase;
        this.kilometraje = kilometraje;
        this.cargoExtra = cargoExtra;
        this.estado = estadoVehiculo.Disponible;
    }

    public actualizarKilometraje(nuevoKilometraje: number): void {
         this.kilometraje += nuevoKilometraje;
}

    public estaDisponible(): boolean {
        return this.estado === estadoVehiculo.Disponible;
    }


    public abstract calcularTarifa(diasTotales: number, kmRecorridos: number): number;

}