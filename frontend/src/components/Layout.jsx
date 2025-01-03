import React, { useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { UserDetailContext } from '../context/UserDetailContext.js';
import { createuser } from '../utlis/api';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout() {


  usefavourites();
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const { setUserDetails } = useContext(UserDetailContext);

  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createuser(user?.email,token),
    onSuccess: () => toast.success("User created successfully!"),
    onError: (error) => toast.error(`Failed to create user: ${error.message}`),
  });

  useEffect(() => {
    const fetchTokenAndRegister = async () => {
      try {
        const res= await getAccessTokenSilently({
          authorizationParams: {
            audience: "http://localhost:8000",
            scope: "openid profile email",
          },
        });

        localStorage.setItem("access_token", res);
        setUserDetails((prev) => ({ ...prev, token:res }));
       mutate(res);
      } catch (error) {
        console.error("Error fetching access token:", error);
        toast.error("Failed to fetch access token.");
      }
    };

    isAuthenticated && fetchTokenAndRegister();
  }, [isAuthenticated]);

  return (
    <>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
