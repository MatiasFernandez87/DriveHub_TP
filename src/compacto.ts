import {Vehiculo} from "./vehiculo";
import {estadoVehiculo} from "./estadoVehiculo";
export class Compacto extends Vehiculo{

    private estado: estadoVehiculo;
    
    constructor(matricula: string, estado: estadoVehiculo, kilometraje: number){
        super(matricula, 30, kilometraje, 0.15);
        this.estado = estado;
    }

public calcularTarifa(diasTotales: number, kmRecorridos: number): number {
    const tarifaBase = 30;
    const kmPermitidos = 100 * diasTotales;;
    let tarifa = tarifaBase * diasTotales;

    if(kmRecorridos > kmPermitidos){
        const cargoExtra = (kmRecorridos - kmPermitidos)
        tarifa += cargoExtra * 0.15;
    }
    return tarifa;
}

}