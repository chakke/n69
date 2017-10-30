import { HttpService } from '../http-service';
import { Headers } from '@angular/http';
// import { ParamsKey } from '../app-constant';
// import { New69Cmd } from "./new69-cmd";

export class New69HttpService {
    private SERVICE_URL: string = "http://newsapi.ecdc.vn/phone/getposts";
    // private CLIENT_KEY: string = "";
    // private ACCESS_KEY: string = "";
    private DEVICE_ID: string = "";
    mHeaderWithKey: Headers;
    mHeader: Headers;
    constructor(
        private mHttpService: HttpService,
    ) { }

    createHeaders() {
        if (this.mHeaderWithKey == null || this.mHeaderWithKey == undefined) {
            this.mHeaderWithKey = new Headers();
            this.mHeaderWithKey.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            this.mHeaderWithKey.append('X-device-id', this.DEVICE_ID);
        }
    }

    requestGet(url: string, params: string) {
        return this.mHttpService.requestGet(url, params, { headers: this.mHeaderWithKey });
    }

    requestPost(url: string, params: string) {
        return this.mHttpService.requestPost(url, params, { headers: this.mHeaderWithKey });
    }

    /** Lấy bài báo */
    requestPostDetail() {
        return this.requestGet(this.SERVICE_URL, "");
    }

    get(cmd: string, params: string) {
        return this.mHttpService.requestGet(this.SERVICE_URL + cmd, params, { headers: this.mHeader });
    }
    post(cmd: string, params: string) {
        return this.mHttpService.requestPost(this.SERVICE_URL + cmd, params, { headers: this.mHeader });
    }

}