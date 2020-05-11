import { User } from './user';
import { Stream } from 'stream';

export interface Creator extends User{
    
    stream_list?:Stream
}
