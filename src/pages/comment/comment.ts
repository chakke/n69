import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams, Events } from "ionic-angular";

import { Storage } from "@ionic/storage";

import { New69FirebaseService } from "../../providers/new69/new69-firebase-service";

@IonicPage()
@Component({
    selector: 'comment-page',
    templateUrl: 'comment.html'
})
export class CommentPage {

    comment: string;

    commentUser: Array<Comment> = [];
    commentList: any = [];

    userInfo: any;

    photoUrl: string;

    constructor(
        public app: App,
        public mNavController: NavController,
        public mFirebaseService: New69FirebaseService,
        public navParams: NavParams,
        public event: Events,
        public storage: Storage
    ) {

    }

    ionViewDidLoad() {
        let post = this.navParams.get('postId');
        post.allContent.forEach(user => {
            user.forEach(comment => {
                this.commentList.push(comment)
            });
        });
        this.storage.get('userInfo').then(user => {
            if(user != null && user != undefined){
                this.userInfo = [];
                this.userInfo = user[0];
                this.photoUrl = this.userInfo.photoUrl;
            }else{
                this.photoUrl = "/assets/new69/defaultavatar.png"
            }
            
        })

    }

    getNumberCmt(array): number {
        let arr: any = [];
        array.forEach(item => {
            arr.push(item);
        });
        return arr.length
    }

    getCmtRep(array): boolean {
        let hasCmt: boolean;
        let arr: any = [];
        array.forEach(item => {
            arr.push(item);
        });
        if (arr.length < 3) {
            hasCmt = false;
        } else {
            hasCmt = true;
        }
        return hasCmt;
    }

    exit() {
        this.mNavController.pop();
    }
    writeComment() {
        let post = this.navParams.get('postId');
        let userInfo: any = [];
        this.storage.get('userInfo').then(user => {
            if(user != null && user != undefined){
                userInfo = user[0];
                this.mFirebaseService.addComment(post.key, userInfo.displayName, this.comment);
            }else{
                alert("Bạn cần đăng nhập để bình luận");
            }
           
        })

    }
}