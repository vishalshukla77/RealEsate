import axios from 'axios';
import { toast } from 'react-toastify';  // Correct import for toast notifications

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
