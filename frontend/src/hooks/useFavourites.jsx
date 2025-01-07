import React, { useEffect, useContext, useRef } from 'react';
import { UserDetailContext } from '../context/UserDetailContext.js';
import { useQuery } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { getallFav } from '../utlis/api.jsx';

export const useFavourites = () => {
  const { userDetails, setuserDetails } = useContext(UserDetailContext);
  const querRef = useRef();
  const { user } = useAuth0();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['allfavourites'], // Use an array for queryKey
    queryFn: () => getallFav(user?.email, userDetails?.token),
    onSuccess: (data) =>
      setuserDetails((prev) => ({ ...prev, favourites: data })),
    enabled: user!==undefined,
    staleTime: 30000,
  });

  querRef.current = refetch;

  useEffect(() => {
    if (querRef.current) {
      querRef.current();
    }
  }, [userDetails?.token]);

  return { data, isLoading, isError, refetch };
};
