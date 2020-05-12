import { User } from './user';
import { Stream } from 'stream';

export interface Producer extends User{
    
    stream_list?:Stream
}
