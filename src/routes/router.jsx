import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import PrivateLayout from "../layouts/PrivateLayout";
import SignUp from "../pages/SignUp/SignUp";
import Home from "../pages/publicPages/Home/Home";
import Login from "../pages/Login/Login";



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
            }
        ]
    },
    {
        path: '/',
        element: <PrivateLayout />,
        children: [
            {
                path: 'dashboard',
                element: <div>dashboard</div>
            },
            {
                path: 'task-management',
                element: <div>Task Management</div>
            },
            {
                path: 'Profile',
                element: <div>Profile</div>
            },
        ]
    }
])
