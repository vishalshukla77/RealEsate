import React from 'react';
import { NavLink } from 'react-router-dom';
// Import icons from react-icons
import { MdHome, MdAddHome, MdPermContactCalendar } from 'react-icons/md';
import { RiCheckboxMultipleBlankFill } from 'react-icons/ri';

function Navbar({ containerStyles }) {  // Destructure props correctly
  return (
    <nav className={containerStyles}>  {/* Corrected the usage of className */}
      {/* Home Link */}
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "active-link flexCenter gap-x-1 rounded-full "
            : "flexCenter gap-x-1 rounded-full text-gray-800"
        }
      >
        <MdHome size={20} />
        <span>Home</span>
      </NavLink>

      {/* Listing Link */}
      <NavLink
        to="/listing"
        className={({ isActive }) =>
          isActive
            ? "active-link flexCenter gap-x-1 rounded-full"
            : "flexCenter gap-x-1 rounded-full text-gray-800"
        }
      >
        <RiCheckboxMultipleBlankFill size={20} />
        <span>Listing</span>
      </NavLink>

      {/* Contact Link */}
      <a
        href="mailto:vishalshukla1131@gmail.com"
        className="flexCenter gap-x-1 rounded-full text-gray-800"
      >
        <MdPermContactCalendar size={20} />
        <span>Contact</span>
      </a>

      {/* Add Property Link */}
      <NavLink
        to="/addproperty"
        className={({ isActive }) =>
          isActive
            ? "active-link flexCenter gap-x-1 rounded-full "
            : "flexCenter gap-x-1 rounded-full text-gray-800"
        }
      >
        <MdAddHome size={20} />
        <span>Add Property</span>
      </NavLink>
    </nav>
  );
}

export default Navbar;
