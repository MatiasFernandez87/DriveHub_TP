import Vehiculo from "../vehiculo";

export default class CantViajes {
    public necesitaMantenimiento(vehiculo : Vehiculo): boolean {
        let superaViajes : boolean = vehiculo.getCantidadViajes() >= 5;   
        vehiculo.setCantidadViajes(0);
        return superaViajes;
    }
}