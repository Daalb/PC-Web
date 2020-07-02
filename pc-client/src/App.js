import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import routes from './config/routes';
import { removeFileItem } from 'antd/lib/upload/utils';
import AuthProvider from './providers/AuthProvider';

import './App.scss';

//Esta es la raíz de la aplicación

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          {routes.map((route, index)=>(
            <RouteWithSubRoutes key={index}{...route}/> //Va entre llaves porque es código Js
          ))} 
        </Switch>
      </Router>
    </AuthProvider>
  );
}

function RouteWithSubRoutes(route){  
  return (
    <Route
      path = {route.path}
      exact = {route.exact}
      render = {props=><route.component routes={route.routes} {...props}/>}
    />  
  );

}/*Renderizar la ruta padre y pasarle las rutas hijas al componente. 
  Esto permite renderizar varias rutas sin la necesidad de poner cada una en el Switch,
  solo se cambia en el routes.js y por medio del bucle se renderizarán todas*/



export default App;
