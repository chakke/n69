import { Component } from '@angular/core';
import { IonicPage, NavController, App } from 'ionic-angular';

import { New69Module } from "../../providers/new69/new69";

import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
    selector: 'page-list',
    templateUrl: 'list.html',
})
export class ListPage {
    listUpdate: any = [];
    listCheck: any = [];
    listCompare: any = [];
    allList: any = [];

    mViewData: any = [];
    mCategories: any = [];
    mTitleDidCheck: boolean = true;

    constructor(
        public mNew69Module: New69Module,
        public navCtrl: NavController,
        public app: App,
        private storage: Storage
    ) { }
    ionViewDidLoad() {
        this.storage.get('allList').then((data) => {
            if (data == null || data == undefined) {
                let mViewData = this.mNew69Module.getAppConfig().getViewData("menuTitle");
                this.allList = mViewData.categorieName;
                this.loadCheckList();
                this.storage.set("allList", this.allList).then(() => {
                    console.log("Stored all List!");
                }, error => console.log(error));
            } else {
                this.allList = data;
                this.loadCheckList();
            }
        });

    }
    /**Hàm cập nhật các trang */
    updateCheckList(cbItem, event) {
        document.getElementById('button-change').style.backgroundColor = "#e52d49"
        let cbId = this.allList.indexOf(cbItem);
        if (event.target.checked) {
            this.allList[cbId].isShow = true;
            this.loadCheckList();
        } else {
            this.allList[cbId].isShow = false;
            this.loadCheckList();
        }
        this.storage.remove("allList").then(() => {
            console.log("removed allList!");
        }, error => console.log(error))
        this.storage.set("allList", this.allList).then(() => {
            console.log("add new allList!")
        }, error => console.log(error));

    }
    /**Hàm load lại các trang được đánh dấu */
    loadCheckList() {
        this.listCheck = [];
        this.allList.forEach(element => {
            if (element.isShow) {
                this.listCheck.push(element);
            }
        });
    }

    clickUpdate() {
        this.loadCheckList()
        this.storage.remove("titlePage").then(() => {
            console.log("removed!");
        }, error => console.log(error))
        this.storage.set("titlePage", this.listCheck).then(() => {
            console.log("update new List of Title!")
        }, error => console.log(error));
        this.app.getRootNav().setRoot("HomePage");
    }
}
