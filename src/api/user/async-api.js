import {getOptions} from "../util";
import {HttpMethod} from "../../enum";

const sendData = async (url, body, auth = true) => {
    const response = await fetch(url, getOptions(HttpMethod.POST, body, auth));
    const data = await response.json();
    return {
        data: response.ok ? data : null,
        status: response.status,
        errors: response.ok ? null : JSON.parse(response.headers.get('Errors'))
    };
};

const deleteToken = async (url) => {
    const response = await fetch(url, getOptions(HttpMethod.DELETE));
    const data = await response;
    return {
        data: response.ok ? data : null,
        status: response.status,
        errors: null
    };
}

export {
    sendData,
    deleteToken
}
