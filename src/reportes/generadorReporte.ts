import Vehiculo from "../vehiculo";
import Reserva from "../reserva";
import IGeneradorReporte from "./IgeneradorReporte";
import moment, { max } from "moment";

export default class GeneradorDeReporte implements IGeneradorReporte {
  constructor() {}

  public vehiculoMasAlquilado(
    fechaInicio: Date,
    fechaFin: Date,
    reservas: Reserva[]
  ): Vehiculo {
    const vehiculosAlquilados = new Map<Vehiculo, number>();
    let masAlquilado: Vehiculo = undefined as unknown as Vehiculo;
    let max = 0;

    const reservasActivas = reservas.filter(
      (r) =>
        moment(fechaInicio).isBefore(r.getFechaFin()) &&
        moment(fechaFin).isAfter(r.getFechaInicio())
    );

    reservasActivas.forEach((r) => {
      const vehiculo = r.getVehiculo();
      const cantAlquiler = vehiculosAlquilados.get(vehiculo) ?? 0;
      vehiculosAlquilados.set(vehiculo, cantAlquiler + 1);
    });

    if (vehiculosAlquilados.size === 0) {
      throw new Error( "No hay vehiculos alquilados en el periodo especificado.");
    }
    vehiculosAlquilados.forEach((cantidad, v) => {
      if (cantidad > max) {
        max = cantidad;
        masAlquilado = v;
      }
    });

    return masAlquilado;
  }

  public vehiculoMenosAlquilado(fechaInicio: Date, fechaFin: Date, reservas: Reserva[]): Vehiculo{
    const vehiculosAlquilados = new Map<Vehiculo, number>();
    let min = Infinity;
    let menosAlquilado: Vehiculo = undefined as unknown as Vehiculo;

    const reservasActivas = reservas.filter(
      (r) =>
        moment(fechaInicio).isBefore(r.getFechaFin()) &&
        moment(fechaFin).isAfter(r.getFechaInicio())
    );

    reservasActivas.forEach((r) => {
      const vehiculo = r.getVehiculo();
      const cantAlquiler = vehiculosAlquilados.get(vehiculo) ?? 0;
      vehiculosAlquilados.set(vehiculo, cantAlquiler + 1);
    });

    if (vehiculosAlquilados.size === 0) {
       throw new Error("No hay vehiculos alquilados en el periodo especificado.");
    };

    vehiculosAlquilados.forEach((cantidad, v) => {
      if (cantidad < min) {
        min = cantidad;
        menosAlquilado = v;
      }
    });

    return menosAlquilado;
  }

  public vehiculoMasRentable(vehiculos: Map<Vehiculo, number>): Vehiculo {
    throw new Error("Method not implemented.");
  }

  public vehiculoMenosRentable(vehiculos: Map<Vehiculo, number>): Vehiculo {
    throw new Error("Method not implemented.");
  }

  public vehiculosOcupados(
    fechaBusqueda: Date,
    vehiculo: Vehiculo[],
    reserva: Reserva[]
  ): number {
    throw new Error("Method not implemented.");
  }
}
