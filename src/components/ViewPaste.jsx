import React, { useRef } from "react"; // Import React and useRef hook
import { useParams } from "react-router-dom"; // Hook to read URL params like /pastes/:id
import { useSelector } from "react-redux"; // To get data from Redux store
import toast from "react-hot-toast"; // To show "Copied!" message
import './ViewPaste.css'; // Custom CSS

const ViewPaste = () => {
  // Get `id` param from the URL (example: /pastes/abc123)
  const { id } = useParams();

  // Get all pastes from Redux store
  const allPastes = useSelector((state) => state.paste.pastes);

  // Find the paste matching the ID from URL
  const paste = allPastes.find((p) => p._id === id);

  // Create a reference to the textarea for future access (optional here)
  const textAreaRef = useRef(null);

  // If no paste found with that ID, show an error message
  if (!paste) {
    return (
      <div className="view-error">
        ❌ Paste not found for ID: <code>{id}</code>
      </div>
    );
  }

  // Function to copy the paste content to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(paste.content); // Copy content
    toast.success("Content copied to clipboard!"); // Show success message
  };

  return (
    <div className="view-wrapper">
      {/* Display title in a disabled input */}
      <div className="view-header">
        <input
          autoFocus
          className="view-input"
          type="text"
          placeholder="Enter title here"
          value={paste.title}
          disabled // Read-only
        />
      </div>

      {/* Textarea with the actual paste content */}
      <div className="view-textarea-wrapper">
        <textarea
          ref={textAreaRef} // Optional: can be used if needed later
          className="view-textarea"
          value={paste.content}
          placeholder="Enter content here"
          disabled // Read-only
          rows={20}
        />
        
        {/* Copy Button inside textarea wrapper */}
        <button className="copy-btn" onClick={handleCopy}>
          📋
        </button>
      </div>
    </div>
  );
};

export default ViewPaste;
