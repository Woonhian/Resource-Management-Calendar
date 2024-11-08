import React from "react";

const LegendCheckbox = ({ label, checked, onChange, className }) => {
  return (
    <label className="legend-item">
      <input
        type="checkbox"
        className={`custom-checkbox ${className}`}
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  );
};

export default LegendCheckbox;
