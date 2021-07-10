import axios from 'axios';
const COMMENT_URL = 'https://swiki.bvblogic.dev/api/v1/comments'


const get = (article,page) => {
    return axios.get(`${COMMENT_URL}/?article=${article.id}&page=${page}`,
        {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Token '+JSON.parse((localStorage.getItem('token'))),
            }
        }
    );
};
const create = (article,content,parent) => {
    return axios.post(COMMENT_URL+'/', {
            'article': article,
            'content': content,
            'parent': parent,
        },
        {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Token '+JSON.parse((localStorage.getItem('token'))),

            }
        });
};
const update = (id,data) => {
     return axios.patch(`${COMMENT_URL}/${id}/`, data,
         {
             headers: {
                 'Content-type': 'application/json',
                 'Authorization': 'Token '+JSON.parse((localStorage.getItem('token'))),
             }
         });
 };
const remove = id => {
    return axios.delete(`${COMMENT_URL}/${id}/`,
        {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Token '+JSON.parse((localStorage.getItem('token'))),
            }});
};
const CommentService = {
    get,
    create,
    update,
    remove,
};
export default CommentService;
