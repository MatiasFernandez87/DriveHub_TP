export default interface IEstadoVehiculo {
  asignarAlquiler(): void;
  asignarDisponible(): void;
  asignarMantenimiento(): void;
  asignarLimpieza(): void;
  puedeAlquilar(): boolean;
}
