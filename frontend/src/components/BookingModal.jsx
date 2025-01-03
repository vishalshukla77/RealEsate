import React, { useState, useContext } from "react";
import { DatePicker } from "@mantine/dates";
import { Modal } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { UserDetailContext } from "../context/UserDetailContext"; // Assuming you're using context for user details
import { bookVisit } from "../utlis/api"; // Import the bookVisit API function

function BookingModal({
  opened,
  setOpened,
  email,
  propertyId,
  title = "Select your date to visit",
}) {
  const [value, setValue] = useState(null); // State to hold the selected date
  const [isBooked, setIsBooked] = useState(false); // State to toggle booking button
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const token = userDetails?.token;

  const handleClose = () => setOpened(false);

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: () => bookVisit(value, propertyId, email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        bookings: [
          ...(prev.bookings || []),
          { id: propertyId, date: dayjs(value).format("DD/MM/YYYY") },
        ],
      }));
      setIsBooked(true); // Mark the visit as booked
      alert("Visit booked successfully!");
      handleClose(); // Close the modal
    },
    onError: (error) => {
      console.error("Error booking visit:", error);
      alert(error.message || "Failed to book visit. Please try again.");
    },
  });

  return (
    <Modal opened={opened} onClose={handleClose} title={title} centered>
      <div className="flex flex-col items-center gap-4">
        {/* Date Picker Input */}
        <DatePicker
          placeholder="Pick a date"
          label="Select Date"
          required
          minDate={new Date()} // Disable past dates
          value={value}
          onChange={setValue} // Update state on date selection
          disabled={isBooked} // Disable date picker if booked
        />

        {/* Dynamic Button */}
        <button
          disabled={!value || isLoading}
          onClick={() => mutate()}
          className={`btn-primary px-4 py-2 rounded-lg ${
            isLoading ? "bg-gray-400" : "bg-blue-500 text-white"
          }`}
        >
          {isLoading ? "Booking..." : "Book Visit"}
        </button>

        {/* Error Message */}
        {isError && (
          <p className="text-red-500 text-sm">
            {error?.message || "Something went wrong."}
          </p>
        )}
      </div>
    </Modal>
  );
}

export default BookingModal;
