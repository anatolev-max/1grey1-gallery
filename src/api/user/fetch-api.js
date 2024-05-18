import {URL} from "../../const";

const sendData = (url, body) => {
    let resp;

    return fetch(url, {
        method: 'POST',
        body
    })
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

const deleteToken = (token, tokenId) => {
    let resp;

    return fetch(`${URL.ACCESS_TOKEN.DELETE}${tokenId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Basic ${btoa(token + ':')}`
        }
    })
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