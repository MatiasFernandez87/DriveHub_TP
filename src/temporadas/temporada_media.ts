import SistemaDriveHub from "../sistema";
import ITemporada from "./Itemporada";

export default class TemporadaMedia implements ITemporada{
    calculoPorTemporada(sistema: SistemaDriveHub): number {
        return 1;
    }
}