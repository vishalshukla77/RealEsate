import axios from 'axios';
import { toast } from 'react-toastify';  // Correct import for toast notifications
import dayjs from "dayjs";

export const api = axios.create({
  baseURL: "http://localhost:8000/api/",  // Ensure the base URL is correct
});

// Function to fetch all properties
export const getAllProperties = async () => {
  try {
    const response = await api.get("/residency/allread", {
      timeout: 10 * 1000,  // Timeout set to 10 seconds
    });

    // Check for error status codes and throw an error if necessary
    if (response.status === 400 || response.status === 500) {
      throw new Error(response.data.message || "An error occurred");
    }

    return response.data;  // Return the fetched data
  } catch (error) {
    // Show an error toast if fetching fails
    toast.error(error.message || "Failed to fetch properties");
    throw error;  // Re-throw the error to be handled by React Query
  }
};

export const getProperty=async(id)=>{

  try {
    const response = await api.get(`/residency/${id}`, {
      timeout: 10 * 1000,  // Timeout set to 10 seconds
    });

    // Check for error status codes and throw an error if necessary
    if (response.status === 400 || response.status === 500) {
      throw new Error(response.data.message || "An error occurred");
    }

    return response.data;  // Return the fetched data
  } catch (error) {
    // Show an error toast if fetching fails
    toast.error(error.message || "Failed to fetch properties");
    throw error;  // Re-throw the error to be handled by React Query
  }

}


export const createuser = async (email,token) => {
  try {
    await api.post(`user/register`, { email },
      {
      headers:{
        Authorization:`Bearer ${token}`
      }
    });
   
    toast.success('User registered successfully!');
  } catch (error) {
    toast.error('Something went wrong! Please try again.');
    throw error;
  }
};



export const bookVisit = async (date, propertyId, email, token) => {
  try {
    // Make the API call to book a visit
    await api.post(
      `/user/bookVisit/${propertyId}`,
      {
        email,
        id: propertyId,
        date: dayjs(date).format("DD/MM/YYYY"),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token for authentication
        },
      }
    );
  } catch (error) {
    console.error("Error in booking visit:", error);
    throw new Error("Something went wrong. Please try again."); // Throw a user-friendly error
  }
};


export const removeBooking = async (id, email, token) => {
  try {
    await api.post(`user/removeBooking/${id}`);
  } catch (error) {
    toast.error("Something went wrong");
  }
};



export const toFav = async (id, email, token) => {
  try {
    await api.post(
      `user/toFav/${id}`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error while adding to favorites:", error);
  }
};
