import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { New69Module } from "../../providers/new69/new69";

import { New69FirebaseService } from "../../providers/new69/new69-firebase-service";

import { Post } from "../../providers/new69/new69-post";


@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  posts: Array<Post> = [];
  resultPost: any[];
  searchKey: string = '';

  time: string;

  listAdd: any;

  url: string;
  title: string;
  contentId: string;
  description: string;
  totalComments: string

  constructor(
    public navCtrl: NavController,
    public mNew69: New69Module,
    public mFirebase: New69FirebaseService
  ) { }

  ionViewDidLoad() {
    this.mNew69.getHttpService().requestPostDetail().then((data) => {
      this.onResponsePost(data);
    })
  }

  onResponsePost(data) {
    data.data.forEach(element => {
      let post = new Post();
      post.onResponsePost(element);
      this.posts.push(post);
    });

  }

  clickPushPost(post: any) {
    // this.mFirebase.pushData(post);
    console.log(post);
    
  }

  back() {
    this.navCtrl.setRoot("HomePage");
  }
  onCancel(event) {

  }
  searchPost() {
    // this.resultPost = this.mNew69.filterPostByKeyWord(this.searchKey);
  }

  getVal() {
    // console.log(this.url);
    // console.log(this.title);
    // console.log(this.description);
    // console.log(this.contentId);
    // console.log(this.totalComments);
    // this.mFirebase.pushClipData(this.url, this.title, this.contentId, this.description, this.totalComments);
    
  }

}
