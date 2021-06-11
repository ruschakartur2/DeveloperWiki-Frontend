import axios from 'axios';
import react from 'react';
import http from '../http-common';

const getAll = () => {
    return http.get('articles');
};

const get = id => {
    return http.get(`articles/${id}`);
};

const create = data => {
    return http.post('articles', data);
};

const update = (id,data) => {
    return http.put(`articles/${id}`, data);
};
const remove = id => {
    return http.delete(`articles/${id}`);
};

const findByTitle = title => {
    return http.get(`articles?title=${title}`);
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
