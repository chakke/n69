import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// import { GoogleAuth, User } from "@ionic/cloud-angular";
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
    // public googleAuth: GoogleAuth,
    // public user: User
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
      'webClientId':'84975284739-51l50glc30ff18ta4l6hdeh9dbspngqv.apps.googleusercontent.com',
      'offline': true
    }).then(res =>{
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
      .then(suc =>{
        alert("success!")
      }).catch(err =>{
        alert("fail!")
      })
    }).catch(err =>{
      alert("fail..!")
    })
  }
  doFacebookLogin() {
    this.facebook.login(['email']).then(res =>{
      const fc = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
      firebase.auth().signInWithCredential(fc).then(suc =>{
        alert("success!")
      }).catch(err =>{
        alert("fail!")
      })
    }).catch( err =>{
      alert("fail..!")
    })
  }
}
