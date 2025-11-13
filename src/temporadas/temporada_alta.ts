import ITemporada from "./Itemporada";

export default class TemporadaAlta implements ITemporada{
    calculoPorTemporada(): number {
        return 1.20;
    }
}