import React from 'react'; // Import React
import { NavLink } from 'react-router-dom'; // NavLink for routing and highlighting active tab
import './Navbar.css'; // CSS specific to Navbar component

const Navbar = () => {
  return (
    // Flex container for horizontal navigation links
    <div className='navbar-container'>
      
      {/* NavLink automatically applies 'active' class to current route */}
      <NavLink to="/" className="nav-link">
        Home
      </NavLink>

      {/* Second link to go to /pastes route */}
      <NavLink to="/pastes" className="nav-link">
        Pastes
      </NavLink>
    </div>
  );
};

export default Navbar;
