import React, { useEffect, useContext, useRef } from 'react';
import { UserDetailContext } from '../context/UserDetailContext.js';
import { useQuery } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { getallFav } from '../utlis/api.jsx';

export const useFavourites = () => {
  const { userDetails, setuserDetails } = useContext(UserDetailContext);
  const querRef = useRef();
  const { user } = useAuth0();

  const fetchFavourites = async () => {
    if (!user?.email || !userDetails?.token) {
      return []; // Return an empty array or default value to prevent undefined
    }
    return await getallFav(user.email, userDetails.token);
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['allfavourites'],
    queryFn: fetchFavourites,
    onSuccess: (data) => {
      setuserDetails((prev) => ({ ...prev, favourites: data }));
    },
    enabled: Boolean(user?.email && userDetails?.token), // Only enable query if required data is available
    staleTime: 30000,
  });

  querRef.current = refetch;

  useEffect(() => {
    if (querRef.current && userDetails?.token) {
      querRef.current();
    }
  }, [userDetails?.token]);

  return { data, isLoading, isError, refetch };
};
