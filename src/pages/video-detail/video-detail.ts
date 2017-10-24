import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-video-detail',
  templateUrl: 'video-detail.html',
})
export class VideoDetailPage {
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
