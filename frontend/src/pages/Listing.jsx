import React from 'react';
import Items from '../components/Items';  // Correct the import for 'Item'
import SearchBar from '../components/SearchBar';  // Correct the import for 'SearchBar'
import useProperties from '../hooks/useProperties.jsx';
import { PROPERTIES } from '../constants/data.jsx';

function Listing() {
  const { data, isError, isLoading } = useProperties();
  console.log(data); 

  return (
    <main className="max-padd-container my-[99px]">
      <div className="max-padd-container py-10 xl:py-22 bg-primary rounded-3xl">
        <SearchBar />
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10">
          {PROPERTIES.map((property) => {

              <Items key={property.title} property={property} />
         
          })}
        </div>
      </div>
    </main>
  );
}

export default Listing;
