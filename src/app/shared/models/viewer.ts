import { User } from './user';
import { Stream } from 'stream';

export interface Viewer extends User  {

    favorite_streams:Stream[]
    
}
