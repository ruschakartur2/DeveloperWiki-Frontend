import axios from 'axios';
const TAG_URL = "https://swiki.bvblogic.dev/api/v1/tags/"


const getAll = () => {
    return axios.get(TAG_URL , {
        headers: {'Content-type': 'application/json',}
    });

};
const create = (title) => {
    return axios.post(TAG_URL, {
            'title': title,
        },
        {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Token '+JSON.parse((localStorage.getItem('token'))),

            }});
};
const remove = id => {
    return axios.delete(`${TAG_URL}${id}/`,
        {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Token '+JSON.parse((localStorage.getItem('token'))),
            }});
};
const TagService = {
    getAll,
    create,
    remove,
};

export default TagService;
