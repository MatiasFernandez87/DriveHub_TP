import Reserva from "../reserva";
import Vehiculo from "../vehiculo";

export default interface IGeneradorReporte {
    vehiculoMasAlquilado(fechaInicio : Date, fechaFin: Date, vehiculo: Vehiculo[], reserva: Reserva[]): Vehiculo;
    vehiculoMenosAlquilado(fechaInicio : Date, fechaFin: Date, vehiculo: Vehiculo[], reserva: Reserva[]): Vehiculo;
    vehiculoMasRentable(vehiculos: Map <Vehiculo,number> ): Vehiculo;
    vehiculoMenosRentable(vehiculos: Map <Vehiculo,number>): Vehiculo;
    vehiculoOcupados(fechaBusqueda : Date, vehiculo: Vehiculo[], reserva: Reserva[]): number;
}