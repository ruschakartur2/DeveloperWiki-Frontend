import axios from 'axios';
import http from '../http-common';

const getAll = () => {
    return axios.get('http://localhost:8000/articles/',
        {
            headers: {
            'Content-type': 'application/json'
    }});
};

const get = id => {
    return http.get(`articles/${id}`);
};

const create = (title,body,author) => {
    return axios.post('http://localhost:8000/articles/', {
            'title': title,
            'body': body,
            'author': author
        },
        {
            headers: {
                'Content-type': 'application/json'
            }});
};

const update = (id,data) => {
    return axios.put(`http://localhost:8000/articles/${id}`, data,
        {
            headers: {
                'Content-type': 'application/json'
            }});
};
const remove = id => {
    return axios.delete(`http://localhost:8000/articles/${id}`,
        {
            headers: {
                'Content-type': 'application/json'
            }});
};

const findByTitle = title => {
    return axios.get(`http://localhost:8000/articles?title=${title}`,
        {
            headers: {
                'Content-type': 'application/json'
            }
        }
    );
};

const ArticleService = {
    get,
    getAll,
    create,
    update,
    remove,
    findByTitle
};

export default ArticleService;
