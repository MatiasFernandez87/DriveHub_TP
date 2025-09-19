import { ESTADO_VEHICULO } from "./enums/estado_Vehiculo";

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

    public actualizarKilometraje(nuevoKilometraje: number): void {
         this.kilometraje += nuevoKilometraje;
}

    public estaDisponible(): boolean {
        return this.estado === ESTADO_VEHICULO.DISPONIBLE;
    }

    public abstract calcularTarifa(diasTotales: number, kmRecorridos: number): number;

}