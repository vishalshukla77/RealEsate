
// Utility Functions
export const updateFavourites = (id, favourites = []) => {
    if (favourites.includes(id)) {
      return favourites.filter((resId) => resId !== id);
    } else {
      return [...favourites, id];
    }
  };
  
  export const checkFavourites = (id, favourites = []) => {
    return favourites.includes(id) ? "#BAC243" : "white";
  };