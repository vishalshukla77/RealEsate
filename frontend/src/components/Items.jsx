import React from 'react';
import { MdOutlineBed, MdOutlineBathtub, MdOutlineGarage } from 'react-icons/md';
import { AiOutlineHeart } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { CgRuler } from 'react-icons/cg'
import HeartBtn from './HeartBtn';
function Items({ property }) {
const navigate=useNavigate();




  return (
    <div onClick={()=>navigate(`../listing/${property.id}`)} className="rounded-2xl p-5 bg-white flex flex-col justify-between h-full">
      {/* Image Section */}
      <div className="pb-2 relative">
        <img
          src={property.image}
          alt={`${property.title} - ${property.category}`}
          className="rounded-xl w-full h-48 object-cover"
        />
        <button className="absolute top-6 right-6 bg-white p-2 rounded-full shadow-md hover:shadow-lg">
          <HeartBtn id={property?.id} />
        </button>
      </div>

      {/* Property Details */}
      <div className="flex-grow">
        <h5 className="bold-16 my-1 text-secondary">{property.city}</h5>
        <h4 className="medium-18 line-clamp-1">{property.title}</h4>
        <div className="flex gap-x-2 py-2">
          {/* Bedrooms */}
          <div className="flex items-center gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
            <MdOutlineBed /> {property.facilities?.bedrooms || 0}
          </div>
          {/* Bathrooms */}
          <div className="flex items-center gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
            <MdOutlineBathtub /> {property.facilities?.bathrooms || 0}
          </div>
          {/* Parking */}
          <div className="flex items-center gap-x-2 font-[500]">
            <MdOutlineGarage /> {property.facilities?.parkings || 0}
          </div>
          <div className="flex items-center gap-x-2 font-[500]">
            <CgRuler /> 400
          </div>
        </div>
        <p className="pt-2  line-clamp-2">{property.description}</p>
      </div>

      {/* Price and Button */}
      <div className="flex justify-between items-center mt-4">
        <div className="bold-20">${property.price?.toFixed(2)}</div>
        <Link to={'/'}>
          <button className="btn-secondary rounded-xl py-3 px-6 shadow-sm bg-primary text-white">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Items;
