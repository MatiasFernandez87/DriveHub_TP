import Vehiculo from "../vehiculo";

export default class KilometrosParaMantenimiento {
    public necesitaMantenimiento(vehiculo : Vehiculo): boolean {
        return vehiculo.getKmUltimoMantenimiento() + 10000 <= vehiculo.getKilometraje();
    }
}
