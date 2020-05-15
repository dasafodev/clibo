import { Tag } from './tag';

export interface Streaming {
    id:string;
    id_producer:string;
    name:string;
    url:string;
    photoURL:string;
    short_description:string;
    long_description:string;
    date_start: Date;
    category:string;
    tags:Tag[];
}
