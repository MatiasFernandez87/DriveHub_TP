import Vehiculo from "./vehiculo";
import Cliente from "./cliente";
import Reserva from "./reserva";
import IGeneradorReporte from "./reportes/IgeneradorReporte";
import GeneradorDeReporte from "./reportes/generadorReporte";

export default class SistemaDriveHub {
  private vehiculos: Vehiculo[] = [];
  private clientes: Cliente[] = [];
  private reservas: Reserva[] = [];
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
	this.rentabilidadVehiculos.set(vehiculo, (rentabilidadActual + tarifaFinal) - vehiculo.getCostoTotalMantenimiento());
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
	
	public reporteVehiculoMasRentable(): Vehiculo {
		const vehiculoMasRentable = this.generadorReporte.vehiculoMasRentable(this.rentabilidadVehiculos)
		return vehiculoMasRentable;
	}

	public reporteVehiculoMenosRentable(): Vehiculo {
		const vehiculoMenosRentable = this.generadorReporte.vehiculoMenosRentable(this.rentabilidadVehiculos)
		return vehiculoMenosRentable;
	}

}
