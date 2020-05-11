import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { User } from '../models/user';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;


  constructor(
    public afAuth: AngularFireAuth
  ) {
    /**
     * Guardamos los datos en localstorage al iniciar sesion, se eliminan al cerrar sesion
     */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  signUp(email:string, password:string){
    return this.afAuth.createUserWithEmailAndPassword(email,password)
      .then(result => {
        this.sendVerificationEmail();
      })
      .catch(err => console.error(err))
  }

  sendVerificationEmail(){
    return this.afAuth.currentUser
    .then(res => {
      res.sendEmailVerification()
    })
  }
  


}
