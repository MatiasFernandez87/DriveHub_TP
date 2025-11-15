import SistemaDriveHub from "../sistema";

export default interface ITemporada{
    calculoPorTemporada(sistema: SistemaDriveHub): number;
}