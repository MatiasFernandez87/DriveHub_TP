import Vehiculo from "./vehiculo";
import Reserva from "./reserva";
import { ESTADO_VEHICULO } from "./enums/estado_Vehiculo";

export default class SUV extends Vehiculo{
    
    constructor(matricula: string, estado: ESTADO_VEHICULO, kilometraje: number){
        super(matricula, 80, kilometraje, 0.25);
        this.estado = estado;
    }


    public calcularTarifa(reserva: Reserva): number {
        let diasAlquiler: number = 0;        
        let kmRecorridos: number = 0;
        const cargoDiarioSeguro: number = 15;
        const kmMaximoPermitido: number = 500;

        for (const valor of reserva.getKmRecorridos().values())
        {
            ++diasAlquiler;
            kmRecorridos += valor;        
        }

        if (kmRecorridos > kmMaximoPermitido)
        {
            let kmExtra = kmRecorridos - kmMaximoPermitido;
            const tarifaFinal = (diasAlquiler * this.tarifaBase) + (diasAlquiler * cargoDiarioSeguro) + (kmExtra * this.cargoExtra);
            return tarifaFinal;
        } else
        {
            const tarifaFinal = diasAlquiler * this.tarifaBase + diasAlquiler * cargoDiarioSeguro;
            return tarifaFinal;
        }      
    }
}