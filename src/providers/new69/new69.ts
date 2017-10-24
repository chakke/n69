import { Injectable } from '@angular/core';
import { HttpService } from "../http-service";
import { New69HttpService } from "./new69-http-services";
import { RequestState } from '../app-constant';
// import { Utils } from '../app-utils';
import { New69Config } from "./new69-config";
// import { Storage } from "@ionic/storage";
import { New69Post } from "../../providers/new69/new69-post";

// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';



import { Http } from "@angular/http";

@Injectable()
export class New69Module {
  didLoadPost: boolean = false;
  mNew69Menu = {
    id: 0, name: "new69", active: true, username: "adm", categories: [
      {
        id: 0, name: "Cá nhân", items: [
          { id: 0, name: "Tìm kiếm", icon: "search", page: "SearchPage", isActive: false },
          { id: 1, name: "Tùy chọn chuyên mục", icon: "list", page: "ListPage", isActive: false },
          { id: 2, name: "Tin đã đọc", icon: "ios-checkbox-outline", page: "PostReadPage", isActive: false },
          { id: 3, name: "Tin đã lưu", icon: "ios-bookmark-outline", page: "PostSavedPage", isLogin: false, isActive: false },
          { id: 4, name: "Bình luận của bạn", icon: "ios-chatboxes-outline", page: "CommentPage", isLogin: false, isActive: false },
        ]
      },
      {
        id: 1, name: "Cài đặt", items: [
          { id: 0, name: "Nhận thông báo", icon: "ios-notifications-outline", page: "NoficationPage", isActive: false },
          { id: 1, name: "Xóa bộ nhớ đệm", icon: "ios-information-circle-outline", isActive: false },
        ]
      },
      {
        id: 2, name: "Liên hệ", items: [
          { id: 0, name: "Conntact", icon: "ios-mail-outline", page: "ContactPage", isActive: false }
        ]
      }
    ]
  }

  mCategories: any = [];

  mNew69Post: New69Post = new New69Post()

  titlePage: "home";

  isLogin: boolean = false;

  mRequestState: number = RequestState.READY;

  isLoading : boolean = false;

  private mNew69HttpService: New69HttpService;
  private mConfig: New69Config;
  constructor(
    public http: Http,
    private mHttpService: HttpService,
  ) {
    this.mNew69HttpService = new New69HttpService(mHttpService);
    this.mConfig = new New69Config();
    // console.log("provider");
  }

  getHttpService() {
    return this.mNew69HttpService;
  }
  getAppConfig() {
    return this.mConfig;
  }

  loadConfig() {
    this.mHttpService.getHttp().request("assets/config/test.json").subscribe(
      data => {
        this.mConfig.onResponseConfig(data.json());
      })
  }

  requestPost() {
    this.mRequestState = RequestState.REQUESTING;
    this.mNew69HttpService.requestPostDetail().then(
      data => {
        this.mNew69Post.onResponeDetailPost(data);
        this.mRequestState = RequestState.READY;
      },
      error => { }
    );
  }

}
