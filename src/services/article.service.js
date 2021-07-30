import axios from 'axios';


const ARTICLE_URL = "http://localhost:8000/api/articles/"



const getAll = (page, popular = null, newest = null) => {
    return axios.get(ARTICLE_URL + `?page=${page ? (page) : ('')}${popular ? ('&popular=1') : ('')}${newest ? ('&new=1') : ('')}`,
        {
            headers: {'Content-type': 'application/json',}
        });

};


const get = slug => {
    return axios.get(`${ARTICLE_URL}${slug}/`, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Token ' + JSON.parse((localStorage.getItem('token'))),
        }
    });
};

const create = (title, tags, body, author) => {
    return axios.post(ARTICLE_URL, {
            'title': title,
            'update_tags': tags,
            'slug': title.replace(' ', ''),
            'body': body,
            'author': author
        },
        {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Token ' + JSON.parse((localStorage.getItem('token'))),

            }
        });
};

const update = (slug, data) => {
    return axios.patch(`${ARTICLE_URL}${slug}/`, data,
        {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Token ' + JSON.parse((localStorage.getItem('token'))),
            }
        });
};
const remove = id => {
    return axios.delete(`${ARTICLE_URL}${id}/`,
        {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Token ' + JSON.parse((localStorage.getItem('token'))),
            }
        });
};

const findByTitle = (title, page) => {
    return axios.get(`${ARTICLE_URL}?search=${title}&page=${page}`,
        {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Token ' + JSON.parse((localStorage.getItem('token'))),
            }
        }
    );
};


const getByTag = (tag, page, popular = null, newest = null) => {
    return axios.get(`${ARTICLE_URL}?tags__title=${tag}&page=${page}&popular=${popular}&new=${newest}`,
        {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Token ' + JSON.parse((localStorage.getItem('token'))),

            }
        });
}

const getUserArticles = (id,page) => {
    return axios.get(`${ARTICLE_URL}?author__id=${id}&page=${page}`, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Token ' + JSON.parse((localStorage.getItem('token'))),

        }
    })
}

const ArticleService = {
    get,
    getAll,
    create,
    update,
    remove,
    findByTitle,
    getByTag,
    getUserArticles,
};

export default ArticleService;
