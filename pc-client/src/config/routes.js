//Es la importación del Layout del admin
import LayoutAdmin from '../layouts/LayoutAdmin';

//Admin Page
import AdminHome from '../pages/Admin'; //Como es exportación default le puedo poner cualquier nombre
import AdminSignIn from '../pages/Admin/SignIn';

const routes = [//Es el sistema de rutas, el array contiene todas las rutas
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
            }
        ]
    }
];

/*En resumen, primero se carga el comonente que tiene el Layout, es exact false porque tiene
    subrutas, luego estando en esa ruta que tiene el componente LayoutAdmin, tengo otras dos
    rutas, esas si deben ser exact true porque es necesario que se mantenga el componente LayoutAdmin
    puesto que aun estamos dentro de la ruta admin*/
export default routes;