import Vehiculo from "./vehiculo"

export default class Mantenimiento{

    private vehiculo: Vehiculo;
    private fecha: Date;
    private costo: number;


    constructor(_vehiculo:Vehiculo, _fecha:Date, _costo: number){

        this.vehiculo = _vehiculo;
        this.fecha = _fecha;
        this.costo = _costo;

    }

    public setVehiculo (value: Vehiculo){
        this.vehiculo = value;
    }

    public getVehiculo (){
        return this.vehiculo;
    }

    public setFecha (value: Date){
        this.fecha = value;
    }

    public getFecha (){
        return this.fecha;
    }

    public setCosto (value: number){
        this.costo = value;
    }

    public getCosto (){
        return this.costo;
    }




}