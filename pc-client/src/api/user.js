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
   
    console.log(data);

   fetch(url,params).then(response => { 
        console.log(response); 
    });
}