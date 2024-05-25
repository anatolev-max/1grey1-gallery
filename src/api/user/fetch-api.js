import {getOptions} from "../util";
import {HttpMethod} from "../../enum";

const sendData = (url, body, auth = true) => {
    let resp;

    return fetch(url, getOptions(HttpMethod.POST, body, auth))
        .then((response) => {
            resp = response;
            return response.json();
        })
        .then((data) => {
            return {
                data: resp.ok ? data : null,
                status: resp.status,
                errors: resp.ok ? null : JSON.parse(resp.headers.get('Errors'))
            };
        });
};

const deleteToken = (url) => {
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
    sendData,
    deleteToken
};