// Legend.js
import React from "react";
import "../styles/Legend.css";
import LegendCheckbox from "./LegendCheckbox";

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
      <LegendCheckbox
        label="Conference Room"
        checked={selectedFilters.conference}
        onChange={() => handleToggle("conference")}
        className="conference-room"
      />
      <LegendCheckbox
        label="Meeting Room"
        checked={selectedFilters.meeting}
        onChange={() => handleToggle("meeting")}
        className="meeting-room"
      />
      <LegendCheckbox
        label="Discussion Room"
        checked={selectedFilters.discussion}
        onChange={() => handleToggle("discussion")}
        className="discussion-room"
      />

      <h3>Status</h3>
      <LegendCheckbox
        label="Confirmed"
        checked={selectedFilters.confirmed}
        onChange={() => handleToggle("confirmed")}
        className="custom-checkbox-confirmed"
      />
      <LegendCheckbox
        label="Cancelled"
        checked={selectedFilters.cancelled}
        onChange={() => handleToggle("cancelled")}
        className="custom-checkbox-cancelled"
      />

      <h3>Brand</h3>
      <LegendCheckbox
        label="ITCD"
        checked={selectedFilters.itcd}
        onChange={() => handleToggle("itcd")}
        className="custom-checkbox-itcd"
      />
      <LegendCheckbox
        label="CoLab"
        checked={selectedFilters.colab}
        onChange={() => handleToggle("colab")}
        className="custom-checkbox-colab"
      />
    </div>
  );
};

export default Legend;
