import IEstadoVehiculo from "./IEstadoVehiculo";
import Vehiculo from "../vehiculo";
import En_Alquiler from "./en_Alquiler";
import En_Mantenimiento from "./en_Mantenimiento";
import Necesita_Limpieza from "./necesita_Limpieza";

export default class Disponible implements IEstadoVehiculo {

    constructor(private vehiculo: Vehiculo) {}
    estaEnMantenimiento(): boolean {
        return false;
    }

  asignarAlquiler(): void {
    this.vehiculo.cambiarEstado(new En_Alquiler(this.vehiculo));
  }

  asignarDisponible(): void {
    throw new Error("El vehículo ya está disponible.");
  }

  asignarMantenimiento(): void {
    this.vehiculo.cambiarEstado(new En_Mantenimiento(this.vehiculo));
  }

    asignarLimpieza(): void {
        this.vehiculo.cambiarEstado(new Necesita_Limpieza(this.vehiculo));
    }
    
    puedeAlquilar(): boolean {
        return true;
    }

    
}
