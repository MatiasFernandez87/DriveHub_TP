import SistemaDriveHub from "../sistema";
import ITemporada from "./Itemporada";

export default class TemporadaAlta implements ITemporada{
    calculoPorTemporada(sistema: SistemaDriveHub): number {
        return 1.20;
    }
}