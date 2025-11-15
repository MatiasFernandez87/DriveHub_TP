import SistemaDriveHub from "../sistema";
import ITemporada from "./Itemporada";

export default class TemporadaBaja implements ITemporada{
    calculoPorTemporada(sistema: SistemaDriveHub): number {
        return 0.9;
    }
}