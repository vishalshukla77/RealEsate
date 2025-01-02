import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useAuthCheck = () => {
  const { isAuthenticated } = useAuth0();

  const validateLogin = () => {
    if (!isAuthenticated) {
      toast.error("You must log in to continue", {
        position: "bottom-right",
      });
      return false; 
          }
    return true; // Return true if authenticated
  };

  return { validateLogin }; // Properly return the function
};

export default useAuthCheck;
