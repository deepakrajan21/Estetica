import React, { useState } from "react";
import { currentUser } from "../data/userData"
import logo from "../assets/logo.png"
import menuIcon from "../assets/menu-button.png"
import { Search, Bell } from "lucide-react";


const Header: React.FC = () => {

    const [searchTerm, setSearchTerm] = useState("");

    return (
        <header className="header-panel flex w-full h-full justify-between  py-3 px-10">
            <div className="flex flex-row  items-center w-full">
                <div className="mx-4">
                    <img src={menuIcon} />
                </div>
                <div>
                    <img src={logo} />
                </div>
                <div className="flex flex-col justify-start items-start ml-4">
                    <p className="greeting-text">Welcome Back, {currentUser.name}</p>
                    <p className="greeting-sub-text">Hello, here you can manage your orders by zone</p>
                </div>
            </div>
            <div className="flex flex-row  relative">
                <div className="flex mr-4 relative">
                    <Search className="absolute left-3 top-4.5 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center mr-4">
                    <div className="relative">
                        <Bell className="w-5 h-5 text-gray-600" />
                        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="bg-[#F1F5F9] from-purple-500 to-indigo-500 text-[#020817] w-8 h-8 flex justify-center items-center rounded-full font-semibold">
                        AD
                    </div>
                    <span className="text-gray-700 text-sm">Profile</span>
                </div>
            </div>
        </header>
    )
}

export default Header
