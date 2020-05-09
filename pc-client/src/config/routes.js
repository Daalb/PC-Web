//Layout
import LayoutAdmin from '../layouts/LayoutAdmin';

//Admin Page
import AdminHome from '../pages/Admin'; //Como es exportación default le puedo poner cualquier nombre
import AdminSignIn from '../pages/Admin/SignIn';

const routes = [
    {
        path: "/admin",
        component: LayoutAdmin,
        exact: false,
        routes:[
            {
                path: "/admin",
                component: AdminHome,
                exact: true
            },
            {
                path: "/admin/login",
                component: AdminSignIn,
                exact: true
            }
        ]
    }
];

export default routes;