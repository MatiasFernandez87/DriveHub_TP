import SistemaDriveHub from "../sistema";
import ITemporada from "./Itemporada";

export default class TemporadaMedia implements ITemporada{
    calculoPorTemporada(): number {
        return 1;
    }
}