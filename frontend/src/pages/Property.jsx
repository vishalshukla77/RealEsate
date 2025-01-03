import React, { useState, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import HeartBtn from "../components/HeartBtn.jsx";

import { MdOutlineBed, MdOutlineBathtub, MdOutlineGarage } from "react-icons/md";
import { CgRuler } from "react-icons/cg";
import { FaLocationDot } from "react-icons/fa6";
import { getProperty, removeBooking } from "../utlis/api";
import Map from "../components/Map";
import useAuthCheck from "../hooks/userAuthCheck.jsx";
import BookingModal from "../components/BookingModal";
import { UserDetailContext } from "../context/UserDetailContext.js";

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
  const {
    userDetails: { token, bookings },
    setUserDetails,
  } = useContext(UserDetailContext);

  const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
    mutationFn: () => removeBooking(id, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        bookings: prev.bookings.filter((booking) => booking?.id !== id),
      }));
      toast.success("Booking cancelled", { position: "bottom-right" });
    },
  });

  if (isLoading) {
    return (
      <div className="h-64 flexCenter">
        <PuffLoader size={80} color="#555" aria-label="puff-loading" />
      </div>
    );
  }

  if (isError || !data) {
    return <div className="h-64 flexCenter">Error while fetching or no data available</div>;
  }

  const handleBookVisit = () => {
    if (validateLogin()) {
      setModalOpened(true);
    }
  };

  return (
    <section className="max-padd-container my-[99px]">
      {/* Property Image */}
      {data.image && (
        <div className="pb-2 relative">
          <img
            src={data.image}
            alt={`${data.title} - ${data.category}`}
            className="rounded-xl w-full max-h-[27rem] self-center object-cover"
          />
          <button className="absolute top-6 right-6 p-2 rounded-full shadow-md hover:shadow-lg">
            <HeartBtn id={id} className="text-xl text-gray-500 hover:text-red-500" />
          </button>
        </div>
      )}

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
            <div className="flex items-center gap-x-2 border-r border-slate-900/50 pr-4 font-semibold">
              <MdOutlineBed className="text-lg" /> {data.facilities?.bedrooms || 0}
            </div>
            <div className="flex items-center gap-x-2 border-r border-slate-900/50 pr-4 font-semibold">
              <MdOutlineBathtub className="text-lg" /> {data.facilities?.bathrooms || 0}
            </div>
            <div className="flex items-center gap-x-2 font-semibold">
              <MdOutlineGarage className="text-lg" /> {data.facilities?.parkings || 0}
            </div>
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
            {bookings?.some((booking) => booking.id === id) ? (
              <>
                <button
                  onClick={() => cancelBooking()}
                  className="btn-secondary rounded-xl py-3 px-6 shadow-sm bg-red-500 text-white font-semibold w-full"
                  disabled={cancelling}
                >
                  Cancel Booking
                </button>
                <p className="mt-2 text-sm text-gray-600">
                  You have already booked a visit for{" "}
                  <span className="font-semibold">
                    {bookings?.find((booking) => booking.id === id)?.date || "N/A"}
                  </span>
                </p>
              </>
            ) : (
              <button
                onClick={handleBookVisit}
                className="btn-secondary rounded-xl py-3 px-6 shadow-sm bg-primary text-white font-semibold w-full"
              >
                Book the Visit
              </button>
            )}
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
