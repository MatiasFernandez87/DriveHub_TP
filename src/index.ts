// ESTE ARCHIVO SE USA PARA PODER UTILILZAR TYPEDOC CORRECTAMENTE


/** Exportación de clases principales */
export { default as Cliente } from "./cliente";
export { default as Reserva } from "./reserva";
export { default as Vehiculo } from "./vehiculo";
export { default as SistemaDriveHub } from "./sistema";

/** Enums */
export * from "./enums/estado_Reserva";

/** Estados de Vehículo (State Pattern) */
export { default as EstadoFactory } from "./estadosVehiculo/estadosFactory";
export { default as Disponible } from "./estadosVehiculo/disponible";
export { default as EnAlquiler } from "./estadosVehiculo/en_Alquiler";
export { default as EnMantenimiento } from "./estadosVehiculo/en_Mantenimiento";
export { default as IEstadoVehiculo } from "./estadosVehiculo/IEstadoVehiculo";
export { default as NecesitaLimpieza } from "./estadosVehiculo/necesita_Limpieza";

/** Módulo necesitaMantenimiento */
export { default as CantViajes } from "./necesitaMantenimiento/cantViajes";
export { default as INecesitaMantenimiento } from "./necesitaMantenimiento/INecesitaMantenimiento";
export { default as KilometrosParaMantenimiento } from "./necesitaMantenimiento/kilometrosParaMantenimiento";
export { default as UltimoMantenimiento } from "./necesitaMantenimiento/ultimoMantenimiento";

/** Reportes */
export { default as GeneradorDeReporte } from "./reportes/generadorReporte";
export { default as IGeneradorReporte } from "./reportes/IgeneradorReporte";

/** Temporadas */
export { default as ITemporada } from "./temporadas/Itemporada";
export { default as TemporadaAlta } from "./temporadas/temporada_alta";
export { default as TemporadaBaja } from "./temporadas/temporada_baja";
export { default as TemporadaMedia } from "./temporadas/temporada_media";

/** Tipos de vehículos */
export { default as Compacto } from "./compacto";
export { default as Sedan } from "./sedan";
export { default as Suv } from "./suv";
