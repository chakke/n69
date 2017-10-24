import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';

import { New69Module } from "../../providers/new69/new69";


@IonicPage()
@Component({
  selector: 'page-loading',
  templateUrl: 'loading.html',
})
export class LoadingPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    private mAppModule: New69Module,
  ) {
  }

  ionViewDidEnter() {
    this.mAppModule.loadConfig();
    this.platform.ready().then(() => {
      this.platformReady();
    })
  }

  // ionViewDidLoad() {
  //   this.platform.ready().then(()=>{
  //     this.platformReady();
  //   })
  // }

  platformReady() {
    this.checkNetwork().then((data) => {
      this.hasNetwork();
    }, (error) => {
      console.log(error);

    });
  }

  checkNetwork() {
    return new Promise((success, fail) => {
      success();
    });
  }

  hasNetwork() {
    this.screenDelay();
  }
  screenDelay() {
    setTimeout(() => {
      this.navCtrl.setRoot("HomePage");
    }, 500);
  }

  onLoaded() {
    this.navCtrl.setRoot("HomePage", {}, {
      animate: true,
      direction: "forward",
      duration: 500
    });
  }
}
