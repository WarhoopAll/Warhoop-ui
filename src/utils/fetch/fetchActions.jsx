// Auth
import {DELETE, GET, PATCH, POST} from "@/utils/fetch/fetchHelper";

export const Signup = async (body) => {
    return await POST({url: 'auth/signup', body});
};

export const Signin = async (body) => {
    return await POST({url: 'auth/signin', body});
};

export const Logout = async () => {
    return await GET({url: 'auth/logout'});
};

export const CheckSession = async () => {
    return await GET({url: 'auth/session'});
};
// News
export const GetNews = async () => {
    return await GET({url: `news`});
};

export const GetNewsByID = async (newsId) => {
    return await GET({url: `news/${newsId}`});
};
// Comment
export const CreateComment = async (body) => {
    const url = 'news/comment';
    return await POST({url, body});
};

export const UpdateComment = async () => {
    return await PATCH({url: 'news/comment', body});
};

export const DeleteComment = async (commentId) => {
    return await DELETE({url: `news/comment/${commentId}`});
};