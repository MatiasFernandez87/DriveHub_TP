import Vehiculo from "./vehiculo";
import Cliente from "./cliente";
import ITemporada from "./temporadas/Itemporada";
import moment from "moment";
import TemporadaAlta from "./temporadas/temporada_alta";
import TemporadaMedia from "./temporadas/temporada_media";
import TemporadaBaja from "./temporadas/temporada_baja";

/**
 * Representa una reserva realizada por un cliente para un vehículo,
 * incluyendo fechas, kilometraje y temporada correspondiente.
 */
export default class Reserva {

  /** Contador interno utilizado para generar IDs únicos de reserva. */
  private static idBase = 0;

  /** Identificador único de la reserva. */
  private idReserva: number;

  /** Vehículo asociado a la reserva. */
  private vehiculo: Vehiculo;

  /** Cliente que realizó la reserva. */
  private cliente: Cliente;

  /** Fecha de inicio de la reserva. */
  private fechaInicio: Date;

  /** Fecha de finalización de la reserva. */
  private fechaFin: Date;

  /** Kilometraje del vehículo al inicio de la reserva. */
  private kmInicial: number;

  /**
   * Registro de kilómetros recorridos por día durante la reserva.
   * La clave es la fecha y el valor los kilómetros acumulados ese día.
   */
  private kmRecorridos: Map<Date, number> = new Map();

  /** Temporada correspondiente a la fecha de la reserva. */
  private temporada: ITemporada;

  /**
   * Crea una nueva instancia de una reserva.
   * 
   * @param vehiculo - Vehículo que será alquilado.
   * @param cliente - Cliente que realiza la reserva.
   * @param fechaInicio - Fecha de inicio del alquiler.
   * @param fechaFin - Fecha de finalización del alquiler.
   */
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
    this.temporada = this.setTemporada();
  }

  /**
   * Obtiene el identificador único de la reserva.
   * @returns ID numérico de la reserva.
   */
  public getIdReserva(): number {
    return this.idReserva;
  }

  /**
   * Devuelve el cliente asociado a la reserva.
   * @returns Instancia de Cliente.
   */
  public getCliente(): Cliente {
    return this.cliente;
  }

  /**
   * Devuelve el vehículo asociado a la reserva.
   * @returns Instancia de Vehiculo.
   */
  public getVehiculo(): Vehiculo {
    return this.vehiculo;
  }

  /**
   * Obtiene la temporada correspondiente a la fecha de la reserva.
   * @returns Instancia que implementa ITemporada.
   */
  public getTemporada(): ITemporada {
    return this.temporada;
  }

  /**
   * Obtiene el mapa de kilómetros recorridos por día.
   * @returns Mapa con fecha → kilómetros.
   */
  public getKmRecorridos(): Map<Date, number> {
    return this.kmRecorridos;
  }

  /**
   * Obtiene la fecha en la que comienza la reserva.
   * @returns Fecha de inicio.
   */
  public getFechaInicio(): Date {
    return this.fechaInicio;
  }

  /**
   * Obtiene la fecha en la que finaliza la reserva.
   * @returns Fecha de fin.
   */
  public getFechaFin(): Date {
    return this.fechaFin;
  }

  /**
   * Registra los kilómetros recorridos por el cliente en un día específico,
   * y actualiza el kilometraje total del vehículo.
   * 
   * @param kilometros - Cantidad de kilómetros recorridos en ese día.
   * @param dia - Fecha en la que se registraron los kilómetros.
   */
  public registrarUsoVehiculo(kilometros: number, dia: Date): void {
    if (dia < this.fechaInicio || dia > this.fechaFin) {
        throw new Error(
            "No se puede registrar uso fuera de las fechas de la reserva."
        );
    }
    this.kmRecorridos.set(dia, kilometros);
    this.vehiculo.actualizarKilometraje(kilometros);
}

  /**
   * Determina y asigna la temporada correspondiente en función
   * del día del año de la fecha de inicio.
   * 
   * - 1 a 80 → Temporada Alta  
   * - 81 a 264 → Temporada Baja  
   * - 265 a 365 → Temporada Media
   * 
   * @returns Instancia de la temporada asignada.
   */
  public setTemporada(): ITemporada {
    const dia = moment(this.fechaInicio).dayOfYear();

    if (dia >= 1 && dia <= 80) {
      return new TemporadaAlta();
    } else if (dia >= 81 && dia <= 264) {
      return new TemporadaBaja();
    } else {
      return new TemporadaMedia();
    }
  }

}
