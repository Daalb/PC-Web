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