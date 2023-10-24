// Sign up page for new users
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Oauth from "../components/Oauth";


export default function SignUp() {

  const [formData, setFormData] =useState({});
  // Set state if there's an error occurs, null at the beginning by default
  const [error, setError] = useState (null);
  // Set state to loading when user information are not ready to be registered
  // Set to not loading at the beginning by default
  const [loading, setLoading] = useState(false);
  // Define nevigate for when signing up successfully, redirect user to sign in page
  const navigate = useNavigate();
  // Set up onclick event when user enter their user information
  // for the fields that's already filled, we don't want to lose track on them
  const handleChange = (e) =>{
    setFormData(
      {
        // Using Spread operator to keep the data that's already entered
        ...formData,
        [e.target.id]: e.target.value,
      }
    )
  }
  const handleSubmit = async (e) => {
    // Prevent refreshing the page on submitting the form
    e.preventDefault();

    try {
      // At start of the sign up page, loading is true so that the sign up button is not enabled, until all user info is ready
      setLoading(true);
      // Create a fetch api call for "sign up", with POST method and JSON type message by stringifying the input data
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body:JSON.stringify(formData),
      });
      const data = await res.json();
      // In the backend index.js, a middleware for error handling, checks if the status is success of fail
      // If failed, display the error message and change loading status
      if (data.success === false){
        setLoading(false);
        setError(data.message);
        return;
      }
      // If all infomation are checked and all ready to go
      // Reset the loading state and no error is displayed
      setLoading(false);
      setError(null);
      // Navigate to sign in page if user is signed up successfully
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }
  console.log(formData);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
        {/* 3 inputs for creating a new user */}
        <input type="text" placeholder="Username" className="border p-3 rounded-lg" id="username" onChange={handleChange}/>
        <input type="email" placeholder="Email" className="border p-3 rounded-lg" id="email" onChange={handleChange}/>
        <input type="password" placeholder="Password" className="border p-3 rounded-lg" id="password" onChange={handleChange}/>
        {/* Sign up button */}
        {/* When loading is true, button text is "Loading" and button is disabled */}
        {/* When loading is false, button text shows "Sign Up" and button is enabled for signing up */}
        <button className="bg-green-700 text-white p-3 rounded-lg hover:opacity-90" disabled={loading}>
          {loading ? "Loading..." : "SIGN UP"}</button>
        <Oauth></Oauth>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account already?</p>
        <Link to = {"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5"> { error } </p>}
    </div>
  )
}
