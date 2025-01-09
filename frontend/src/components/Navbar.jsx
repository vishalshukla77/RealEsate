import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MdHome, MdAddHome, MdPermContactCalendar } from 'react-icons/md';
import { RiCheckboxMultipleBlankFill } from 'react-icons/ri';
import AddPropertyModal from './AddPropertyModal';
import useAuthCheck from '../hooks/userAuthCheck';

function Navbar({ containerStyles }) {
  const [modalOpened, setModalOpened] = useState(false);

  // Custom hook for login validation
  const { validateLogin } = useAuthCheck();

  // Handler for Add Property click
  const handleAddPropertyClick = () => {
    if (validateLogin()) {
      setModalOpened(true);
    } else {
      alert('Please log in to add a property.');
    }
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpened(false);
  };

  return (
    <nav className={containerStyles}>
      {/* Home Link */}
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? 'active-link flexCenter gap-x-1 rounded-full'
            : 'flexCenter gap-x-1 rounded-full text-gray-800'
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
            ? 'active-link flexCenter gap-x-1 rounded-full'
            : 'flexCenter gap-x-1 rounded-full text-gray-800'
        }
      >
        <RiCheckboxMultipleBlankFill size={20} />
        <span>Listing</span>
      </NavLink>

      {/* Contact Link */}
      <a
        href="mailto:vishalshukla1131@gmail.com"
        className="flexCenter gap-x-1 rounded-full text-gray-800 hover:text-blue-500"
      >
        <MdPermContactCalendar size={20} />
        <span>Contact</span>
      </a>

      {/* Add Property Button */}
      <div
        className="flexCenter gap-x-1 rounded-full px-2 py-2 cursor-pointer hover:bg-gray-200"
        onClick={handleAddPropertyClick}
      >
        <MdAddHome size={20} />
        <span>Add Property</span>
      </div>

      {/* Add Property Modal */}
      {modalOpened && <AddPropertyModal onClose={closeModal} />}
    </nav>
  );
}

export default Navbar;
