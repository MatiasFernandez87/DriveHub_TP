import Vehiculo from "../vehiculo";
import Reserva from "../reserva";
import IGeneradorReporte from "./IgeneradorReporte";

export default class GeneradorDeReporte implements IGeneradorReporte {
   
    constructor() {
    }

   public vehiculoMasAlquilado(fechaInicio : Date, fechaFin: Date, vehiculo: Vehiculo[], reserva: Reserva[]): Vehiculo {
       throw new Error("Method not implemented."); 
    }

   public vehiculoMenosAlquilado(fechaInicio : Date, fechaFin: Date, vehiculo: Vehiculo[], reserva: Reserva[]): Vehiculo{
        throw new Error("Method not implemented.");
    }

   public vehiculoMasRentable(vehiculos: Map <Vehiculo,number>): Vehiculo {
        throw new Error("Method not implemented.");
    }

   public vehiculoMenosRentable(vehiculos: Map <Vehiculo,number>): Vehiculo {
        throw new Error("Method not implemented.");
    }

   public vehiculoOcupados(fechaBusqueda : Date, vehiculo: Vehiculo[], reserva: Reserva[]): number {
        throw new Error("Method not implemented.");
    }

}