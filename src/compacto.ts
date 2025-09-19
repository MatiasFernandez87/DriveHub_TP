import Vehiculo from "./vehiculo";
import { ESTADO_VEHICULO } from "./enums/estado_Vehiculo";
export default class Compacto extends Vehiculo{
    
    constructor(matricula: string, estado: ESTADO_VEHICULO, kilometraje: number){
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