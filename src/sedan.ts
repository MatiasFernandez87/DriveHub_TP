import Vehiculo from "./vehiculo";
import Reserva from "./reserva";
import { ESTADO_VEHICULO } from "./enums/estado_Vehiculo";
export default class Sedan extends Vehiculo{
    
        constructor(matricula: string, estado: ESTADO_VEHICULO, kilometraje: number){
        super(matricula, 30, kilometraje, 0.20);
        this.estado = estado;
    }

    public calcularTarifa(reserva: Reserva): number {
        let diasAlquiler: number = 0;
        let kmRecorrido: number = 0;

        for (const valor of reserva.getKmRecorridos().values()) { 
            ++diasAlquiler;
            kmRecorrido += valor;
        }

        const tarifaFinal = (diasAlquiler * this.tarifaBase) + (kmRecorrido * this.cargoExtra);
        return tarifaFinal;  
    }
}