import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { User } from '../models/user';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;


  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public ngZone: NgZone,
    public router: Router
  ) {
    /**
     * Guardamos los datos en localstorage al iniciar sesion, se eliminan al cerrar sesion
     */

  }

  signUp(email: string, password: string, role: string, urlImage) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(result => {
        // this.sendVerificationEmail();
        console.log('urlImage', urlImage)
        //this.updateLocalStorage(result.user);
        this.setUserData(result.user, role);
        console.log('result:', result)
      })
      .catch(err => console.error(err))
  }

  signIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log('result:', result)
        this.updateLocalStorage(result.user);
        this.ngZone.run(() => {
          this.router.navigate(['producer/list']);
        });
      }).catch((error) => {
        window.alert(error.message)
      })
  }

    isAuth(){
      return this.afAuth.user;
    }

  sendVerificationEmail() {
    return this.afAuth.currentUser
      .then(res => {
        res.sendEmailVerification()
      })
  }

  setUserData(user: any, role: string) {

    let temp: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }

    return this.afs.collection(role).add(temp);
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['home']);
    })
  }

  updateLocalStorage(user) {
    let temp: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }

    localStorage.setItem('user', JSON.stringify(temp));


    // this.afAuth.authState.subscribe(user => {
    //   if (user) {
    //     this.userData = user;
    //     localStorage.setItem('user', JSON.stringify(this.userData));
    //     JSON.parse(localStorage.getItem('user'));
    //   } else {
    //     localStorage.setItem('user', null);
    //     JSON.parse(localStorage.getItem('user'));
    //   }
    // })
  }



}
