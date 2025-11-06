import Cliente from "../src/cliente";
import Reserva from "../src/reserva";
import Vehiculo from "../src/vehiculo";
import {DeepMockProxy, mockDeep} from "jest-mock-extended";


describe("Test clase Reserva", () => {

    it("Debe registrar los km hechos al total del vehiculo", () => {

        const vehiculoMock: DeepMockProxy<Vehiculo> = mockDeep<Vehiculo>();
        const clienteMock: DeepMockProxy<Cliente> = mockDeep<Cliente>();
        const reserva = new Reserva(vehiculoMock, clienteMock, new Date(), new Date());

       
        reserva.registrarUsoVehiculo(150, new Date());
        reserva.registrarUsoVehiculo(150, new Date());
        reserva.registrarUsoVehiculo(150, new Date());

        expect(vehiculoMock.getKilometraje.mockReturnValue(450));
    });
});