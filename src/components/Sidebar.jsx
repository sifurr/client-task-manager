import { Link, NavLink } from "react-router-dom";

import {
    LayoutDashboard,
    ChevronFirst,
    ChevronLast,
    Layers,
    UserSquare,
    LibraryIcon,
    LogOut,   
    HomeIcon
} from "lucide-react";

import { useState } from "react";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";


const Sidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { user, logOut } = useAuth();

    const handleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success("Logged out successfully!");
            })
            .catch(err => {
                toast.error(`Something is wrong!`)
            })
    }

    return (
        <nav className={`${sidebarOpen ? "lg:w-60" : "w-14"} transition-all flex flex-col border-r overflow-hidden`}>
            <div className="flex-1 relative">
                <div className="absolute right-4 top-4 cursor-pointer">
                    {
                        sidebarOpen ?
                            <div onClick={handleSidebar}><ChevronFirst /></div>
                            :
                            <div onClick={handleSidebar}><ChevronLast /></div>
                    }
                </div>

                <br />

                <div className="mb-10 mt-8">
                    <Link to="/" className="flex flex-col gap-4 items-center">
                        <LibraryIcon size={40} />
                        <h3 className={`${!sidebarOpen && "hidden"} text-2xl font-bold`}>Task Manager</h3>
                    </Link>
                </div>
                <ul className="flex flex-col items-center">
                    <div className="space-y-3">
                        <li>
                            <span  className="flex gap-3">
                                <LayoutDashboard />
                                <span
                                    className={`${!sidebarOpen && "hidden"} uppercase font-bold`}>
                                    Dashboard
                                </span>
                            </span>
                        </li>
                        <li>
                            <NavLink to="/" className="flex gap-3">
                                <HomeIcon />
                                <span
                                    className={`${!sidebarOpen && "hidden"}`}>
                                    Home
                                </span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/task-management" className="flex gap-3">
                                <Layers />
                                <span
                                    className={`${!sidebarOpen && "hidden"}`}>
                                    Task Management
                                </span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/" onClick={handleLogout} className="flex gap-3">
                                <LogOut />
                                <span
                                    className={`${!sidebarOpen && "hidden"}`}>
                                    Logout
                                </span>
                            </NavLink>
                        </li>

                    </div>

                </ul>
            </div>
            <div className="mb-10">
                <div className="flex gap-3 justify-center items-center">
                    {
                        user ?
                            <div>
                                <img className="h-10 w-10 border-4 border-gray-900 object-cover" src={user?.photoURL} alt="" />
                            </div>
                            :

                            <UserSquare size={!sidebarOpen ? 40 : 50} ></UserSquare>
                    }
                    <div className={`${!sidebarOpen && "hidden"}`}>
                        <h5>{user?.displayName}</h5>
                        <span>{user?.email}</span>
                    </div>
                </div>
            </div>
        </nav>

    );
};

export default Sidebar;



