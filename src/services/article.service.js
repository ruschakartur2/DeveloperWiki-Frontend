import axios from 'axios';
const ARTICLE_URL = "https://swiki.bvblogic.dev/api/v1/articles"

const getAll = () => {
    return axios.get(ARTICLE_URL+'/',
        {
            headers: {
            'Content-type': 'application/json',
            'Authorization': 'Token '+JSON.parse((localStorage.getItem('token'))),

    }});
};

const get = slug => {
    return axios.get(`${ARTICLE_URL}/${slug}/`,
        {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Token '+JSON.parse((localStorage.getItem('token'))),

            }}
    );
};

const create = (title,body,author) => {
    return axios.post(ARTICLE_URL+'/', {
            'title': title,
            'slug': title.replace(' ', ''),
            'body': body,
            'author': author
        },
        {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Token '+JSON.parse((localStorage.getItem('token'))),

            }});
};

const update = (slug,data) => {
    return axios.patch(`${ARTICLE_URL}/${slug}/`, data,
        {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Token '+JSON.parse((localStorage.getItem('token'))),
            }});
};
const remove = id => {
    return axios.delete(`${ARTICLE_URL}/${id}/`,
        {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Token '+JSON.parse((localStorage.getItem('token'))),
            }});
};

const findByTitle = title => {
    return axios.get(`${ARTICLE_URL}/?search=${title}`,
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
