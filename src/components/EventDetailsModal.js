// EventDetailsModal.js
import React from "react";
import "../styles/EventDetailsModal.css";

const EventDetailsModal = ({ event, onClose }) => {
  const { title, start, end, extendedProps } = event;

  const handleOverlayClick = (e) => {
    // Close the modal if user clicks outside of the modal
    onClose();
  };

  const handleContentClick = (e) => {
    // Prevent closing when clicking inside the modal content
    e.stopPropagation();
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-SG", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={handleContentClick}>
        <h2>{title}</h2>
        <p>
          <strong>Status:</strong> {capitalizeFirstLetter(extendedProps.status)}
        </p>
        <p>
          <strong>Start:</strong> {formatDate(start)}
        </p>
        <p>
          <strong>End:</strong> {formatDate(end)}
        </p>
        <p>
          <strong>Room Name:</strong> {extendedProps.name}
        </p>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default EventDetailsModal;
