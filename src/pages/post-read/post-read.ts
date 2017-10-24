import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-post-read',
  templateUrl: 'post-read.html',
})
export class PostReadPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostReadPage');
  }

  exit(){
    this.app.getRootNav().setRoot("HomePage");  
  }

}
