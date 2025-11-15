import Vehiculo from "./vehiculo";
import { ESTADO_RESERVA } from "./enums/estado_Reserva"; 
import Cliente from "./cliente";
import ITemporada from "./temporadas/Itemporada";
import moment from "moment";
import TemporadaAlta from "./temporadas/temporada_alta";
import TemporadaMedia from "./temporadas/temporada_media";
import TemporadaBaja from "./temporadas/temporada_baja";

export default class Reserva {
  private static idBase = 0;
  private idReserva: number;
  private vehiculo: Vehiculo;
  private cliente: Cliente;
  private fechaInicio: Date;
  private fechaFin: Date;
  private kmInicial: number;
  private kmRecorridos: Map<Date, number> = new Map();
  private estadoReserva: ESTADO_RESERVA;
  private temporada: ITemporada;

  constructor(
    vehiculo: Vehiculo,
    cliente: Cliente,
    fechaInicio: Date,
    fechaFin: Date
  ) {
    this.idReserva = Reserva.idBase++;
    this.vehiculo = vehiculo;
    this.cliente = cliente;
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
    this.kmInicial = vehiculo.getKilometraje();
    this.estadoReserva = ESTADO_RESERVA.EN_CURSO;
    this.temporada = this.setTemporada();
  }

  public getIdReserva(): number {
    return this.idReserva;
  }

  public getEstado(): ESTADO_RESERVA {
    return this.estadoReserva;
  }

  public getCliente(): Cliente {
    return this.cliente;
  }

  public getVehiculo(): Vehiculo {
    return this.vehiculo;
  }

  public getTemporada(): ITemporada {
    return this.temporada;
  }

    public getKmRecorridos(): Map<Date, number>{
        return this.kmRecorridos;
    }

    public getFechaInicio(): Date{
        return this.fechaInicio;
    }

    public getFechaFin(): Date{
        return this.fechaFin;
    }   

  public registrarUsoVehiculo(kilometros: number, dia: Date): void {
    this.kmRecorridos.set(dia, kilometros);
    this.vehiculo.actualizarKilometraje(kilometros);
  }

  public setTemporada(): ITemporada {
    const dia = moment(this.fechaInicio).dayOfYear(); //Esta funcion nos da, en base a una fecha, que dia del año es.

    if (dia >= 1 && dia <= 80) {
      // Del 1-Enero a 21-Marzo
      return new TemporadaAlta();
    } else if (dia >= 81 && dia <= 264) {
      // Del 22-Marzo al 21-Sept
      return new TemporadaBaja();
    } else {
      return new TemporadaMedia();
    }
  }

  public getFechaInicio(): Date {
    return this.fechaInicio;
  }

  public getFechaFin(): Date {
    return this.fechaFin;
  }
}