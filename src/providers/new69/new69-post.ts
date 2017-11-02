import { ResponseCode } from '../app-constant';

export class VideoClip {
    avatarUrl: string;
    date: string;
    description: string;
    title: string;
    url: string;
    totalComments: number;
    categoryName: string;
    onResponseVideo(data) {
        this.avatarUrl = data.avatarUrl;
        this.date = this.convertTime(data.date);
        this.description = data.description;
        this.title = data.title;
        this.url = data.url;
        this.totalComments = data.totalComments;
        this.categoryName = data.categoryName;
    }
    convertTime(date: number): string {
        let miliseconds = (new Date().getTime() - (date * 1000));
        let time: string;
        if (miliseconds <= 60000) {
            time = "1p trước";
        } else if (miliseconds > 60000 && miliseconds < 3600000) {
            let minutes = Math.floor(miliseconds / 60000);
            time = minutes + "p trước";
        }
        else if (3600000 < miliseconds && miliseconds < 86400000) {
            let hours = Math.floor(miliseconds / 3600000);
            time = hours + "h trước";
        } else if (miliseconds > 86400000) {
            let days = Math.floor(miliseconds / 86400000);
            time = days + "ngày trước"
        }
        return time;
    }
}

export class CommentOfCmt {
    cmtContent: string;
    timeCmt: string;
    userCmt: string;
    key: string;
    onResponseComment(data) {
        this.cmtContent = data.cmtContent;
        this.timeCmt = this.convertTime(data.timeCmt);
        this.userCmt = data.userCmt;
        this.key = data.$key;
    }
    convertTime(date: number): string {
        let miliseconds = (new Date().getTime() - (date));
        let time: string;
        if (miliseconds <= 60000) {
            time = "1p trước";
        } else if (miliseconds > 60000 && miliseconds < 3600000) {
            let minutes = Math.floor(miliseconds / 60000);
            time = minutes + "p trước";
        }
        else if (3600000 < miliseconds && miliseconds < 86400000) {
            let hours = Math.floor(miliseconds / 3600000);
            time = hours + "h trước";
        } else if (miliseconds > 86400000) {
            let days = Math.floor(miliseconds / 86400000);
            time = days + "ngày trước"
        }
        return time;
    }
}

export class Comment {
    cmtContent: string;
    timeCmt: string;
    userCmt: string;
    key: string;
    onResponseComment(data) {
        this.cmtContent = data.cmtContent;
        this.timeCmt = this.convertTime(data.timeCmt);
        this.userCmt = data.userCmt;
        this.key = data.$key;
    }
    convertTime(date: number): string {
        let miliseconds = (new Date().getTime() - (date));
        let time: string;
        if (miliseconds <= 60000) {
            time = "1p trước";
        } else if (miliseconds > 60000 && miliseconds < 3600000) {
            let minutes = Math.floor(miliseconds / 60000);
            time = minutes + "p trước";
        }
        else if (3600000 < miliseconds && miliseconds < 86400000) {
            let hours = Math.floor(miliseconds / 3600000);
            time = hours + "h trước";
        } else if (miliseconds > 86400000) {
            let days = Math.floor(miliseconds / 86400000);
            time = days + "ngày trước"
        }
        return time;
    }
}

export class Post {
    //post
    contentId: number
    url: string;
    date: string;
    title: string;
    description: string;
    avatarUrl: string;
    categoryName: string;
    totalComments: number;
    key: string;
    allContent: any[];
    onResponsePost(data) {
        this.contentId = data.contentId;
        this.url = data.url;
        this.date = this.convertTime(data.date);
        this.title = data.title;
        this.description = data.description;
        this.avatarUrl = data.avatarUrl;
        this.categoryName = this.changeCategoryName(data.categoryName);
        this.totalComments = data.totalComments;
        this.key = data.$key;
        this.allContent =  this.getUserCmt(data);
        
    }

    getUserCmt(item): any[]{
        let arr : any = [];
        for (var key in item) {
            if (
                key != "date" && 
                key != "description" &&
                key != "title" &&
                key != "contentId" &&
                key != "totalComments" &&
                key != "categoryName" &&
                key != "avatarUrl" &&
                key != "url") {
                var element = item[key];
                arr.push(this.getContentCmt(element));
            }
        }
        
        return arr;
    }

