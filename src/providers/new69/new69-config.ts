export class New69Config {
    private mAppData;
    private mVersion: string = "1.0";

    constructor() {

    }
    public onResponseConfig(data) {
        if (!data) return;
        this.mAppData = data;
        if (data.version) this.mVersion = data.version;
    }
    public hasData() {
        return this.mAppData != null;
    }
    public getConfig(key: string) {
        if (this.mAppData & this.mAppData['key']) return this.mAppData['key'];
        return undefined;
    }
    public getAppVersion() {
        return this.mVersion;
    }
    getViewData(viewName: string) {
        if (this.mAppData && this.mAppData[viewName]) return this.mAppData[viewName];
        return {};
    }
    get(key: string) {
        if (this.mAppData && this.mAppData[key]) return this.mAppData[key];
        return {};
    }
}