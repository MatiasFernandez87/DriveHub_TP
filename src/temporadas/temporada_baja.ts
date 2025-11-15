import SistemaDriveHub from "../sistema";
import ITemporada from "./Itemporada";

export default class TemporadaBaja implements ITemporada{
    calculoPorTemporada(): number {
        return 0.9;
    }
}