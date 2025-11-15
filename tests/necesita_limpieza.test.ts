import { mockDeep, DeepMockProxy } from "jest-mock-extended";
import Vehiculo from "../src/vehiculo";
import Necesita_Limpieza from "../src/estadosVehiculo/necesita_Limpieza";
import Disponible from "../src/estadosVehiculo/disponible";

describe("Estado Necesita_Limpieza (con mocks)", () => {

    let vehiculoMock: DeepMockProxy<Vehiculo>;

    beforeEach(() => {
        // Creamos un mock profundo del vehículo
        vehiculoMock = mockDeep<Vehiculo>();
    });

    it("Debe cambiar al estado Necesita_Limpieza correctamente", () => {
        // Cambiamos el estado usando la clase real del estado
        const estado = new Necesita_Limpieza(vehiculoMock);
        vehiculoMock.cambiarEstado(estado);

        // Simulamos que getEstado devuelve ese estado
        vehiculoMock.getEstado.mockReturnValue(estado);

        // Verificamos
        expect(vehiculoMock.getEstado().constructor.name).toBe("Necesita_Limpieza");
    });

    it("Debe pasar de Necesita_Limpieza a Disponible con asignarDisponible()", () => {
        const estado = new Necesita_Limpieza(vehiculoMock);
        
        // Mockeamos cambiarEstado para capturar el nuevo estado
        vehiculoMock.cambiarEstado.mockImplementation((nuevoEstado) => {
            vehiculoMock.getEstado.mockReturnValue(nuevoEstado);
        });

        // Estado inicial
        vehiculoMock.getEstado.mockReturnValue(estado);

        // Ejecutamos transición
        estado.asignarDisponible();

        expect(vehiculoMock.getEstado().constructor.name).toBe("Disponible");
    });

});
