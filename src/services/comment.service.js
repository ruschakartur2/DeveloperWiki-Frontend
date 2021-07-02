import axios from 'axios';
const COMMENT_URL = 'http://localhost:8000/api/comments'


const get = article => {
    return axios.get(`${COMMENT_URL}/?article=${article.id}`,
        {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Token '+JSON.parse((localStorage.getItem('token'))),
            }
        }
    );
};
const create = (article,content) => {
    return axios.post(COMMENT_URL+'/', {
            'article': article.id,
            'content': content,
        },
        {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Token '+JSON.parse((localStorage.getItem('token'))),

            }
        });
};
// const update = (id,data) => {
//     return axios.patch(`${COMMENT_URL}/${id}/`, data,
//         {
//             headers: {
//                 'Content-type': 'application/json',
//                 'Authorization': 'Token '+JSON.parse((localStorage.getItem('token'))),
//             }
//         });
// };
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
