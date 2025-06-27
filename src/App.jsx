// Importing React and useState hook (though useState is not used here directly)
import React, { useState } from 'react';

// Importing global CSS (if you have global styles in App.css)
import './App.css';

// Importing required modules from react-router-dom for routing
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Importing the components used in different routes
import ViewPaste from './components/ViewPaste';
import Paste from './components/Paste';
import Home from './components/Home';
import Navbar from './components/Navbar';

// Creating a router configuration using createBrowserRouter
// This defines what component should render at which URL path
const router = createBrowserRouter([
  {
    path: "/", // This is the root URL
    element: (
      <div>
        {/* Navbar will show on all pages */}
        <Navbar />
        {/* Home component for the main page */}
        <Home />
      </div>
    )
  },
  {
    path: "/pastes", // URL for showing the list of all pastes
    element: (
      <div>
        <Navbar />
        <Paste />
      </div>
    )
  },
  {
    path: "/pastes/:id", // Dynamic route for viewing a single paste by ID
    element: (
      <div>
        <Navbar />
        <ViewPaste />
      </div>
    )
  }
]);

// Main App component - root of the application
function App() {
  return (
    <div>
      {/* RouterProvider connects the app with the router configuration above */}
      <RouterProvider router={router} />
    </div>
  );
}

// Exporting App component so it can be rendered in index.js
export default App;
