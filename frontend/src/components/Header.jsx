import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { MdMenu, MdClose } from 'react-icons/md';
import userIcon from '../assets/user.svg';
import { useAuth0 } from '@auth0/auth0-react';
import ProfileMenu from './ProfileMenu';

function Header() {
  const [menuOpened, setMenuOpened] = useState(false);
  const [active, setActive] = useState(false);

  const toggleMenu = () => setMenuOpened(!menuOpened);

  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0 && menuOpened) {
        setMenuOpened(false);
      }
      setActive(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [menuOpened]);

  return (
    <header
      className={`${active ? 'py-0' : 'py-1'} max-padd-container fixed top-1 w-full left-0 right-0 z-50 ${
        active ? 'bg-active' : ''
      }`}
    >
      <div className="max-padd-container bg-white transition-all duration-200 rounded-full px-5 ring-1 ring-slate-900/5 shadow-md">
        <div className="flex justify-between items-center py-3">
          <div>
            <Link to="/" className="text-black no-underline">
              <span className="font-[900] text-[24px]">
                Casa<span className="font-[600] medium-20">Central</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-x-4">
            {/* Desktop Navbar */}
            <Navbar containerStyles="hidden xl:flex gap-x-5 xl:gap-x-10 capitalize medium-15 ring-1 ring-slate-900/10 rounded-full p-2 bg-primary" />

            {/* Mobile Navbar */}
            <Navbar
              containerStyles={`${
                menuOpened
                  ? 'flex item-start flex-col gap-y-8 capitalize fixed top-20 right-8 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-slate-900/5 transition-all duration-300 z-50'
                  : 'flex item-start flex-col gap-y-8 capitalize fixed top-20 -right-[100%] p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-slate-900/5 transition-all duration-300 z-50'
              }`}
            />

            {/* User Icon and Login/Logout */}
            <div className="flex items-center gap-x-2 sm:gap-x-3 bold-16">
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

              {isAuthenticated ? (
                <ProfileMenu user={user} logout={logout} />
              ) : (
                <button
                  onClick={loginWithRedirect}
                  className="btn-secondary flex items-center gap-x-2 medium-16 rounded-full"
                >
                  <img src={userIcon} alt="User Icon" height={22} width={22} />
                  <span>Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
