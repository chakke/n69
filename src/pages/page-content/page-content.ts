import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { IonicPage, NavParams, LoadingController, NavController } from 'ionic-angular';


import { New69Module } from "../../providers/new69/new69";

@IonicPage()
@Component({
    selector: 'page-content',
    templateUrl: 'page-content.html',
})
export class PageContent {

    isShow: boolean = false;

    urlPost: SafeResourceUrl;

    constructor(
        public mNew69Module: New69Module,
        public navParams: NavParams,
        public domSanitier: DomSanitizer,
        public loadingCtrl: LoadingController,
        public mNavController: NavController

    ) {

    }

    ionViewDidEnter() {
        let post = this.navParams.get('postId')
        this.urlPost = this.domSanitier.bypassSecurityTrustResourceUrl(post.url);
    }

    goShare() {

        if (this.isShow) {
            document.getElementById('share').style.display = 'none';
            this.isShow = false;
        } else {
            document.getElementById('share').style.display = 'block';
            this.isShow = true;
        }
    }

    onClickBack() {
        this.mNavController.pop();
    }

}