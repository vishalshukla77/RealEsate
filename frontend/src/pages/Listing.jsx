import React from 'react';
import { PROPERTIES } from '../constants/data';
import { SwiperSlide } from 'swiper/react'; // Import only SwiperSlide
import Items from '../components/Items';  // Correct the import for 'Item'
import SearchBar from '../components/SearchBar';  // Correct the import for 'SearchBar'

function Listing() {
  return (
    <main className='max-padd-container my-[99px]'>
      <div className='max-padd-container py-10 xl:py-22 bg-primary rounded-3xl'>
        <SearchBar />
        <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10'>
          {PROPERTIES.map((property) => {
            return (
              <SwiperSlide key={property.title}>
                <Items key={property.value} property={property} />
              </SwiperSlide>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default Listing;
