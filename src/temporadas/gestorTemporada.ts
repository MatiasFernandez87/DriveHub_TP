import ITemporada from "./Itemporada";
import TemporadaAlta from "./temporada_alta";
import TemporadaBaja from "./temporada_baja";
import TemporadaMedia from "./temporada_media";

export default class GestorTemporada {

    public static asignarTemporadaAlta() : TemporadaAlta {
        return new TemporadaAlta();
    }

    public static asignarTemporadaMedia() : TemporadaMedia {
        return new TemporadaMedia();
    }

    public static asignarTemporadaBaja() : TemporadaBaja {
        return new TemporadaBaja();
    }
    
}