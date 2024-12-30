import React, { useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { UserDetailContext } from '../context/UserDetailContext.js'; // Ensure the context is correctly exported
import { createuser } from '../utlis/api';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout() {
  const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
  const { setUserDetails } = useContext(UserDetailContext);

  // Mutation to create a user
  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: () => createuser(user?.email),
  });

  useEffect(() => {
    isAuthenticated && mutate();
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
