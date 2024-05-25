import {HttpMethod} from "../../enum";
import {getOptions} from "../util";

const sendFetchRequest = async (url, method, body) => {
    const response = await fetch(url, getOptions(method, body));
    const data = await response.json();
    const errors = !response.ok && method === HttpMethod.POST
        ? JSON.parse(response.headers.get('Errors'))
        : null;

    return {
        data: response.ok ? data : null,
        status: response.status,
        errors
    };

}

const deleteData = async (url) => {
    const response = await fetch(url, getOptions(HttpMethod.DELETE));
    const data = await response;
    return {
        data: response.ok ? data : null,
        status: response.status,
        errors: null
    };
}

export {
    sendFetchRequest,
    deleteData
};