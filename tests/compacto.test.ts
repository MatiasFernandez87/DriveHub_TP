import Compacto from '../src/compacto';
import Reserva from '../src/reserva';
import { ESTADO_VEHICULO } from '../src/enums/estado_Vehiculo';
import {DeepMockProxy, mockDeep} from 'jest-mock-extended';

describe('Tests de la clase Compacto', () => {

    let compacto = new Compacto("ABC123", 0, 10000); 

    it('Debe ser una instancia de la clase Compacto', () => {
        expect(compacto).toBeInstanceOf(Compacto);
    })

    it('Debe calcular la tarifa correctamente sin km extra', () => {
        const reservaMock: DeepMockProxy<Reserva> = mockDeep<Reserva>();
       
         reservaMock.getKmRecorridos.mockReturnValue(new Map<Date, number>([
            [new Date(2025, 1, 1), 80],
            [new Date(2025, 1, 2), 90],
        ]));

        
        expect(compacto.calcularTarifa(reservaMock)).toBe(60); 

    })
    it('Debe calcular la tarifa correctamente con km extra', () => {
        const reservaMock: DeepMockProxy<Reserva> = mockDeep<Reserva>();   
        reservaMock.getKmRecorridos.mockReturnValue(new Map<Date, number>([
            [new Date(2025, 1, 1), 120],
            [new Date(2025, 1, 2), 150],
        ]));

        expect(compacto.calcularTarifa(reservaMock)).toBe(70.5);
    })

    it('Debe poder sumar km correctamente al historial del vehiculo', () => {
    let kilometraje = 0;
    compacto.setKilometraje(kilometraje);

    compacto.actualizarKilometraje(200);
    expect(compacto.getKilometraje()).toBe(200);  
  });

  it("Debe poder ver el estado del vehiculo disponible", () => {
    compacto.setEstado(ESTADO_VEHICULO.DISPONIBLE);
    expect(compacto.getEstado()).toBe(0);    
  });

  it("Debe setear una matricula correctamente", () => {
    compacto.setMatricula("XYZ789");
    expect(compacto.getMatricula()).toBe("XYZ789");    
  });

  it("Debe setear una tarifa base correctamente", () => {
    compacto.setTarifaBase(80);
    expect(compacto.getTarifaBase()).toBe(80);    
  });

  it("Debe setear un cargo extra correctamente", () => {
    compacto.setCargoExtra(15);
    expect(compacto.getCargoExtra()).toBe(15);    
  });

  it("Debe setear el kilometraje correctamente", () => {
    compacto.setKilometraje(5000);
    expect(compacto.getKilometraje()).toBe(5000);    
  });

  it("Debe poner el vehiculo en mantenimiento", () => {
    compacto.ponerEnMantenimiento();
    expect(compacto.getEstado()).toBe(ESTADO_VEHICULO.EN_MANTENIMIENTO);    
  });

  it("Debe traer una matricula correctamente", () => {
    expect(compacto.getMatricula()).toBe("XYZ789");    
  });

  it("Debe traer una tarifa base correctamente", () => {
    expect(compacto.getTarifaBase()).toBe(80);    
  });  
    
  it("Debe traer un cargo extra correctamente", () => {
    expect(compacto.getCargoExtra()).toBe(15);    
  });
  
  it("Debe traer un kilometraje correctamente", () => {
    expect(compacto.getKilometraje()).toBe(5000);
    });

it("Debe traer el estado del vehiculo correctamente", () => {
    expect(compacto.getEstado()).toBe(ESTADO_VEHICULO.EN_MANTENIMIENTO);    
  });

});

