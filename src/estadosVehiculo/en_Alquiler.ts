import IEstadoVehiculo from "./IEstadoVehiculo";
import Vehiculo from "../vehiculo";
import Disponible from "./disponible";
import En_Mantenimiento from "./en_Mantenimiento";
import Necesita_Limpieza from "./necesita_Limpieza";

export default class En_Alquiler implements IEstadoVehiculo {

    constructor(private vehiculo: Vehiculo) {}

    asignarAlquiler(): void {
        throw new Error("El vehículo ya está en alquiler.");
    }

    asignarDisponible(): void {
        this.vehiculo.cambiarEstado(new Disponible(this.vehiculo));
    }

    asignarMantenimiento(): void {
        this.vehiculo.cambiarEstado(new En_Mantenimiento(this.vehiculo));
    }

    asignarLimpieza(): void {
        this.vehiculo.cambiarEstado(new Necesita_Limpieza(this.vehiculo));
    }

    puedeaAlquilar(): boolean {
        return false;
    }
}