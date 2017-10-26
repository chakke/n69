import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { New69FirebaseService } from "../../providers/new69/new69-firebase-service";
import { New69Module } from "../../providers/new69/new69";
import { VideoClip } from "../../providers/new69/new69-post";

import { Storage } from "@ionic/storage";



@IonicPage()
@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
})
export class VideoPage {

  videoClip: Array<VideoClip> = [];
  firstClip: any = [];
  otherClip: any = [];
  allClip: any = [];

  avatarUrl: string;
  date: number;
  description: string;
  title: string;
  url: string;
  totalComments: string;

  navController: NavController;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mFirebase: New69FirebaseService,
    public mNew69Module: New69Module,
    public storage: Storage,
    public app: App
  ) {
    this.navController = app.getRootNav();
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.loadAllVideo();
    })
  }

  ionViewDidLeave() {
    let video = <HTMLVideoElement>document.getElementById('videoFile');
    video.pause();
  }

  getVideoFirebase() {
    this.mFirebase.getData();
    this.mFirebase.video.subscribe(data => {
      data.forEach(item => {
        let video = new VideoClip();
        video.onResponseVideo(item);
        this.videoClip.push(video);
      });
      this.loadVideo(this.videoClip);
      this.storage.set("videoFirebase", this.videoClip).then(() => {
        console.log("Stored video");
      });
    })
  }

  loadAllVideo() {
    this.storage.get('videoFirebase').then(data => {
      if (data == null || data == undefined) {
        this.getVideoFirebase();
        return
      }
      this.loadVideo(data);
    }, error => {
      console.log(error);
      this.getVideoFirebase();
    });
  }

  loadVideo(list: any[]) {
    this.firstClip = list[0];
    // console.log(this.firstClip);

    this.loadFirstClip(this.firstClip);
    this.otherClip = [];
    this.allClip = [];
    for (let i = 0; i < list.length; i++) {
      this.allClip.push(list[i]);
    }
    for (let i = 0; i < 3; i++) {
      if (i > 0) {
        this.otherClip.push(list[i]);
      }
    }
  }

  loadFirstClip(object: any) {
    this.avatarUrl = object.avatarUrl;
    this.date = object.date;
    this.description = object.description;
    this.title = object.title;
    this.url = object.url;
    this.totalComments = object.totalComments;
  }

  /**Hàm refresh dữ liệu */
  doRefresh(refresher) {
    console.log('start refresh', refresher);
    setTimeout(() => {
      this.loadAllVideo();
      console.log('refresh has complete!');
      refresher.complete();
    }, 500);
  }

  /**Hàm thêm dữ liệu khi scroll */
  doInfinite(infiniteScroll: any) {
    setTimeout(() => {
      let startNumberIndex: number = this.otherClip.length;
      if (startNumberIndex < this.allClip.length - 1) {
        for (let i = startNumberIndex; i < startNumberIndex + 2; i++) {
          if (i > startNumberIndex) {
            this.otherClip.push(this.allClip[i]);
          }
        }
      }
      infiniteScroll.complete();
    }, 1000);
    // console.log(this.otherClip);
  }

  goVideoDetail(video_detail: any) {
    this.navController.push("VideoDetailPage", { videoId: video_detail });
  }
}
