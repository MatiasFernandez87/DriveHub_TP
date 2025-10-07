import Vehiculo from "./vehiculo";
import { ESTADO_VEHICULO } from "./enums/estado_Vehiculo";
import Reserva from "./reserva";
export default class Compacto extends Vehiculo{
    
    constructor(matricula: string, estado: ESTADO_VEHICULO, kilometraje: number){
        super(matricula, 30, kilometraje, 0.15);
        this.estado = estado;
    }

public calcularTarifa(reserva: Reserva): number {
    let diasAlquiler: number = 0;
    let kmExtra: number = 0;

    for (const valor of reserva.getKmRecorridos().values()) {
        ++diasAlquiler;
        if (valor > 100)
        {
            kmExtra += valor - 100;            
        }
    }

    const tarifaFinal = (diasAlquiler * this.tarifaBase) + (kmExtra * this.cargoExtra);
    return tarifaFinal
}

}