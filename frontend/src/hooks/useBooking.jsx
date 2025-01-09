import { useContext, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { UserDetailContext } from "../context/UserDetailContext";
import { getAllBookings } from "../utlis/api";

const useBooking = () => {
    const { userDetails, setUserDetails } = useContext(UserDetailContext);
    const queryRef = useRef();
    const { user } = useAuth0();

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["allBookings"], // Provide a valid query key
        queryFn: () => getAllBookings(user?.email, userDetails?.token), // Provide the query function
        onSuccess: (data) => {
            setUserDetails((prev) => ({
                ...prev,
                bookings: data, // Update the UserDetailContext with the fetched bookings
            }));
        },
        enabled: !!user, // Ensure the query runs only if the user is defined
        staleTime: 30000, // Cache duration for 30 seconds
    });

    return {
        data,
        isLoading,
        isError,
        refetch,
    };
};

export default useBooking;
