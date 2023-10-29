import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

// Set up the layout for the header for all pages
// Create a search bar
// Create buttons for "Home", "About", "Sign In", and linking the buttons to the pages

export default function Header() {
    // Check if user it's logged in, if it's logged in, show profile page
    const { currentUser } = useSelector ((state) => state.user);
    // Define a constant for searching state and searching content
    const [ searchTerm, setSearchTerm ] = useState("");
    // Initialise useNavigate from react-router-dom
    const navigate= useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Using URLSearchParams to keep all the other parameters besides the searching term or params
        const urlParams = new URLSearchParams(window.location.search);
        // Save all the search params 
        urlParams.set("serachTerm", searchTerm);
        const searchQuery = urlParams.toString();
        // Navigate to the associated url for search results
        navigate(`/search?${searchQuery}`);
    }
    
    return (
    <header className = "bg-gray-200 shadow-md">
        <div className = "flex justify-between items-center max-w-6xl mx-auto p-3">
            <Link to = "/">
                <h1 className ="font-bold text-3xl sm:text-4xl flex flex-wrap">
                    <span className = "text-green-500">Real</span>
                    <span className = "text-green-700">Home</span>
                </h1>
            </Link>

            {/* Both hitting enter or clicking on the search button will start the search */}
            <form onSubmit={handleSubmit} className= "bg-gray-100 p-3 rounded-lg flex items-center">
                <input type = "text" placeholder = "Search..." className = "bg-transparent focus:outline-none w-24 sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button>
                    <FaSearch className = "text-gray-600"/>
                </button>
            </form>
            <ul className="flex gap-4">
                <Link to = "/">
                    <li className="hidden sm:inline text-gray-700 hover:underline">Home</li>
                </Link>
                <Link to = "/about">
                    <li className="hidden sm:inline text-gray-700 hover:underline">About</li>
                </Link>
                <Link to = "/profile">
                    {/* If user is logged in, show profile picture, otherwise display sign in option */}
                    { currentUser ? (
                        <img className="h-7 w-7 rounded" src={currentUser.avatar} />
                    ): ( <li className="sm:inline text-gray-700 hover:underline">Sign In</li> )}
                    
                </Link>

            </ul>
        </div>
    </header>
  )
}
