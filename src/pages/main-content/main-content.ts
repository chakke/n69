import { Component } from '@angular/core';
import { IonicPage, NavController, Events, App, LoadingController } from 'ionic-angular';

import { Storage } from "@ionic/storage";

import { New69Module } from "../../providers/new69/new69";
import { Post } from "../../providers/new69/new69-post";

import { New69FirebaseService } from "../../providers/new69/new69-firebase-service";


@IonicPage()
@Component({
    selector: 'page-main-content',
    templateUrl: 'main-content.html',
})
export class MainContentPage {
    posts: Array<Post> = [];

    postsFirebase: Array<Post> = [];

    navController: NavController;


    avatarUrl: string;
    categoryName: string;
    contentId: number;
    date: string;
    description: string;
    title: string;
    totalComments: number;

    titlePage: string;
    firstPost: any;
    otherPost: any;
    allPost: any;

    // private start: number = 0;

    constructor(
        public navCtrl: NavController,
        public app: App,
        public mNew69Module: New69Module,
        public event: Events,
        public loadingCtrl: LoadingController,
        private storage: Storage,
        public mFirebase: New69FirebaseService,
    ) {
        this.navController = app.getRootNav();
    }

    ionViewDidLoad() {
        // this.loadHomePage();
    }

    ionViewDidEnter() {
        setTimeout(() => {
            // this.loadAllData(this.mNew69Module.titlePage);
            this.loadAllDataFirebase(this.mNew69Module.titlePage);
        }, 100);
    }

    // requestPost() {
    //     let loading = this.loadingCtrl.create({
    //         dismissOnPageChange: true
    //     })
    //     loading.present();
    //     this.posts = [];
    //     this.mNew69Module.getHttpService().requestPostDetail().then(data => {
    //         console.log(data);
    //         this.onResponsePost(data);
    //         loading.dismiss()
    //     });
    // }

    /**Hàm lấy dữ liệu */
    // onResponsePost(data) {
    //     data.data.forEach(element => {
    //         let post = new Post();
    //         post.onResponsePost(element);
    //         this.posts.push(post);
    //     });
    //     this.mNew69Module.mNew69Post.posts = this.posts;
    //     this.storage.set("post", this.posts).then(() => console.log("Stored post!"),
    //         error => console.log("error Storing post!", error));
    // }

    /**Hàm xử lý dữ liệu */
    // loadAllData(titlePage: string) {
    //     this.storage.get('post').then(data => {
    //         if (data == null || data == undefined) {
    //             this.requestPost();
    //             return
    //         };
    //         data.forEach(element => {
    //             let post = new Post();
    //             post.onResponsePost(element);
    //             this.posts.push(post);
    //         });
    //         this.loadDataPage(titlePage, data);
    //         this.mNew69Module.didLoadPost = true;
    //     }, error => {
    //         console.log(error);
    //         this.requestPost();
    //     });
    // }

    /**Hàm lấy dữ liệu ra cho từng tiêu đề */
    loadDataPage(index: string, listPost: any[]) {
        if (index == "home") {
            this.loadPost(listPost);
        }
        else {
            listPost = listPost.filter(element => {
                return element.categoryName.toLowerCase().indexOf(index.toLowerCase()) > -1;
            })
            if (listPost.length == 0) {
                this.otherPost = [];
            } else {
                // console.log(listPost.length);                
                this.loadPost(listPost);
            }
        }
    }

    /**Hàm lấy dữ liệu từ firebase */
    getPostFirebase() {
        let loading = this.loadingCtrl.create({
            spinner: "crescent"
        });
        loading.present();
        this.mFirebase.getPostFirebase();
        this.mFirebase.post.subscribe((data) => {
            data.forEach(item => {
                let post = new Post();
                post.onResponsePost(item);
                this.postsFirebase.push(post);
            })
            this.loadPost(this.postsFirebase);
            loading.dismiss();
            this.storage.set("dataFirebase", this.postsFirebase).then(() => {
                console.log("Stored data");
            });
        });
    }

    /**Hàm xử lý dữ liệu Firebase*/
    loadAllDataFirebase(titlePage: string) {
        this.storage.get('dataFirebase').then(data => {
            if (data == null || data == undefined) {
                this.getPostFirebase();
                return
            };
            this.loadDataPage(titlePage, data);
            this.mNew69Module.didLoadPost = true;
        }, error => {
            console.log(error);
            this.getPostFirebase();
        });
    }

    loadPost(list: any[]) {
        this.firstPost = list[0];
        this.loadFirstPost(this.firstPost);
        this.otherPost = [];
        this.allPost = [];
        for (let i = 0; i < list.length; i++) {
            this.allPost.push(list[i]);
        }
        for (let i = 0; i < 5; i++) {
            if (i > 0) {
                this.otherPost.push(list[i]);
            }
        }
    }
    loadFirstPost(object: any) {
        this.avatarUrl = object.avatarUrl;
        this.categoryName = object.categoryName;
        this.contentId = object.contentId;
        this.date = object.date;
        this.description = object.description;
        this.title = object.title;
        this.totalComments = object.totalComments;
    }

    /**Hàm refresh dữ liệu */
    doRefresh(refresher) {
        console.log('start refresh', refresher);
        setTimeout(() => {
            this.loadAllDataFirebase(this.mNew69Module.titlePage);
            console.log('refresh has complete!');
            refresher.complete();
        }, 500);
    }

    /**Hàm thêm dữ liệu khi scroll */
    doInfinite(infiniteScroll: any) {
        setTimeout(() => {
            let startNumberIndex: number = this.otherPost.length;
            // console.log(startNumberIndex);
            // console.log(this.allPost.length - 4);
            if (startNumberIndex < this.allPost.length - 4) {
                for (let i = startNumberIndex; i < startNumberIndex + 4; i++) {
                    if (i > startNumberIndex) {
                        this.otherPost.push(this.allPost[i]);
                    }
                }
            }
            infiniteScroll.complete();
        }, 1000);
        // console.log(this.otherPost);
    }

    goContentPage(post_content: any) {
        this.navController.push("PageContent", { postId: post_content });
    }

}
