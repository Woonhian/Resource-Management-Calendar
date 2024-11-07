import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import EventDetailsModal from "./EventDetailsModal";

const MonthlyCalendar = ({ events, selectedFilters, selectedDate }) => {
  const [selectedEvent, setSelectedEvent] = useState(null); // State for the selected event
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

  // Reference to FullCalendar instance
  const calendarRef = useRef(null);

  // Handle event clicked on the calendar
  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event); // Store the selected event details
    setIsModalOpen(true); // Open the modal
  };

  // Filter events based on selected room types, statuses and brands
  const filteredEvents = events.filter((event) => {
    const status = event.extendedProps.status;
    const roomType = event.extendedProps.type;
    const code = event.title;

    // Filter by room type
    const roomTypeMatch =
      (roomType === "CONFERENCE ROOM" && selectedFilters.conference) ||
      (roomType === "MEETING ROOM" && selectedFilters.meeting) ||
      (roomType === "DISCUSSION ROOM" && selectedFilters.discussion);
    // Filter by status
    const statusMatch =
      (status === "CANCELLED" && selectedFilters.cancelled) ||
      (status === "CONFIRMED" && selectedFilters.confirmed);

    // Filter by code(brand)
    const codeMatch =
      (code.includes("ITCD") && selectedFilters.itcd) ||
      (code.includes("COLAB") && selectedFilters.colab);

    return roomTypeMatch && statusMatch && codeMatch;
  });

  // Navigate to selectedDate whenever it changes
  useEffect(() => {
    if (calendarRef.current && selectedDate) {
      // Delay the navigation to avoid conflicts with React rendering
      setTimeout(() => {
        calendarRef.current.getApi().gotoDate(selectedDate);
      }, 0);
    }
  }, [selectedDate]); // Runs when selectedDate changes

  return (
    <>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        events={filteredEvents}
        eventClick={handleEventClick} // Handles event click to open event modal
        displayEventTime={true}
        displayEventEnd={true}
        eventTimeFormat={{
          hour: "numeric",
          minute: "2-digit",
          meridiem: "short",
        }}
        dayMaxEventRows={3} // Show a maximum of 3 events per day
        moreLinkText="more" // Text for the "more" link
        moreLinkClick="popover" // Show remaining events in a popover when "more" is clicked
        moreLinkContent={(arg) => (
          <span style={{ color: "blue", cursor: "pointer" }}>
            + {arg.num} more
          </span>
        )}
        eventOverlap={false} // Prevent events from overlapping
        slotEventOverlap={false} // Additional control over slot event overlapping
        aspectRatio={1.5} // Adjust this value for responsive width-to-height ratio
        height="auto" // Make calendar height auto-adjustable
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        views={{
          dayGridMonth: { buttonText: "Month" },
          timeGridWeek: { buttonText: "Week", slotDuration: "00:15:00" },
          timeGridDay: { buttonText: "Day", slotDuration: "00:15:00" },
          listWeek: { buttonText: "List" },
        }}
        buttonText={{ today: "Today" }}
        eventContent={(eventInfo) => {
          // Determine the color based on status
          let statusColor;
          switch (eventInfo.event.extendedProps.status) {
            case "CONFIRMED":
              statusColor = "#2e7d32";
              break;
            case "CANCELLED":
              statusColor = "#c62828";
              break;
            default:
              statusColor = "#555"; // Default color for unknown status
          }

          return (
            <div style={{ whiteSpace: "normal", lineHeight: "1.2" }}>
              {/* Display time on the first line */}
              <div
                className="fc-event-time"
                style={{ fontSize: "0.9em", fontWeight: "bold" }}
              >
                {eventInfo.timeText}
              </div>
              {/* Display title on the second line */}
              <div className="fc-event-title" style={{ fontSize: "1em" }}>
                {eventInfo.event.title}
              </div>
              {/* Display the event status on the third line */}
              <div
                className="fc-event-status"
                style={{
                  fontSize: "0.85em",
                  color: statusColor,
                  opacity: 0.9,
                  fontWeight: "500",
                  marginTop: "4px",
                }}
              >
                {eventInfo.event.extendedProps.status}
              </div>
            </div>
          );
        }}
      />
      {/* Render the modal if an event is selected */}
      {isModalOpen && selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setIsModalOpen(false)} // Close the modal
        />
      )}
    </>
  );
};

export default MonthlyCalendar;
