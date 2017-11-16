import { Injectable } from "@angular/core";

import firebase from 'firebase';


// import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";


@Injectable()
export class New69FirebaseService {

    postFirebase = firebase.database().ref('/post');

    arr: any;

    post: FirebaseListObservable<any>;
    video: FirebaseListObservable<any>;
    comment: FirebaseListObservable<any>;
    commentOfCmt: FirebaseListObservable<any>;
    constructor(
        public mFirebase: AngularFireDatabase,
    ) { }

    addComment(key, user, cmtContent) {
        var promise = new Promise((resolve) => {

            this.postFirebase.child(key).child(user).push({
                userCmt: user,
                cmtContent: cmtContent,
                timeCmt: new Date().getTime(),
                like: 0,
                userProfile: ""
            }).then(() => {
                resolve(true)
            })
        });
        return promise;
    }

    getData() {
        this.video = this.mFirebase.list('/video');
    }

    getPostFirebase() {
        this.post = this.mFirebase.list('/post');
    }

    pushData(data: any) {
        this.post = this.mFirebase.list('/post');
        for (let item of data.data){
            this.post.push({
                contentId: item.contentId,
                url: item.url,
                date: item.date,
                title: item.title,
                description: item.description,
                avatarUrl: item.avatarUrl,
                categoryName: item.categoryName,
                totalComments: item.totalComments
            });
        }
      
    }

    pushClipData(url: string, title: string, contentId: string, description: string, totalComments: string) {
        this.video = this.mFirebase.list('/video');
        this.video.push({
            contentId: parseInt(contentId),
            url: url,
            date: new Date().getTime(),
            title: title,
            description: description,
            avatarUrl: "",
            categoryName: "Giải trí",
            totalComments: parseInt(totalComments),
        }).then(() => {
            console.log("done!");
        }, (error) => console.log(error));
    }

    deletePost(key: string) {
        this.post = this.mFirebase.list('/post');
        this.post.remove(key);
    }

    addPost(listPost) { // list 10 post    
        this.post = this.mFirebase.list('/post');
        this.post.subscribe(data => {
            console.log(listPost[listPost.length - 1].contentId, data[data.length - 1].contentId);
            
            if (listPost[listPost.length - 1].contentId != data[data.length - 1].contentId) { //compare 2 last element of 2 array
                for(let index in data){
                    if(parseInt(index) < 11){
                        console.log(index);
                    }
                }
                for (let item of listPost) {
                    this.post.push({
                        contentId: item.contentId,
                        url: item.url,
                        date: item.date,
                        title: item.title,
                        description: item.description,
                        avatarUrl: item.avatarUrl,
                        categoryName: item.categoryName,
                        totalComments: item.totalComments
                    });
                }
            }
            // if (data.length > 100) {
            //     for (var key in data) {
            //         if (parseInt(key) >= 100) {
            //             this.post.remove(data[key])
            //         }
            //     }
            // }
        })
    }

}