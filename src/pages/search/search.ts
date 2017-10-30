import { Component } from '@angular/core';
import { IonicPage, NavController, App } from 'ionic-angular';

import { New69Module } from "../../providers/new69/new69";

import { New69FirebaseService } from "../../providers/new69/new69-firebase-service";

// import { Post } from "../../providers/new69/new69-post";

import { Storage } from "@ionic/storage";


@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  resultPost: any[];
  dataPost: any[];
  postShow: any[];
  searchKey: string = '';

  navController: NavController;

  constructor(
    public navCtrl: NavController,
    public mNew69: New69Module,
    public mFirebase: New69FirebaseService,
    public storage: Storage,
    public app: App
  ) {
    this.navController = app.getRootNav();
  }

  ionViewDidLoad() {

  }

  back() {
    this.navCtrl.setRoot("HomePage");
  }

  onCancel(event) {

  }

  goContentPage(post_content: any) {
    this.navController.push("PageContent", { postId: post_content });
  }

  searchPost() {
    this.dataPost = [];
    this.storage.get('dataFirebase').then(data => {
      data.forEach(item => {
        this.dataPost.push(item);
      });
      this.fillterPost(this.dataPost);
      this.doShowPost(this.resultPost);
    });
  }

  /**Lọc post qua keySearch */
  fillterPost(list: any) {
    this.resultPost = list.filter(item => {
      return item.title.toLowerCase().indexOf(this.searchKey.toLowerCase()) > -1;
    })
  }

  /**Add 10 item đầu vào list */
  doShowPost(list: any) {
    this.postShow = [];
    for (let i = 0; i < 10; i++) {
      this.postShow.push(list[i]);
    }
  }

  /**Hàm refresh dữ liệu */
  doRefresh(refresher) {
    console.log('start refresh', refresher);
    setTimeout(() => {
      this.searchPost();
      console.log('refresh has complete!');
      refresher.complete();
    }, 500);
  }

  /**Hàm thêm dữ liệu khi scroll */
  doInfinite(infiniteScroll: any) {
    setTimeout(() => {
      let startNumberIndex: number = this.postShow.length;
      if (startNumberIndex < this.resultPost.length - 4) {
        console.log('a');

        for (let i = startNumberIndex; i < startNumberIndex + 4; i++) {
          if (i > startNumberIndex) {
            this.postShow.push(this.resultPost[i]);
          }
        }
      }
      if (startNumberIndex <= this.resultPost.length - 1) {
        this.postShow.push(this.resultPost[10]);
      }
      if (startNumberIndex <= this.resultPost.length - 2) {
        this.postShow.push(this.resultPost[10]);
        this.postShow.push(this.resultPost[11]);
      }
      if (startNumberIndex <= this.resultPost.length - 3) {
        this.postShow.push(this.resultPost[10]);
        this.postShow.push(this.resultPost[11]);
        this.postShow.push(this.resultPost[12]);
      }
      infiniteScroll.complete();
    }, 1000);
  }
}
