/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";

export default function Home() {
    // Set up constants for fetching listings in the home page for display
    const [offers, setOffers] = useState([]);
    const [sales, setSales] = useState([]);
    const [rents, setRents] = useState([]);

    SwiperCore.use([Navigation]);

    useEffect(() => {
    // Function to get a list of listings with offers
    const fetchOffers = async () => {
      try {
        // Use the search function for getting the latest listings with offers
        const res = await fetch("/api/listing/get?offer=true&limit=3");
        const data = await res.json();
        setOffers(data);
      }
      catch (error){
        console.log(error);
      }
    }

    // Function to get a list of renting listings
    const fetchRents = async () => {
      try {
        // Use the search function for getting the latest renting listings
        const res = await fetch("/api/listing/get?type=rent&limit=3");
        const data = await res.json();
        setRents(data);
      }
      catch (error){
        console.log(error);
      }
    }

    // Function to get a list of selling listings
    const fetchSales = async () => {
      try {
        // Use the search function for getting the latest selling listings
        const res = await fetch("/api/listing/get?type=sale&limit=3");
        const data = await res.json();
        setSales(data);
      }
      catch (error){
        console.log(error);
      }
    }
    fetchOffers();
    fetchRents();
    fetchSales();
  },[])
  

  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="font-bold text-3xl text-green-900 lg:text-6xl">Welcome to our premier real estate destination, where your
        <br /> 
        <span className="font-bold text-3xl text-green-700 lg:text-6xl"> DREAM </span> 
        <span className="font-bold text-3xl text-green-500 lg:text-6xl">Home</span> awaits.</h1>

        <div className="font-bold text-xl text-gray-400">Discover a world of possibilities as you explore our meticulously curated listings, 
          showcasing a diverse range of properties to suit every lifestyle.</div>

          <Link to={"/search"} className="text-base font-bold text-blue-500 sm:text-lg">
            Let's start exploring!
          </Link>
      </div>

      <Swiper navigation>
        {offers && offers.length > 0 && offers.map((listing) => (
          // eslint-disable-next-line react/jsx-key
          <SwiperSlide>
            <div style={{background: `url(${listing.imageUrls[0]}) no-repeat center`, backgroundSize: "cover",}} 
            className="h-[800px]" key={listing._id}></div>
          </SwiperSlide>)
        )}
      </Swiper>

      <div className="content-center max-w-6xl mx-auto p-3 flex flex-col gap-6 my-10">
      {offers && offers.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Recent offers</h2>
              <Link className="text-sm text-blue-800 hover:underline" to={"/search?offer=true"}>Show more offers</Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offers.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      {rents && rents.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Recent renting places</h2>
              <Link className="text-sm text-blue-800 hover:underline" to={"/search?offer=true"}>Show more offers</Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rents.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      {sales && sales.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Recent selling places</h2>
              <Link className="text-sm text-blue-800 hover:underline" to={"/search?offer=true"}>Show more offers</Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {sales.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
