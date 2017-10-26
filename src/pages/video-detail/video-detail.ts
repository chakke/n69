import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-video-detail',
  templateUrl: 'video-detail.html',
})
export class VideoDetailPage {

  poster: string = "https://firebasestorage.googleapis.com/v0/b/firebase-new69.appspot.com/o/dota2.jpg?alt=media&token=49038d92-5390-4474-80f4-6906f14cde95";
  url: string = "https://firebasestorage.googleapis.com/v0/b/firebase-new69.appspot.com/o/video%2Ftest3.mp4?alt=media&token=1f6015b8-690d-4a4c-9371-9f764594c85f";

  videoDetail: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage
  ) {
  }

  ionViewDidLoad() {
    this.videoDetail = this.navParams.get('videoId');
  }

  backToVideoPage() {
    this.navCtrl.pop();
  }
}
