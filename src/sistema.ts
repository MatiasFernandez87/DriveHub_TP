import Vehiculo from "./vehiculo";
import Cliente from "./cliente";
import Reserva from "./reserva";
import Mantenimiento from "./mantenimiento";

export default class SistemaDriveHub {
  private vehiculos: Vehiculo[] = [];
  private clientes: Cliente[] = [];
  private reservas: Reserva[] = [];
  private mantenimientos: Mantenimiento[] = [];

  public crearReserva(
    cliente: Cliente,
    vehiculo: Vehiculo,
    fechaInicio: Date,
    fechaFin: Date
  ) {
    if (vehiculo.getEstado().puedeAlquilar()) {
      let reserva = new Reserva(vehiculo, cliente, fechaInicio, fechaFin);
      this.reservas.push(reserva);
      vehiculo.alquilar();
      cliente.setReserva(reserva);
    } else {
      throw new Error("El vehiculo no esta disponible.");
    }
  }

  public asignarMantenimiento(vehiculo: Vehiculo, fecha: Date, costo: number) {
    this.mantenimientos.push(new Mantenimiento(vehiculo, fecha, costo));
    vehiculo.enviarAMantenimiento(new Date());
  }

  public calcularTarifaFinal(reserva: Reserva): number {
    const tarifaBase = reserva.getVehiculo().calcularTarifa(reserva);
    const porcentajeTemporada = reserva.getTemporada().calculoPorTemporada();
    const tarifaFinal = tarifaBase * porcentajeTemporada;

    reserva.getVehiculo().necesitaMantenimiento();

    return tarifaFinal;
  }
}