    getContentCmt(item): any[]{
        let arr : any = [];
        let cmtRep : any = [];
        for (var key in item) {
            if (item.hasOwnProperty(key)) {
                var elements = item[key];
                arr.push({
                    cmtContent: elements.cmtContent,
                    timeCmt: this.convertTime(elements.timeCmt),
                    userCmt: elements.userCmt, 
                    userProfile: elements.userProfile,
                    like: elements.like,
                    allCmtRep: this.getUserRep(elements)
                });
            }
        }
        return arr; 
    }

    getUserRep(item) : any[]{
        let arr : any = [];
        for (var key in item) {
            if (
                key != "cmtContent" &&
                key != "timeCmt" &&
                key != "userCmt" &&
                key != "userProfile" &&
                key != "like"
            ) {
                var element = item[key];
                arr.push({
                    cmtContent: element.cmtContent,
                    timeCmt: this.convertTime(element.timeCmt),
                    userCmt: element.userCmt,
                    userProfile: element.userProfile,
                    like: element.like,
                });
            }
        }
        return arr;
    }

    changeCategoryName(title: string): string {
        let categoryName: string;
        if (
            title == "An ninh - Trật tự" ||
            title == "Xã hội" ||
            title == "Giao thông" ||
            title == "Pháp luật" ||
            title == "Nhà đất" ||
            title == "Lao động - Việc làm" ||
            title == "Sức khỏe - Y tế" ||
            title == "Du lịch" ||
            title == "Tình yêu - Hôn nhân" ||
            title == "Thời trang" ||
            title == "Ẩm thực" ||
            title == "Văn hóa" ||
            title == "Đời sống" ||
            title == "Dinh dưỡng - Làm đẹp" ||
            title == "Môi trường - Khí hậu" ||
            title == "Học bổng - Du học" ||
            title == "Đào tạo - Thi cử" ||
            title == "Giáo dục"
        ) {
            categoryName = "Xã hội"
        }
        else if (
            title == "Điện ảnh - Truyền hình" ||
            title == "Giải trí" ||
            title == "Nghệ thuật" ||
            title == "Âm nhạc"
        ) {
            categoryName = "Giải trí"
        }
        else if (
            title == "Quần vợt" ||
            title == "Bóng đá" ||
            title == "Thể thao"
        ) {
            categoryName = "Thể thao"
        }
        else if (
            title == "Thiết bị - Phần cứng" ||
            title == "Khoa học - Tự nhiên" ||
            title == "Xe cộ" ||
            title == "Không gian - Kiến trúc" ||
            title == "Khoa học - Công nghệ" ||
            title == "CNTT - Viễn thông" ||
            title == "Công nghệ"
        ) {
            categoryName = "Công nghệ"
        }
        else if (
            title == "Kinh tế" ||
            title == "Chứng khoán" ||
            title == "Quản lý - Quy hoạch" ||
            title == "Tài chính" ||
            title == "Kinh doanh"
        ) {
            categoryName = "Kinh tế"
        }
        else if (
            title == "Thời sự" ||
            title == "Hình sự - Dân sự" ||
            title == "Thế giới"
        ) {
            categoryName = "Thế giới"
        }
        return categoryName;
    }

    convertTime(date: number): string {
        let miliseconds = (new Date().getTime() - (date));
        let time: string;
        if (miliseconds <= 60000) {
            time = "1m";
        } else if (miliseconds > 60000 && miliseconds < 3600000) {
            let minutes = Math.floor(miliseconds / 60000);
            time = minutes + "m";
        }
        else if (3600000 < miliseconds && miliseconds < 86400000) {
            let hours = Math.floor(miliseconds / 3600000);
            time = hours + "h";
        } else if (miliseconds > 86400000) {
            let days = Math.floor(miliseconds / 86400000);
            time = days + "d"
        }
        return time;
    }
}
export class New69Post {
    posts: Array<Post> = [];
    onResponeDetailPost(data) {
        if (data.success == ResponseCode.SUCCESS) {
            for (let postData of data.data) {
                let post = new Post();
                post.onResponsePost(postData);
                this.posts.push(post);
            }
        }
    }
}