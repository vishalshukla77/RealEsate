import React, { useContext, useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import useAuthCheck from "../hooks/userAuthCheck.jsx";
import { useMutation } from '@tanstack/react-query';
import { UserDetailContext } from '../context/UserDetailContext.js';
import { useAuth0 } from "@auth0/auth0-react";
import { toFav } from '../utlis/api.jsx';
import { updateFavourites, checkFavourites } from '../utlis/common.jsx';

function HeartBtn({ id }) {
  const [heartColor, setHeartColor] = useState("white");
  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();

  const {
    userDetails: { token, favourites },
    setUserDetails,
  } = useContext(UserDetailContext);

  useEffect(() => {
    setHeartColor(() => checkFavourites(id, favourites));
  }, [favourites, id]);

  const { mutate } = useMutation({
    mutationFn: () => toFav(id, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        favourites: updateFavourites(id, prev.favourites),
      }));
    },
  });

  const handleLike = () => {
    if (validateLogin()) {
      mutate();
    }
  };

  return (
    <div>
      <FaHeart
        onClick={(e) => {
          e.stopPropagation();
          handleLike();
        }}
        color={heartColor}
        size={23}
        className="cursor-pointer drop-shadow-sm"
      />
    </div>
  );
}

export default HeartBtn;

