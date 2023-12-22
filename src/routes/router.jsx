import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import PrivateLayout from "../layouts/PrivateLayout";
import SignUp from "../pages/SignUp/SignUp";
import Home from "../pages/publicPages/Home/Home";
import Login from "../pages/Login/Login";
import TaskManager from "../pages/privatePages/TaskManager/TaskManager";
import PrivateRoute from "./PrivateRoute";
import AboutUs from "../pages/publicPages/AboutUs";



export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'signup',
                element: <SignUp />
            },
            {
                path: '/about',
                element: <AboutUs/>
            }
        ]
    },
    {
        path: '/',
        element: <PrivateLayout />,
        children: [                        
            {
                path: 'task-management',
                element: <PrivateRoute><TaskManager/></PrivateRoute>
            },
            {
                path: 'Profile',
                element: <div>Profile</div>
            },
        ]
    }
])
