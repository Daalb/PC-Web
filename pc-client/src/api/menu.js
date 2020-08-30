import { basePath, apiVersion} from './config';

export function getMenuApi(){
    const url = `${basePath}/${apiVersion}/get-menus`;
    
    //Al ser un get pues no lleva parametros
    return fetch(url)
        .then(response => {
            return response.json();
        }).then(result => {
            return result;
        }).catch(error => {
            return error.message;
        })
}

export function updateMenuApi(token,menuId,data){//data es la info que se quiere actualizar
    const url = `${basePath}/${apiVersion}/update-menu/${menuId}`;

    const params = {
        method: "PUT",
        headers: {
            "Content-Type":"application/json",
            Authorization: token
        },
        body: JSON.stringify(data)
    };

    return fetch(url,params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result.message;
        })
        .catch(err => {
            return err.message;
        });
}


export function activateMenuApi(token, menuId, status){
    const url = `${basePath}/${apiVersion}/activate-menu/${menuId}`;

    const params = {
        method: "PUT",
        headers:{
            "Content-Type":"application/json",
            Authorization:token
        },
        body: JSON.stringify({active:status})
    };

    return fetch(url,params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result.message;
        })
        .catch(err => {
            return err.message;
        })
}

export function addMenuApi(token, menu){
    const url = `${basePath}/${apiVersion}/add-menu`;
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token 
        },
        body: JSON.stringify(menu)
    }

    return fetch(url,params)
    .then(response => {
        return response.json();
    })
    .then(result => {
        return result.message;
    })
    .catch(err => {
        return err.message;
    })
}