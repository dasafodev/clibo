
export interface User {

    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
    favorite_streamings:string[];
    preferences?: string;
    
}
 