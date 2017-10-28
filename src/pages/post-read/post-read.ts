import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-post-read',
  templateUrl: 'post-read.html',
})
export class PostReadPage {

  navController: NavController;

  postRead: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    public storage: Storage
  ) {
    this.navController = app.getRootNav();
  }

  ionViewDidLoad() {
    this.postRead = [];
    this.storage.get('postRead').then(data => {
      if(data == null || data == undefined){
        this.postRead = [];
      }else{
        data.forEach(item => {
          this.postRead.push(item);
          
        });
      }
    });
  }


  goContentPage(post_content: any) {
    this.navController.push("PageContent", { postId: post_content });
  }

  exit() {
    this.app.getRootNav().setRoot("HomePage");
  }

}
