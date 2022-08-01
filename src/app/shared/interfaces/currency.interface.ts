export interface CurrencyResponse {
    bmx: Bmx;
}

export interface Bmx {
    series: Series[];
}

export interface Series {
    idSerie: string;
    titulo: string;
    datos: Dato[];
}

export interface Dato {
    fecha: string;
    dato: string;
}
