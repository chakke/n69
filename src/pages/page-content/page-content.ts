import { Component } from '@angular/core';
// import { ViewChild, ElementRef, Renderer } from "@angular/core";

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
    // @ViewChild(Content) content: Content;
    // start = 0;
    // threshold = 100;
    // slideHeaderPrevious = 0;
    // ionScroll:any;
    // showheader:boolean;
    // hideheader:boolean;
    // headercontent:any;

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
        // this.showheader =false;
        // this.hideheader = true;
    }

    ionViewDidEnter() {
        let post = this.navParams.get('postId');
        this.headerPost = post.categoryName;
        this.urlPost = this.domSanitier.bypassSecurityTrustResourceUrl(post.url);
        setTimeout(() => {
            this.postRead(post);
        }, 1000);
    }

    // ngOnInit() {
    //     // Ionic scroll element
    //     this.ionScroll = this.myElement.nativeElement.getElementsByClassName('scroll-content')[0];
    //     // On scroll function
    //     this.ionScroll.addEventListener("scroll", () => {
    //         if (this.ionScroll.scrollTop - this.start > this.threshold) {
    //             this.showheader = true;
    //             this.hideheader = false;
    //         } else {
    //             this.showheader = false;
    //             this.hideheader = true;
    //         }
    //         if (this.slideHeaderPrevious >= this.ionScroll.scrollTop - this.start) {
    //             this.showheader = false;
    //             this.hideheader = true;
    //         }
    //         this.slideHeaderPrevious = this.ionScroll.scrollTop - this.start;
    //     });
    // }

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

    goComment() {
        let post = this.navParams.get('postId');
        this.mNavController.push("CommentPage", { postId: post });
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

    savePost() {
        let post = this.navParams.get('postId');
        let userInfo: any = [];
        this.storage.get('userInfo').then(user => {
            if (user != null && user != undefined) {
                userInfo = user[0];
                alert("Lưu thành công")
                // this.mFirebaseService.addComment(post.key, userInfo.displayName, this.comment);
            } else {
                alert("Bạn cần đăng nhập để bình luận");
            }

        })

    }

    onClickBack() {
        this.mNavController.pop();
    }



}