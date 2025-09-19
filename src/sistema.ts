import Vehiculo from './vehiculo';
import Cliente from './cliente';
import Reserva from './reserva';
import Mantenimiento from './mantenimiento';

export default class SistemaDriveHub {
    private vehiculos: Vehiculo[] = [];
    private clientes: Cliente[] = [];
    private reservas: Reserva[] = [];
    private mantenimientos: Mantenimiento[] = [];

    public static crearReserva(cliente: Cliente, vehiculo: Vehiculo, fechaInicio: Date, fechaFin: Date)
    {
        if (this.vehiculo.estaDisponible())
        {
            let reserva = new Reserva(cliente, vehiculo, fechaInicio, fechaFin, vehiculo.getKilometraje());
            this.reservas.push(reserva);
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