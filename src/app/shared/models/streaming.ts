import {Comments} from './comments';
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
    status?: boolean;
    // date_start: Date;
    // category:string[];
    // tags:string[];
}


export enum StreamingCategory {
    ENTRETENIMIENTO='Entretenimiento',
    CLASES='Clases',
    COCINA='Cocina',
    ENTRENAMIENTO='Entrenamiento',
    LECTURA='Lectura'
}