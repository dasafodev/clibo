import { User } from './user';
import { Stream } from 'stream';

export interface Consumer extends User  {

    favorite_streams:Stream[]
    
}
