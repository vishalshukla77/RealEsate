import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Listing from './pages/Listing';
import AddProperty from './pages/Addproperty';
import Favorites from './pages/Favorites'
import Bookings from './pages/Bookings'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/addproperty" element={<AddProperty />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}
