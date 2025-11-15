import Vehiculo from "../vehiculo";

export default interface INecesitaMantenimiento {
    necesitaMantenimiento(vehiculo : Vehiculo): boolean;
}
