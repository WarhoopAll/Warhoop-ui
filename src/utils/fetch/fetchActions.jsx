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
export const GetNews = async (limit = 2, offset = 0) => {
    return await GET({ url: `news?limit=${limit}&offset=${offset}` });
};

export const GetNewsByID = async (newsId) => {
    return await GET({url: `news/${newsId}`});
};

export const UpdateNews = async (body) => {
    return await PATCH({url: 'news', body});
};

// Comment
export const CreateComment = async (body) => {
    return await POST({url:'news/comment', body});
};

export const UpdateComment = async (body) => {
    return await PATCH({url: 'news/comment', body});
};

export const DeleteComment = async (commentId) => {
    return await DELETE({url: `news/comment/${commentId}`});
};
// Status
export const ServerStatus = async () => {
    return  await GET({ url: `status` });
};
// Live
export const CheckLive = async () => {
    return  await GET({ url: 'livez' });
};

// Like
export const Reaction = async (body) => {
    return await POST({url: 'reaction', body});
};

// Report
export const Report = async (body) => {
    return await POST({url: 'report', body});
};