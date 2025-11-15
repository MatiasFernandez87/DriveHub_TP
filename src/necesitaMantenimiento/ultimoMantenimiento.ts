import Vehiculo from "../vehiculo";
import moment from "moment";

export default class UltimoMantenimiento {
     public necesitaMantenimiento(vehiculo: Vehiculo): boolean {
        const ultimaFecha = moment(vehiculo.getFechaUltimoMantenimiento());
        const haceDoceMeses = moment().subtract(12, "months");

        return ultimaFecha.isBefore(haceDoceMeses);
    }
}