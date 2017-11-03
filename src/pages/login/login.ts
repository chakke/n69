import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { New69Module } from "../../providers/new69/new69";

// import { GoogleAuth, User } from "@ionic/cloud-angular";
import { Storage } from "@ionic/storage";

import { AngularFireAuth } from "angularfire2/auth";
import { GooglePlus } from "@ionic-native/google-plus";
import { Facebook } from "@ionic-native/facebook";
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public mNew69Module: New69Module,
    public event : Events,
    // public googleAuth: GoogleAuth,
    // public user: User
    public angularFireAuth: AngularFireAuth,
    public googlePlus: GooglePlus,
    public facebook: Facebook
  ) {
  }

  ionViewDidLoad() {
  }

  exit() {
    this.navCtrl.setRoot("HomePage");
  }
  doGoogleLogin() {

    this.googlePlus.login({
      'webClientId': '84975284739-51l50glc30ff18ta4l6hdeh9dbspngqv.apps.googleusercontent.com',
      'offline': true
    }).then(res => {
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
        .then(suc => {
          let userInfo = this.angularFireAuth.auth.currentUser;
          let userSave: any = [];
          userSave.push({
            uid: userInfo.uid,
            displayName: userInfo.displayName,
            photoUrl: userInfo.photoURL
          })
          this.storage.set("userInfo", userSave);
          this.event.publish('userInfo', userSave);
          alert("Login success!")
          this.navCtrl.setRoot("HomePage")
        }).catch(err => {
          alert("fail!")
        })
    }).catch(err => {
      alert("fail..!")
    })
  }
  doFacebookLogin() {
    this.facebook.login(['email']).then(res => {
      const fc = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
      firebase.auth().signInWithCredential(fc).then(suc => {
        let userInfo = this.angularFireAuth.auth.currentUser;
        let userSave: any = [];
        userSave.push({
          uid: userInfo.uid,
          displayName: userInfo.displayName,
          photoUrl: userInfo.photoURL
        })
        this.storage.set("userInfo", userSave);
        this.event.publish('userInfo', userSave);
        alert("Login success!")
        this.navCtrl.setRoot("HomePage")
      }).catch(err => {
        alert("fail!")
      })
    }).catch(err => {
      alert("fail..!")
    })
  }
}
