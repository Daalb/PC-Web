//Funciones para conectar los endpoints de users
import { basePath, apiVersion} from './config';

export function signUpApi(data){
    const url = `${basePath}/${apiVersion}/sign-up`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),// lo pasa a JSON
        headers: {
            "Content-Type": "application/json"
        }
    };
   
   

  return fetch(url,params).then(response => { 
        return response.json();
    }).then(result => {
        if (result.user) {
            return {
                ok: true,
                message: "Usuario creado correctamente"
            };
        }   
        return {
            ok: false,
            message:result.message
        };
    }).catch(err => {
        return {
            ok: false,
            message: err.message
        };
    })
}

export function signInApi(data){
    const url = `${basePath}/${apiVersion}/sign-in`;
    const params = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    };

    return fetch(url,params)
    .then(response => {
        return response.json();
    }).then(result => {
        return result;
    })
    .catch(err => {
        return err.message;
    })
    
    
}

export function getUsersApi(token){
    const url = `${basePath}/${apiVersion}/users`;
    
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    };

    return fetch(url,params)
    .then(response => {
        return response.json();
    })
    .then(result =>{
        return result;
    })
    .catch(err => {
        return err.message;
    })
}

export function getUsersActiveApi(token,status){
    const url = `${basePath}/${apiVersion}/users-active?active=${status}`;
    
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    };

    return fetch(url,params)
    .then(response => {
        return response.json();
    })
    .then(result =>{
        return result;
    })
    .catch(err => {
        return err.message;
    })
}