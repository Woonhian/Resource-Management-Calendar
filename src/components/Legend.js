// Legend.js
import React from "react";
import "../styles/Legend.css";

const Legend = ({ selectedFilters, onToggle }) => {
  const handleToggle = (filterType) => {
    const updatedSelection = {
      ...selectedFilters,
      [filterType]: !selectedFilters[filterType],
    };
    onToggle(updatedSelection); // Pass updated selection to update the calendar events
  };

  return (
    <div className="legend">
      <h3>Room Type</h3>
      <label className="legend-item">
        <input
          type="checkbox"
          className="custom-checkbox conference-room"
          checked={selectedFilters.conference}
          onChange={() => handleToggle("conference")}
        />
        Conference Room
      </label>
      <label className="legend-item">
        <input
          type="checkbox"
          className="custom-checkbox meeting-room"
          checked={selectedFilters.meeting}
          onChange={() => handleToggle("meeting")}
        />
        Meeting Room
      </label>
      <label className="legend-item">
        <input
          type="checkbox"
          className="custom-checkbox discussion-room"
          checked={selectedFilters.discussion}
          onChange={() => handleToggle("discussion")}
        />
        Discussion Room
      </label>

      <h3>Status</h3>
      <label className="legend-item">
        <input
          type="checkbox"
          className="custom-checkbox custom-checkbox-confirmed"
          checked={selectedFilters.confirmed}
          onChange={() => handleToggle("confirmed")}
        />
        Confirmed
      </label>
      <label className="legend-item">
        <input
          type="checkbox"
          className="custom-checkbox custom-checkbox-cancelled"
          checked={selectedFilters.cancelled}
          onChange={() => handleToggle("cancelled")}
        />
        Cancelled
      </label>

      <h3>Brand</h3>
      <label className="legend-item">
        <input
          type="checkbox"
          className="custom-checkbox custom-checkbox-itcd"
          checked={selectedFilters.itcd}
          onChange={() => handleToggle("itcd")}
        />
        ITCD
      </label>
      <label className="legend-item">
        <input
          type="checkbox"
          className="custom-checkbox custom-checkbox-colab"
          checked={selectedFilters.colab}
          onChange={() => handleToggle("colab")}
        />
        CoLab
      </label>
    </div>
  );
};

export default Legend;
