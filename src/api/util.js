import {HttpMethod} from "../enum";
import {APP_STORAGE} from "../const";

const getToken = () => {
    if (!localStorage.getItem(APP_STORAGE.ACCESS_TOKEN)){
        return;
    }

    return JSON.parse(localStorage.getItem(APP_STORAGE.ACCESS_TOKEN)).token;
}

const getOptions = (httpMethod = HttpMethod.GET, body = null, auth = true) => {
    const headers = {};
    if (auth) {
        headers.Authorization = `Basic ${btoa(getToken() + ':')}`;
    }

    return  {
        method: httpMethod,
        headers,
        body
    };
}

export {getOptions};