import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import 'moment/locale/en-gb'; // Import English (United Kingdom) locale for moment
import "react-big-calendar/lib/css/react-big-calendar.css";
import Prev from "../../../../../assets/Icons/ProfileRightIcon/Prev.svg";
import Next from "../../../../../assets/Icons/ProfileRightIcon/Next.svg";
import './MyCalender.css';

moment.locale('en-gb', {
  week: {
    dow: 1 // Set Monday (1) as the first day of the week
  }
});

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  // Define custom toolbar buttons (only 'month' view)
  const toolbarButtons = {
    month: true,
    week: false, // Disable week view
    day: false, // Disable day view
    agenda: false, // Disable agenda view
  };

  const CustomToolbar = (toolbar) => {
    const goToBack = () => {
      toolbar.onNavigate("PREV");
    };

    const goToNext = () => {
      toolbar.onNavigate("NEXT");
    };

    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          <img src={Prev} onClick={goToBack} className="calender-btn" />
        </span>
        <span className="rbc-toolbar-label">{toolbar.label}</span>
        <span className="rbc-btn-group">
          <img src={Next} onClick={goToNext} className="calender-btn" />
        </span>
      </div>
    );
  };

  const formats = {    
    weekdayFormat: (date, culture, localizer) =>
      localizer.format(date, "dd").substring(0, 2), // Display only the first two characters of the weekday
  }

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "blue", // Default background color for events
      borderRadius: "0px", // Optional: Customize event border radius
      opacity: 0.8, // Optional: Customize event opacity
      color: "white", // Optional: Customize event text color
      border: "none", // Optional: Customize event border
    };

    return {
      style,
    };
  };

  return (
    <div style={{height:"100%", width:"100%"}}>
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        // onSelectSlot={handleSelectSlot}
        selectable
        eventPropGetter={eventStyleGetter}
        views={toolbarButtons}
        components={{
          toolbar: CustomToolbar,          
        }}
        formats={formats} // Use custom formats
        className="custom-calendar"
        weekStartsOn={1} // Set Monday (1) as the first day of the week
      />
    </div>
  );
};

export default MyCalendar;

