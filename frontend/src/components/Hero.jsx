import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="max-padd-container pt-[99px]">
      {/* Hero Background Container */}
      <div className="max-padd-container bg-hero bg-center bg-cover bg-no-repeat h-[655px] w-full rounded-3xl">
        <div className="relative top-32 xs:top-52">
          {/* Intro Text */}
          <p className="medium-18 mb-2">Welcome to CasaCentral</p>

          {/* Hero Heading */}
          <h1 className="h1 capitalize max-w-[40rem] leading-tight">
            Discover Exceptional Homes with CasaCentral
          </h1>

          {/* Hero Description */}
          <p className="my-10 max-w-[33rem]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui odit
            commodi mollitia, et placeat doloremque culpa explicabo perferendis
            quibusdam sint inventore modi sit dolor ipsum eaque id iusto dolore
            harum!
          </p>

          {/* Offer Section */}
          <div className="inline-flex items-center justify-center gap-4 px-2 bg-white rounded-xl shadow-md">
            <div className="text-center regular-14 leading-tight pl-5">
              <h5 className="uppercase font-bold text-secondary">10% Off</h5>
              <p className="regular-14">On All Properties</p>
            </div>
            <Link
              to="/listing"
              className="btn-secondary rounded-xl flex items-center justify-center !py-5 px-4 bg-primary text-white hover:bg-secondary transition duration-300"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
