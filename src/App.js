import React, { useState, useEffect } from "react";
import "./styles/App.css";
import { parseCSV } from "./utils/csvParser";
import MonthlyCalendar from "./components/MonthlyCalendar";
import Legend from "./components/Legend";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  // State to store bookings datas parsed from CSV file
  const [events, setEvents] = useState([]);

  // State for selected filters (room types, statuses and brands)
  const [selectedFilters, setSelectedFilters] = useState({
    conference: true,
    meeting: true,
    discussion: true,
    cancelled: true,
    confirmed: true,
    itcd: true,
    colab: true,
  });

  // State for selected date
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [isSidebarVisible, setSidebarVisible] = useState(false);

  // Handle room type, status and brand toggle from Legend
  const handleFilterToggle = (updatedSelection) => {
    setSelectedFilters(updatedSelection);
  };

  // Handle selected date from date picker
  const handleDateChange = (date) => {
    setSelectedDate(date); // Update the selected date
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  // Load CSV data from files
  const loadCSVData = async () => {
    const filePaths = [`colab.csv`, `xcolab.csv`, `itcd.csv`, `xitcd.csv`];

    // Combine and store parsed CSV data to allData
    const allData = [];
    for (const path of filePaths) {
      const data = await parseCSV(path);
      allData.push(...data);
    }

    const formattedEvents = allData.map((row) => {
      // Assign color for each type of room
      let bookingTypeColor;
      switch (row.type) {
        case "CONFERENCE ROOM":
          bookingTypeColor = "#34A853";
          break;
        case "MEETING ROOM":
          bookingTypeColor = "#FBBC05";
          break;
        case "DISCUSSION ROOM":
          bookingTypeColor = "#4285F4";
          break;
        default:
          bookingTypeColor = "#9E9E9E";
      }
      return {
        title: `${row.code}`,
        start: `${row.date}T${row.start_time}`,
        end: `${row.date}T${row.end_time}`,
        display: "block",
        backgroundColor: bookingTypeColor,
        borderColor: bookingTypeColor,
        extendedProps: {
          status: row.status,
          name: row.name,
          type: row.type,
        },
      };
    });

    // Update the state for events with the formatted data
    setEvents(formattedEvents);
  };

  // Load event data from the CSV file
  useEffect(() => {
    loadCSVData();
  }, []);

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-content">
          <button className="hamburger-icon" onClick={toggleSidebar}>
            <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-miterlimit="10"
                stroke-width="2"
                d="M4 7h22M4 15h22M4 23h22"
              ></path>
            </svg>
          </button>
          <h1 className="calendar-title">Resource Management Calendar</h1>
        </div>
      </nav>

      <div className="calendar-container">
        {isSidebarVisible && (
          <div className="sidebar-overlay" onClick={closeSidebar}></div>
        )}

        <div className={`sidebar ${isSidebarVisible ? "show" : ""}`}>
          <div>
            <h3>Select Date</h3>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange} // Function to updated selected date
              showMonthYearPicker // Enables month and year selection only
              dateFormat="MMMM yyyy" // Display format for month and year
            />
          </div>
          {/* Pass the selected filters and toggle handler to Legend */}
          <Legend
            selectedFilters={selectedFilters}
            onToggle={handleFilterToggle}
          />
        </div>

        <MonthlyCalendar
          events={events}
          selectedFilters={selectedFilters}
          selectedDate={selectedDate}
        />
      </div>
    </div>
  );
}

export default App;
