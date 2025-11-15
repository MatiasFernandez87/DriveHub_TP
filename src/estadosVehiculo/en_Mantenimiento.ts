import IEstadoVehiculo from "./IEstadoVehiculo";
import Vehiculo from "../vehiculo";
import Disponible from "./disponible";
import En_Alquiler from "./en_Alquiler";
import Necesita_Limpieza from "./necesita_Limpieza";

export default class En_Mantenimiento implements IEstadoVehiculo {

    constructor(private vehiculo: Vehiculo) {}

    asignarAlquiler(): void {
        throw new Error("El vehículo está en mantenimiento y no puede ser alquilado.");
    }

    asignarDisponible(): void {
        this.vehiculo.cambiarEstado(new Disponible(this.vehiculo));
    }

    asignarMantenimiento(): void {
        throw new Error("El vehículo ya está en mantenimiento.");
    }

    asignarLimpieza(): void {
        this.vehiculo.cambiarEstado(new Necesita_Limpieza(this.vehiculo));
    }
}