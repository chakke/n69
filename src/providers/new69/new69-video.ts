import { ResponseCode } from '../app-constant';

export class Post{
    videoId: number
    url: string;
    date: string;
    title: string;
    description: string;
    avatarUrl: string;
    categoryName: string;
    totalComments: number;
    onResponsePost(data){
        this.videoId = data.contentId;
        this.url = data.url;
        this.date = data.date;
        this.title = data.title;
        this.description = data.description;
        this.avatarUrl = data.avatarUrl;
        this.categoryName = data.categoryName;
        this.totalComments = data.totalComments;
    }
}
export class New69Post{
    posts: Array<Post> = [];
    onResponeDetailPost(data){
        if(data.success == ResponseCode.SUCCESS){
            for(let postData of data.data){
                let post = new Post();
                post.onResponsePost(postData);
                this.posts.push(post);
            }
        }
    }
}