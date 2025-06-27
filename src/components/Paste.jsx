import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Redux hooks
import { removeFromPastes } from "../redux/pasteSlice"; // Action to delete paste
import { useNavigate } from "react-router-dom"; // Navigation
import toast from "react-hot-toast"; // For showing notification messages
import './Paste.css'; // Custom component CSS

const Paste = () => {
  // Access the list of all pastes from Redux store
  const pastes = useSelector((state) => state.paste.pastes);

  // Local state to store the search input text
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch(); // To dispatch actions to Redux store
  const navigate = useNavigate(); // To navigate to different routes programmatically

  // Filter pastes based on title using the searchTerm input
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Delete paste from store using Redux action
  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  // Generate shareable URL and copy to clipboard
  function handleShare(pasteId) {
    const shareUrl = `${window.location.origin}/pastes/${pasteId}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard");
  }

  return (
    <div>
      {/* Search bar for filtering pastes */}
      <input
        className="paste-search"
        type="search"
        placeholder="Search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div>
        {/* Loop through filtered pastes and display them */}
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div className="paste-card" key={paste?._id}>
              {/* Paste title */}
              <div className="paste-title">{paste.title}</div>

              {/* Paste content */}
              <div className="paste-content">{paste.content}</div>

              {/* Paste created date */}
              <div className="paste-date">
                <span role="img" aria-label="calendar">📅</span>
                {new Date(paste.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>

              {/* Button group for actions */}
              <div className="paste-actions">
                {/* Edit Button */}
                <button
                  className="paste-btn edit"
                  onClick={() => navigate(`/?pasteId=${paste._id}`)}
                >
                  Edit
                </button>

                {/* View Button */}
                <button
                  className="paste-btn view"
                  onClick={() => navigate(`/pastes/${paste._id}`)}
                >
                  View
                </button>

                {/* Delete Button */}
                <button
                  className="paste-btn delete"
                  onClick={() => handleDelete(paste._id)}
                >
                  Delete
                </button>

                {/* Copy to clipboard Button */}
                <button
                  className="paste-btn copy"
                  onClick={() => {
                    navigator.clipboard.writeText(paste.content);
                    toast.success("Copied to clipboard");
                  }}
                >
                  Copy
                </button>

                {/* Share link Button */}
                <button
                  className="paste-btn share"
                  onClick={() => handleShare(paste._id)}
                >
                  Share
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", marginTop: "2rem" }}>
            No pastes found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Paste;
