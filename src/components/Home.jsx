import React, { useEffect, useState } from "react"; // React and Hooks
import { useDispatch, useSelector } from "react-redux"; // Redux Hooks
import { useSearchParams } from "react-router-dom"; // To get query params (like pasteId)

import { addToPastes, updateToPastes } from "../redux/pasteSlice"; // Redux actions
import './Home.css'; // Component-specific styles

const Home = () => {
  // Local state to store input values
  const [title, setTitle] = useState(""); // For title input
  const [value, setValue] = useState(""); // For content textarea
  const [createdAt, setCreatedAt] = useState(null); // For storing date when paste is created

  const [searchParams, setSearchParams] = useSearchParams(); // Hook to work with URL search params
  const pasteId = searchParams.get("pasteId"); // Extract pasteId from the query string (/?pasteId=xyz)

  const dispatch = useDispatch(); // To send actions to Redux store
  const allPastes = useSelector((state) => state.paste.pastes); // Read all pastes from the store

  // useEffect to populate inputs if we're editing an existing paste
  useEffect(() => {
    if (pasteId && allPastes.length > 0) {
      const paste = allPastes.find((p) => p._id === pasteId); // find the paste matching the ID
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
        setCreatedAt(paste.createdAt); // Set existing createdAt if editing
      } else {
        // If no paste found, clear fields
        console.warn("Paste not found for ID:", pasteId);
        setTitle("");
        setValue("");
        setCreatedAt(null);
      }
    }
  }, [pasteId, allPastes]);

  // Function to handle paste creation or update
  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36), // if new, generate ID
      createdAt: createdAt || new Date().toISOString() // reuse or generate new timestamp
    };

    // If editing, update. Otherwise, add new.
    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    // Reset fields and URL
    setTitle("");
    setValue("");
    setCreatedAt(null);
    setSearchParams({});
  }

  return (
    <div className="home-wrapper">
      <div >
        <p className="app-name">PASTE APP</p>
      </div>

      {/* Title Input */}
      <input
        autoFocus
        className="home-input"
        type="text"
        placeholder="Enter title here"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Show date only if editing */}
      {createdAt && (
        <div className="home-date">
          <span role="img" aria-label="calendar">📅</span>
          {new Date(createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={createPaste}
        className="home-button"
      >
        {pasteId ? "Update My Paste" : "Create My Paste"}
      </button>

      {/* Content Textarea */}
      <div>
        <textarea
          className="home-textarea"
          value={value}
          placeholder="Enter content here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default Home;
