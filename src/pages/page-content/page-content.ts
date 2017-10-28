import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { IonicPage, NavParams, LoadingController, NavController } from 'ionic-angular';

import { New69Module } from "../../providers/new69/new69";

import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
    selector: 'page-content',
    templateUrl: 'page-content.html',
})
export class PageContent {

    isShow: boolean = false;

    urlPost: SafeResourceUrl;
    headerPost: string;

    constructor(
        public mNew69Module: New69Module,
        public navParams: NavParams,
        public domSanitier: DomSanitizer,
        public loadingCtrl: LoadingController,
        public mNavController: NavController,
        public storage: Storage,

    ) {

    }

    ionViewDidEnter() {
        let post = this.navParams.get('postId')
        this.headerPost = post.categoryName;
        this.urlPost = this.domSanitier.bypassSecurityTrustResourceUrl(post.url);
        setTimeout(() => {
            this.postRead(post);
        }, 1000);
    }

    postRead(objectPost: any) {
        let postRead: any = [];
        this.storage.get('postRead').then(data => {
            if (data == null || data == undefined) {
                postRead = [];
            } else {
                data.forEach(item => {
                    if (objectPost.contentId != item.contentId) {
                        postRead.push(item);
                    }
                });
            }
            postRead.push(objectPost);
            this.storage.set("postRead", postRead);
        });
    }

    goBack() {
        this.mNavController.pop();
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