import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useLocation, Link } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineBed, MdOutlineBathtub, MdOutlineGarage } from "react-icons/md";
import { CgRuler } from "react-icons/cg";
import { FaLocationDot } from "react-icons/fa6";
import { getProperty } from "../utlis/api"; // Ensure the correct import path
import Map from "../components/Map"; // Ensure Map is correctly imported
import useAuthCheck from "../hooks/userAuthCheck.jsx";
import BookingModal from "../components/BookingModal"; // Correct BookingModal import

function Property() {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];

  const { data, isLoading, isError } = useQuery({
    queryKey: ["resd", id],
    queryFn: () => getProperty(id),
  });

  const [modalOpened, setModalOpened] = useState(false);

  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();

  if (isLoading) {
    return (
      <div className="h-64 flexCenter">
        <PuffLoader height="80" width="80" radius={1} color="#555" aria-label="puff-loading" />
      </div>
    );
  }

  if (isError) {
    return <div className="h-64 flexCenter">Error while fetching</div>;
  }

  const handleBookVisit = () => {
    if (validateLogin()) {
      setModalOpened(true);
    }
  };

  return (
    <section className="max-padd-container my-[99px]">
      {/* Property Image */}
      <div className="pb-2 relative">
        <img
          src={data.image}
          alt={`${data.title} - ${data.category}`}
          className="rounded-xl w-full max-h-[27rem] self-center object-cover"
        />
        <button className="absolute top-6 right-6 bg-white p-2 rounded-full shadow-md hover:shadow-lg">
          <AiOutlineHeart className="text-xl text-gray-500 hover:text-red-500" />
        </button>
      </div>

      {/* Content Below Image */}
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        {/* Property Details Section */}
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h4 className="medium-20 font-bold line-clamp-1">{data.title}</h4>
            <div className="bold-20">${data.price?.toFixed(2)}</div>
          </div>
          <h5 className="bold-16 my-1 text-secondary">{data.city}</h5>
          <div className="flex gap-x-4 py-3">
            {/* Bedrooms */}
            <div className="flex items-center gap-x-2 border-r border-slate-900/50 pr-4 font-semibold">
              <MdOutlineBed className="text-lg" /> {data.facilities?.bedrooms || 0}
            </div>
            {/* Bathrooms */}
            <div className="flex items-center gap-x-2 border-r border-slate-900/50 pr-4 font-semibold">
              <MdOutlineBathtub className="text-lg" /> {data.facilities?.bathrooms || 0}
            </div>
            {/* Parking */}
            <div className="flex items-center gap-x-2 font-semibold">
              <MdOutlineGarage className="text-lg" /> {data.facilities?.parkings || 0}
            </div>
            {/* Area */}
            <div className="flex items-center gap-x-2 font-semibold">
              <CgRuler className="text-lg" /> {data.area || 400}
            </div>
          </div>
          <p className="pt-2 mb-4 text-base">{data.description}</p>

          {/* Address Section */}
          <div className="flex items-start gap-x-2 my-5">
            <FaLocationDot className="text-xl" />
            <div className="text-secondary font-medium">
              {data?.address}, {data?.city}, {data?.country}
            </div>
          </div>

          {/* Book Button */}
          <div className="w-full">
            <button
              onClick={handleBookVisit}
              className="btn-secondary rounded-xl py-3 px-6 shadow-sm bg-primary text-white font-semibold w-full"
            >
              Book the Visit
            </button>
            <BookingModal
              opened={modalOpened}
              setOpened={setModalOpened}
              propertyId={id}
              email={user?.email}
            />
          </div>
        </div>

        {/* Map Section */}
        <div className="w-full md:w-1/2">
          <Map address={data?.address} city={data?.city} country={data?.country} />
        </div>
      </div>
    </section>
  );
}

export default Property;
