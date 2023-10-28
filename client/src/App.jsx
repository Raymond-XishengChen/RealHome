// Importing all pages to the home route
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SingIn from "./pages/SingIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import CreateListing from "./pages/CreateListing"
import Header from "./components/Header";
import Signined from "./components/Signined";

// Create the template to include all pages and the header to all pages
export default function App() {
  return  <BrowserRouter>
  <Header />
  <Routes>
    <Route path = "/" element = { <Home />} />
    <Route path = "/sign-in" element = { <SingIn />} />
    <Route path = "/sign-up" element = { <SignUp />} />
    <Route path = "/about" element = { <About />} />
    {/* Only when user is logged in, show the profile page, making the profile page the children */}
    <Route element = {<Signined />}>
      <Route path = "/profile" element = { <Profile />} />
      <Route path = "/create-listing" element = { <CreateListing />} />

    </Route>
  </Routes>
  </BrowserRouter>;
}
