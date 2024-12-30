import React, { Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';

import Home from './pages/Home';
import Listing from './pages/Listing';
import AddProperty from './pages/AddProperty';
import Favorites from './pages/Favorites';
import Bookings from './pages/Bookings';
import Layout from './components/Layout';
import Property from './pages/Property';
import { UserDetailContext } from './context/UserDetailContext.js'; // Correct import for context
import 'react-toastify/dist/ReactToastify.css';



export default function App() {
  const queryClient = new QueryClient();

  const [userDetails, setUserDetails] = useState({
    favorites: [],
    bookings: [],
    token: null, // Corrected syntax
  });

  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<div>Loading data...</div>}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/listing">
                  <Route index element={<Listing />} />
                  <Route path=":propertyId" element={<Property />} />
                </Route>
                <Route path="/addproperty" element={<AddProperty />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/favorites" element={<Favorites />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer /> {/* Global toast notification container */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </UserDetailContext.Provider>
  );
}
