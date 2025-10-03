import Vehiculo from './vehiculo';
import Cliente from './cliente';
import Reserva from './reserva';
import Mantenimiento from './mantenimiento';
import { ESTADO_VEHICULO } from './enums/estado_Vehiculo';

export default class SistemaDriveHub {
    private vehiculos: Vehiculo[] = [];
    private clientes: Cliente[] = [];
    private reservas: Reserva[] = [];
    private mantenimientos: Mantenimiento[] = [];

    public crearReserva(cliente: Cliente, vehiculo: Vehiculo, fechaInicio: Date, fechaFin: Date)
    {
        if (vehiculo.estaDisponible())
        {
            let reserva = new Reserva(vehiculo, cliente, fechaInicio, fechaFin);
            this.reservas.push(reserva);
            vehiculo.setEstado(ESTADO_VEHICULO.EN_ALQUILER)
            cliente.setReserva(reserva);
        } else
        {
            throw new Error("El vehiculo no esta disponible.");
        }
    }

    public asignarMantenimiento(vehiculo: Vehiculo, fecha: Date, costo: number)
    {
        this.mantenimientos.push(new Mantenimiento(vehiculo, fecha, costo));
        vehiculo.ponerEnMantenimiento();
    }
}