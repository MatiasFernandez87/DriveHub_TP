import En_Alquiler from "../estadosVehiculo/en_Alquiler";
import Disponible from "../estadosVehiculo/disponible";
import En_Mantenimiento from "../estadosVehiculo/en_Mantenimiento";
import Necesita_Limpieza from "../estadosVehiculo/necesita_Limpieza";
import Vehiculo from "../vehiculo";

export default class EstadoFactory {

    static crearDisponible(vehiculo : Vehiculo): Disponible {return new Disponible(vehiculo)};
    static crearEnAlquiler(vehiculo: Vehiculo): En_Alquiler {return new En_Alquiler(vehiculo)};
    static crearENMantenimiento(vehiculo : Vehiculo): En_Mantenimiento{return new En_Mantenimiento(vehiculo)};
    static crearNecesitaLimpieza(vehiculo: Vehiculo): Necesita_Limpieza{return new Necesita_Limpieza(vehiculo)};
}