import {Vehiculo} from "./vehiculo";
import estadoVehiculo from "./estadoVehiculo";
export default class Sedan extends Vehiculo{

    private estado: estadoVehiculo;
    
        constructor(matricula: string, estado: estadoVehiculo, kilometraje: number){
        super(matricula, 30, kilometraje, 0.20);
        this.estado = estado;
    }

    public calcularTarifa(diasTotales: number, kmRecorridos: number): number {
        const tarifaBase = 50;
        let tarifa = tarifaBase +- (kmRecorridos * this.cargoExtra);

        return tarifa;
    }
}