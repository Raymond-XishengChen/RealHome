import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

// Set up the layout for the header for all pages
// Create a search bar
// Create buttons for "Home", "About", "Sign In", and linking the buttons to the pages

export default function Header() {
  return (
    <header className = "bg-gray-200 shadow-md">
        <div className = "flex justify-between items-center max-w-6xl mx-auto p-3">
            <Link to = "/">
                <h1 className ="font-bold test-sm sm:text-xl flex flex-wrap">
                    <span className = "text-green-500">Real</span>
                    <span className = "text-green-700">Home</span>
                </h1>
            </Link>
            <form className= "bg-gray-100 p-3 rounded-lg flex items-center">
                <input type = "text" placeholder = "Search..." className = "bg-transparent focus:outline-none w-24 sm:w-64"/>
                <FaSearch className = "text-gray-600"/>
            </form>
            <ul className="flex gap-4">
                <Link to = "/">
                    <li className="hidden sm:inline text-gray-700 hover:underline">Home</li>
                </Link>
                <Link to = "/about">
                    <li className="hidden sm:inline text-gray-700 hover:underline">About</li>
                </Link>
                <Link to = "/sign-in">
                    <li className="sm:inline text-gray-700 hover:underline">Sign In</li>
                </Link>
            </ul>
        </div>
    </header>
  )
}
