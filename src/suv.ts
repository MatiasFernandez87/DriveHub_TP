import Vehiculo from "./vehiculo";
import {estadoVehiculo} from "./estadoVehiculo";

export default class SUV extends Vehiculo{
    
    constructor(matricula: string, estado: estadoVehiculo, kilometraje: number){
        super(matricula, 80, kilometraje, 0.25);
        this.estado = estado;
    }


    public calcularTarifa(diasTotales: number, kmRecorridos: number): number {
        const tarifaBase = 80;
        const conceptoSeguro = (tarifaBase + 15);
        const kmPermitidos = 500;

        let tarifa = conceptoSeguro * diasTotales;

        if(kmRecorridos > kmPermitidos){
            const cargoExtra = (kmRecorridos - kmPermitidos)
            tarifa += cargoExtra * 0.25;
        }
        
        return tarifa;
    }
}