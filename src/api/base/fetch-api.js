import {AppStorage} from "../../const";
import {HttpMethod} from "../../enum";

const getToken = () => {
    if (!localStorage.getItem(AppStorage.ACCESS_TOKEN)){
        return;
    }

    return JSON.parse(localStorage.getItem(AppStorage.ACCESS_TOKEN)).token;
}

const getOptions = (httpMethod = HttpMethod.GET, body = null) => {
    return  {
        method: httpMethod,
        headers: {
            Authorization: `Basic ${btoa(getToken() + ':')}`
        },
        body
    };
}

const sendFetchRequest = (url, method, body) => {
    let resp;

    return fetch(url, getOptions(method, body))
        .then((response) => {
            resp = response;
            return response.json();
        })
        .then((data) => {
            const errors = !resp.ok && method === HttpMethod.POST
                ? JSON.parse(resp.headers.get('Errors'))
                : null;
            return {
                data: resp.ok ? data : null,
                status: resp.status,
                errors
            };
        });
}

const deleteData = (url) => {
    let resp;

    return fetch(url, getOptions(HttpMethod.DELETE))
        .then((response) => {
            resp = response;
            return response;
        })
        .then((data) => {
            return {
                data: resp.ok ? data : null,
                status: resp.status,
                errors: null
            };
        });
}

export {
    sendFetchRequest,
    deleteData
};
