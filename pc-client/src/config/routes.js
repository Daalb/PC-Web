//Es la importación del Layout del admin
import LayoutAdmin from '../layouts/LayoutAdmin';
//Import Layount para Cliente
import LayoutBasic from '../layouts/LayoutBasic';

//Admin Pages
import AdminHome from '../pages/Admin'; //Como es exportación default le puedo poner cualquier nombre
import AdminSignIn from '../pages/Admin/SignIn';
import AdminUsers from '../pages/Admin/Users';
import AdminMenuWeb from '../pages/Admin/MenuWeb';

//Client Pages
import Contact from '../pages/Contact';
import Home from '../pages/Home';

//Errors
import Error404 from '../pages/Error404';

const routes = [//Es el sistema de rutas, el array contiene todas las rutas
    //Esto es un array de objetos, la primera pos son las rutas de admin la segunda de users
    {
        path: "/admin",
        component: LayoutAdmin,
        exact: false,//No es true porque dentro de el tenemos otras rutas, si lo fuera no cargaría las subrutas
        routes:[//Esto es porque de admin tenemos otras rutas, esto permite cargar las otras rutas
            {
                path: "/admin",
                component: AdminHome,
                exact: true//Al ser exacta hace que se cargue el LayoutAdmin y el componente
            },
            {
                path: "/admin/login",
                component: AdminSignIn,
                exact: true
            },
            {
                path: "/admin/users",
                component: AdminUsers,
                exact: true
            },
            {
                path:"/admin/menu",
                component: AdminMenuWeb,
                exact: true
            },
            {
                component: Error404//Siempre va de ultimo y va sin path porque no sabemos que path pondrá el user   
            }
        ]
    },
    {
        path: "/",//Aquí pasa lo mismo con el path, es falso porque dentro de este tenemos otras rutas
        exact: false,
        component: LayoutBasic,
        routes:[
            {
                path: "/",
                exact: true,
                component: Home
            },
            {
                path :"/contact",
                exact: true,
                component: Contact
            },
            {
                component: Error404
            }
        ]
    }
];

/*En resumen, primero se carga el componente que tiene el Layout, es exact false porque tiene
    subrutas, luego estando en esa ruta que tiene el componente LayoutAdmin, tengo otras dos
    rutas, esas si deben ser exact true porque es necesario que se mantenga el componente LayoutAdmin
    puesto que aun estamos dentro de la ruta admin*/
export default routes;