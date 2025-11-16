# DriveHub_TP
#  DriveHub – Sistema Integral de Gestión de Alquiler de Vehículos

DriveHub es un sistema orientado a objetos para la administración completa de una flota de vehículos, incluyendo reservas, cálculo de tarifas, gestión de mantenimiento, control de estados y reportes de uso/rentabilidad.

---

##  Características principales

###  Gestión completa del ciclo de vida del vehículo
- Estados: `Disponible`, `En_Alquiler`, `En_Mantenimiento`, `Necesita_Limpieza`.
- Cambios automáticos de estado según reglas del sistema.
- Control del mantenimiento por diferentes estrategias:
  - `CantViajes`
  - `KilometrosParaMantenimiento`
  - `UltimoMantenimiento`

###  Sistema de reservas
- Creación de reservas con validación de disponibilidad.
- Registro diario de kilómetros recorridos.
- Determinación automática de temporada (alta, baja, media).

###  Cálculo de tarifas según tipo de vehículo
Cada subclase implementa su propia tarifa:
- `Compacto`
- `Sedan`
- `SUV`

###  Reportes
El sistema genera:
- Vehículo más alquilado
- Vehículo menos alquilado
- Vehículo más rentable
- Vehículo menos rentable
- Porcentaje de vehículos ocupados en una fecha determinada

###  Cobertura de Tests
Incluye tests unitarios para:
- Estados del vehículo (Patrón State)
- Estrategias de mantenimiento (Patrón Strategy)
- Cálculo de tarifas por tipo de vehículo
- Métodos clave de `Vehiculo`, `Reserva` y clases auxiliares

---

##  Arquitectura general

El sistema implementa diferentes patrones:

###  Patrón **State**
Representado por:
- `IEstadoVehiculo`
- Estados concretos:
  - `Disponible`
  - `En_Alquiler`
  - `En_Mantenimiento`
  - `Necesita_Limpieza`

###  Patrón **Strategy**
Para determinar si un vehículo requiere mantenimiento:
- `INecesitaMantenimiento`
- Estrategias concretas:
  - `CantViajes`
  - `KilometrosParaMantenimiento`
  - `UltimoMantenimiento`

###  Jerarquía de vehículos
- `Vehiculo` (abstracta)
  - `Compacto`
  - `Sedan`
  - `SUV`

###  Sistema principal
- `SistemaDriveHub` administra:
  - Vehículos
  - Reservas
  - Clientes
  - Reportes

-----------------------------------------------------------------------------------------------------------------------------------------------------------

##  Instalación

Ejecutá los siguientes comandos:

```bash
npm install

npm run buils

npm run start

--------------------------------------------------------------------------------------------------------------------------------------------------------

Flujo de funcionamiento del sistema

El cliente solicita una reserva

El sistema valida disponibilidad

Se crea la reserva y registra el kilometraje inicial

El cliente maneja y se registran los kilómetros por día

Al finalizar:

Se calcula la tarifa base según el tipo de vehículo

Se calcula la tarifa final y se aplica porcentaje segun temporada que se encuentra

Se evalúan todas las estrategias de mantenimiento

Si cumple alguna → va a En Mantenimiento

Si no → vuelve a Disponible

El sistema actualiza reportes de uso y rentabilidad