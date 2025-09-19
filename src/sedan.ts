import Vehiculo from "./vehiculo";
import { ESTADO_VEHICULO } from "./enums/estado_Vehiculo";
export default class Sedan extends Vehiculo{
    
        constructor(matricula: string, estado: ESTADO_VEHICULO, kilometraje: number){
        super(matricula, 30, kilometraje, 0.20);
        this.estado = estado;
    }

    public calcularTarifa(diasTotales: number, kmRecorridos: number): number {
     let tarifa = this.tarifaBase +- (kmRecorridos * this.cargoExtra);

        return tarifa;
    }
}