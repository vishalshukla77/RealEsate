import React, { useEffect, useState } from 'react';  // Importing useState
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { MdMenu, MdClose } from 'react-icons/md';  // Import the icons
import userIcon from '../assets/user.svg';  // Import user icon

function Header() {
  const [menuOpened, setMenuOpened] = useState(false);  // Corrected state initialization
  const [active, setActive] = useState(false);  // New state for scroll effect

  const toggleMenu = () => setMenuOpened(!menuOpened);  // Fixed function for toggling menu

  useEffect(() => {
    const handleScroll = () => {
      // Close menu if open and scroll starts
      if (window.scrollY > 0 && menuOpened) {
        setMenuOpened(false);
      }

      // Set active state when scrolling past a certain point
      setActive(window.scrollY > 40);
    };

    // Adding event listener on component mount
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuOpened]);  // Dependency array ensures the effect is run when `menuOpened` changes

  return (
    <header className={`${active ? "py-0" : "py-1"} max-padd-container fixed top-1 w-full left-0 right-0 z-50 ${active ? 'bg-active' : ''}`}>
      <div className="max-padd-container bg-white transition-all duration-200 rounded-full px-5 ring-1 ring-slate-900/5 shadow-md">
        {/* Flex container for header content */}
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <div>
            <Link to="/" className="text-black no-underline">
              <span className="font-[900] text-[24px]">
                Casa<span className="font-[600] medium-20">Central</span>
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-x-4">
            {/* Regular Navbar for desktop */}
            <Navbar containerStyles="hidden xl:flex gap-x-5 xl:gap-x-10 capitalize medium-15 ring-1 ring-slate-900/10 rounded-full p-2 bg-primary" />
            
            {/* Mobile Navbar toggle */}
            <Navbar 
              containerStyles={`${
                menuOpened
                  ? "flex item-start flex-col gap-y-8 capitalize fixed top-20 right-8 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-slate-900/5 transition-all duration-300 z-50"
                  : "flex item-start flex-col gap-y-8 capitalize fixed top-20 -right-[100%] p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-slate-900/5 transition-all duration-300 z-50"
              }`}
            />
            
            {/* User Icon and Login Button */}
            <div className="flex items-center gap-x-2 sm:gap-x-3 bold-16">
              {/* Menu/Close Button */}
              {!menuOpened ? (
                <MdMenu 
                  onClick={toggleMenu}
                  className="xl:hidden cursor-pointer text-3xl hover:text-secondary"
                />
              ) : (
                <MdClose 
                  onClick={toggleMenu}
                  className="xl:hidden cursor-pointer text-3xl hover:text-secondary"
                />
              )}

              {/* Login Button */}
              <button className="btn-secondary flex items-center gap-x-2 medium-16 rounded-full">
                <img src={userIcon} alt="User Icon" height={22} width={22} />
                <span>Login</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
