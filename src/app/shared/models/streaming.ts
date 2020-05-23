
export interface Streaming {
    uid:string,
    id_producer:string;
    photo_producer:string;
    name:string;
    urlStreaming:string;
    coverURL:string;
    short_description:string;
    long_description:string;
    likes:number;
    // date_start: Date;
    // category:string[];
    // tags:string[];
}


export enum StreamingCategory {
    ENTRETENIMIENTO,
    CLASES,
    COCINA,
    ENTRENAMIENTO,
    LECTURA
}