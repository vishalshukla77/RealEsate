import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';

import Home from './pages/Home';
import Listing from './pages/Listing';
import AddProperty from './pages/AddProperty';
import Favorites from './pages/Favorites';
import Bookings from './pages/Bookings';
import Layout from './components/Layout';

import 'react-toastify/dist/ReactToastify.css'; // Corrected the import path of the CSS

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading data...</div>}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/listing" element={<Listing />} />
              <Route path="/addproperty" element={<AddProperty />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/favorites" element={<Favorites />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer /> {/* Ensures global toast container is placed correctly */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
