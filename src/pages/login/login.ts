import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { GoogleAuth, User } from "@ionic/cloud-angular";


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public googleAuth: GoogleAuth,
    public user: User
  ) {
  }

  ionViewDidLoad() {
  }

  exit() {
    this.navCtrl.setRoot("HomePage");
  }
  doGoogleLogin() {
    this.googleAuth.login().then(data =>{
      alert("success");
    }, error => {
      alert("error");
      alert(JSON.stringify(error));
    });
  }
  doFacebookLogin() {
  }
}
