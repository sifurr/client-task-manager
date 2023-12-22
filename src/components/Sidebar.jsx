import { Link, NavLink } from "react-router-dom";

import { LayoutDashboard,      
    ChevronFirst, 
    ChevronLast, 
    Layers,     
    UserSquare, 
    LibraryIcon
     } from "lucide-react";

import { useState } from "react";       

        
const Sidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true)

    const handleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
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
                   
                    <div className="mb-10 mt-8">
                        <Link to="/" className="flex flex-col gap-4 items-center">
                            <LibraryIcon size={40} />
                            <h3 className={`${!sidebarOpen && "hidden"} text-2xl font-bold`}>Task Manager</h3>
                        </Link>
                    </div>
                    <ul className="flex flex-col items-center">
                        <div className="space-y-3">
                            <li>
                                <NavLink to="/task-management" className="flex gap-3">
                                    <LayoutDashboard />
                                    <span
                                        className={`${!sidebarOpen && "hidden"}`}>
                                        Dashboard
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
                            
                        </div>

                    </ul>
                </div>
                <div className="mb-10">
                    <div className="flex gap-3 justify-center items-center">
                        <UserSquare size={!sidebarOpen ? 40 : 50} ></UserSquare>
                        <div className={`${!sidebarOpen && "hidden"}`}>
                            <h5>John Doe</h5>
                            <span>john@doe.com</span>
                        </div>
                    </div>
                </div>
            </nav>
        
    );
};

export default Sidebar;