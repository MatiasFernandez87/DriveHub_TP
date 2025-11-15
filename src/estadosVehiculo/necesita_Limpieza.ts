import IEstadoVehiculo from "./IEstadoVehiculo";
import Vehiculo from "../vehiculo";
import Disponible from "./disponible";
import En_Mantenimiento from "./en_Mantenimiento";
import En_Alquiler from "./en_Alquiler";

export default class Necesita_Limpieza implements IEstadoVehiculo {

    constructor(private vehiculo: Vehiculo) {}

    asignarAlquiler(): void {
        throw new Error("El vehículo necesita limpieza y no puede ser alquilado.");
    }

    asignarDisponible(): void {
        this.vehiculo.cambiarEstado(new Disponible(this.vehiculo));
    }

    asignarMantenimiento(): void {
        this.vehiculo.cambiarEstado(new En_Mantenimiento(this.vehiculo));
    }

    asignarLimpieza(): void {
        throw new Error("El vehículo ya está en estado de 'Necesita Limpieza'.");
    }

    puedeaAlquilar(): boolean {
        return false;
    }
}