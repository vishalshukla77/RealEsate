import React from 'react';
import Items from '../components/Items';  // Correct the import for 'Item'
import SearchBar from '../components/SearchBar';  // Correct the import for 'SearchBar'
import useProperties from '../hooks/useProperties.jsx';
import { PuffLoader } from 'react-spinners'; // Import loader
function Listing() {
  const { data, isError, isLoading } = useProperties();

  if (isError) {
    return (
      <div className="h-64 flex justify-center items-center">
        <span className="text-red-600 font-semibold">
          Error while fetching data
        </span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-64 flex justify-center items-center">
        <PuffLoader
          height={80}
          width={80}
          radius={1}
          color="#555"
          aria-label="Loading spinner"
        />
      </div>
    );
  }

  return (
    <main className="max-padd-container my-[99px]">
      <div className="max-padd-container py-10 xl:py-22 bg-primary rounded-3xl">
        <SearchBar />
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10">
          {data?.map((property) => (
            <Items key={property.title} property={property} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Listing;
