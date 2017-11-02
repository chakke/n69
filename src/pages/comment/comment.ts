import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams } from "ionic-angular";

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

    constructor(
        public app: App,
        public mNavController: NavController,
        public mFirebaseService: New69FirebaseService,
        public navParams: NavParams,
    ) { }

    ionViewDidLoad() {
        let post = this.navParams.get('postId');
        post.allContent.forEach(user => {
            user.forEach(comment => {
                this.commentList.push(comment)
            });
        });
        
    }

    getNumberCmt(array): number{
        let arr : any =[];
        array.forEach(item => {
            arr.push(item);
        });
        return arr.length
    }

    getCmtRep(array): boolean{
        let hasCmt: boolean;
        let arr : any =[];
        array.forEach(item => {
            arr.push(item);
        });
        if(arr.length < 3){
            hasCmt = false;
        }else{
            hasCmt = true;
        }
        return hasCmt;
    }

    exit() {
        this.mNavController.pop();
    }
    writeComment() {
        let post = this.navParams.get('postId');
        console.log(this.comment);
        this.mFirebaseService.addComment(post.key, "Chư Bát Giới", this.comment).then((data) => {
        });
    }
}