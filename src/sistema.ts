import Vehiculo from "./vehiculo";
import Cliente from "./cliente";
import Reserva from "./reserva";
import Mantenimiento from "./mantenimiento";
import IGeneradorReporte from "./reportes/IgeneradorReporte";
import GeneradorDeReporte from "./reportes/generadorReporte";

export default class SistemaDriveHub {
  private vehiculos: Vehiculo[] = [];
  private clientes: Cliente[] = [];
  private reservas: Reserva[] = [];
  private mantenimientos: Mantenimiento[] = [];
  private generadorReporte: GeneradorDeReporte = new GeneradorDeReporte();
  private rentabilidadVehiculos: Map<Vehiculo, number> = new Map();


  public crearReserva(cliente: Cliente, vehiculo: Vehiculo, fechaInicio: Date, fechaFin: Date) {
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
    const vehiculo = reserva.getVehiculo();
    const tarifaBase = vehiculo.calcularTarifa(reserva);
    const porcentajeTemporada = reserva.getTemporada().calculoPorTemporada();
    const tarifaFinal = tarifaBase * porcentajeTemporada;

    vehiculo.necesitaMantenimiento();
    this.asignarRentabilidad(vehiculo, tarifaFinal);

    return tarifaFinal;
  }

  private asignarRentabilidad(vehiculo: Vehiculo, tarifaFinal: number)
  {
	const rentabilidadActual = this.rentabilidadVehiculos.get(vehiculo) ?? 0;
	this.rentabilidadVehiculos.set(vehiculo, rentabilidadActual + tarifaFinal);
  }

  public reporteVehiculosOcupados(fechaBusqueda: Date): number {
	const ocupados = this.generadorReporte.vehiculosOcupados(fechaBusqueda, this.vehiculos, this.reservas)
    return ocupados;
  }

  public reporteVehiculoMasAlquilado(fechaInicio: Date, fechaFin: Date): Vehiculo {
    const vehiculoMasAlquilado = this.generadorReporte.vehiculoMasAlquilado(fechaInicio, fechaFin, this.reservas)
    return vehiculoMasAlquilado;  
  }

  public reporteVehiculoMenosAlquilado(fechaInicio: Date, fechaFin: Date): Vehiculo {
    const vehiculoMenosAlquilado = this.generadorReporte.vehiculoMenosAlquilado(fechaInicio, fechaFin, this.reservas)
    return vehiculoMenosAlquilado;
  }
}
