import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams } from "ionic-angular";

import { New69FirebaseService } from "../../providers/new69/new69-firebase-service";

import { Comment } from "../../providers/new69/new69-post";

@IonicPage()
@Component({
    selector: 'comment-page',
    templateUrl: 'comment.html'
})
export class CommentPage {

    comment: string;

    commentUser: Array<Comment> = [];

    constructor(
        public app: App,
        public mNavController: NavController,
        public mFirebaseService: New69FirebaseService,
        public navParams: NavParams,
    ) { }

    ionViewDidLoad() {
        let post = this.navParams.get('postId');
        console.log(post);
        
        this.mFirebaseService.getCommentPerEachPost();
        this.mFirebaseService.comment.subscribe(data => {
            data.forEach(item => {
                let comment = new Comment();
                comment.onResponseComment(item);
                this.commentUser.push(comment);
            });
        });
        this.mFirebaseService.getCommentOfComment(post.key, "user1", post.key);
        this.mFirebaseService.commentOfCmt.subscribe(data =>{
            console.log(data);
            
        })
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