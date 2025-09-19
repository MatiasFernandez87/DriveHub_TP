import Vehiculo from "./vehiculo";
import {estadoVehiculo} from "./estadoVehiculo";

export default class SUV extends Vehiculo{
    
    constructor(matricula: string, estado: estadoVehiculo, kilometraje: number){
        super(matricula, 80, kilometraje, 0.25);
        this.estado = estado;
    }


    public calcularTarifa(diasTotales: number, kmRecorridos: number): number {
        const tarifaDiaria = (this.tarifaBase + 15);
        const kmPermitidos = 500;

        let tarifa = tarifaDiaria * diasTotales;

        if(kmRecorridos > kmPermitidos){
            const kmExtra = (kmRecorridos - kmPermitidos)
            tarifa += kmExtra * 0.25;
        }

        return tarifa;
    }
}