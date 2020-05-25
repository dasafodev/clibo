import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public ngZone: NgZone,
    public router: Router,
    private http: HttpClient
  ) {
    /**
     * Guardamos los datos en localstorage al iniciar sesion, se eliminan al cerrar sesion
     */
  }

  signUp(user: User, password: string){

      return this.afAuth.createUserWithEmailAndPassword(user.email, password);
     
  }

  updateProfile(user){
    user.updateProfile({
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
  }

  signIn(email: string, password: string) {
    try {
      return this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then((resp) => {
          return resp;
        });
    } catch (error) {
      window.alert(error.message);
    }
  }

  isAuth() {
    return this.afAuth.user;
  }

  sendVerificationEmail() {
    return this.afAuth.currentUser.then((res) => {
      res.sendEmailVerification();
    });
  }

  uploadData(user: User) {
    return this.afs.collection('user').doc(user.uid).set(user);
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['home']);
    });
  }

  getUser(user_id) {
    return this.afs
      .collection('user', (query) => query.where('uid', '==', user_id))
      .valueChanges();
  }

  updateLocalStorage(user) {
    const temp: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      favorite_streamings: user.favorite_streamings,
      preferences: user.preferences,
    };

    localStorage.setItem('user', JSON.stringify(temp));
  }
  updateLocalStorage2(user_id) {
    return new Promise((resolve, rejected) => {
      this.afs
        .collection('user')
        .doc(user_id)
        .valueChanges()
        .subscribe((result_1) => {
          let res = JSON.parse(JSON.stringify(result_1));
          console.log(res);
          const user: User = {
            uid: res.uid,
            email: res.email,
            displayName: res.displayName,
            photoURL: res.photoURL,
            emailVerified: res.emailVerified,
            favorite_streamings: res.favorite_streamings,
            preferences: res.preferences,
          };
          localStorage.setItem('user', JSON.stringify(user));
          resolve();
        });
    });
  }

  updateFavoritesLocalStorage(id_user) {
    var res = this.afs
      .collection('user')
      .doc(id_user)
      .valueChanges()
      .subscribe((res) => {
        this.updateLocalStorage(res);
      });
  }

  updateDatabaseUser(userId, user_name) {
    this.updateLocalStorage2(userId);
    var docRef = this.afs.collection('user').doc(userId);

    return docRef
      .update({
        displayName: user_name,
      })
      .then(() => {
        console.log('Document successfully updated!');
        this.ngZone.run(() => {
          this.router.navigate(['producer/profile']);
        });
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error);
      });
  }

 
  addPreferencesToUser(id_user:string,text:string){
    const httpOptions = {
      headers : new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      })
    };
    const body = {
        "clientId":id_user,
        "preferences":text
    };
    return this.http.post(`${environment.URL_FUNCTIONS}/languageClassifier`, body, httpOptions);
  }
  

  verifyImage(filePath: string) {
    const httpOptions = {
      headers : new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      })
    };
    const body = {
      url: filePath,
    };
    return this.http.post(`${environment.URL_FUNCTIONS}/imageClassification`, body, httpOptions);
  }
}
