import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";



export const PrivateLayout = () => {

    return (
        <div className="flex flex-row h-screen bg-neutral-200 dark:bg-gray-900 text-neutral-900 dark:text-neutral-300 w-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-1 bg-gray-50 dark:bg-gray-900 text-neutral-900 dark:text-neutral-300">
                <div className="flex-1 overflow-auto p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};



export default PrivateLayout