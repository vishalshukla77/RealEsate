import React from 'react';
import { FiSettings } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { PROPERTIES } from '../constants/data';
import Items from '../components/Items';
import { Link } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';
import useProperties from '../hooks/useProperties';
function Properties() {

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
    <section className="max-padd-container">
      <div className="max-padd-container bg-primary py-16 xl:py-28 rounded-3xl">
        <span className="medium-18">Your Future Home Awaits!</span>
        <h2 className="h2">Find Your Dream Here</h2>
        <div className="flexbetween mt-8 mb-6">
          <h5>
            <span className="font-bold">Showing 1-9</span> out of {PROPERTIES.length} Properties
          </h5>
         
        </div>

        <Swiper
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            600: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1124: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1300: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          modules={[Autoplay]}
          className="h-[488px] md:h-[533px] xl:h-[422px] mt-5"
        >
          {data.slice(0,6).map((property, index) => (
            <SwiperSlide key={index}>
              <Items property={property} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Properties;
