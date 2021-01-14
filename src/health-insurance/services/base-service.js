import {getAxiosInstance} from './api';

class BaseService {

    constructor(url) {
        this.url = url;
    }

    async list(params) {
        return await getAxiosInstance().get(this.url, {
            params
        });
    }

    async save(data) {
        return await getAxiosInstance().post(this.url, data);
    }

    async update(data) {
        return await getAxiosInstance().patch(this.url, data);
    }

    async replace(data) {
        return await getAxiosInstance().post(`${this.url}/${data.id}/replace`, data);
    }

    async remove(id) {
        return await getAxiosInstance().delete(`${this.url}/${data.id}`);
    }

    async get(id, params, url = '') {
        return await getAxiosInstance().get(`${this.url}/${id}${url}`, {
            params
        });
    }

    async post(url = '', data) {
        return await getAxiosInstance().post(`${this.url}${url}`, data);
    }

    async upload(url = '', formData){
        return await getAxiosInstance().post(`${this.url}${url}`, formData);
    }

    async head(){
        return await getAxiosInstance().head(`${this.url}`);
    }
}

export { BaseService };
