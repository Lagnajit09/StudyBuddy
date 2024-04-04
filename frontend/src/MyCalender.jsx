import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from the backend when the component mounts
    fetchEvents();
  }, []);

  const convertDate = (x) => {
    const date = x ;

    let arr = date.split(":");

    let newDate = `${arr[0]}T${arr[1]}:${arr[2]}:${arr[3]}`;

    arr = newDate.split("-");
    const third = arr[2].split("T");
    newDate = `${arr[0]}-${+arr[1] < 10 ? "0" + arr[1] : arr[1]}-${
      +third[0] < 10 ? "0" + third[0] : third[0]
    }T${third[1]}`;

    console.log(newDate);
    newDate = new Date(newDate);
    console.log(newDate);
    return newDate;
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/events");
      const data = await response.json();
      const newData = data.map((item) => {

        return {
          title: item.title,
          description: item.description,
          end:convertDate(item.end),
          start:convertDate(item.start)
        };
      });
      console.log(newData);
      setEvents(newData);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
    console.log(start);
    setShowForm(true);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Create a new Date object from the given string.
    // const date = new Date(
    //   "Sat Apr 06 2024 00:00:00 GMT+0530 (India Standard Time)"
    // );

    // Get the year, month, and day of the date.
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    const day = selectedDate.getDate();

    // Format the date as "yyyy-mm-dd".
    const formattedDate = `${year}-${month}-${day}`;

    const formData = new FormData(event.target);
    const title = formData.get("title");
    const description = formData.get("description");
    const time = formData.get("time");
    const date = `${formattedDate}:${time}:00`;
    const userId = "user_id"; // You can get the user ID from your authentication system

    console.log(date);

    const eventDetails = {
      title,
      description,
      date,
    };
    console.log(date);
    console.log(time);
    console.log(eventDetails.date);
    try {
      const response = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventDetails),
      });

      if (!response.ok) {
        throw new Error("Failed to add event");
      }

      // Event added successfully
      setShowForm(false);
      // Refresh the calendar by refetching events
      fetchEvents();
    } catch (error) {
      console.error("Error adding event:", error.message);
      // Handle error (e.g., display error message to the user)
    }
  };

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
    <div style={{ height: 500 }}>
      {showForm && (
        <div className="event-form">
          <h3>Add New Event</h3>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label>Title:</label>
              <input type="text" name="title" />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <input type="text" name="description" />
            </div>
            <div className="form-group">
              <label>Date:</label>
              <input
                type="text"
                name="date"
                value={moment(selectedDate).format("YYYY-MM-DD")}
                disabled
              />
            </div>
            <div className="form-group">
              <label>Time:</label>
              <input type="time" name="time" />
            </div>
            <button type="submit">Add Event</button>
          </form>
        </div>
      )}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={handleSelectSlot}
        selectable
        eventPropGetter={eventStyleGetter}
        style={{ margin: "50px" }}
      />
    </div>
  );
};

export default MyCalendar;

// import React, { useState } from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';

// const localizer = momentLocalizer(moment);

// const MyCalendar = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(null);

//   const handleSelectSlot = ({ start }) => {
//     setSelectedDate(start);
//     setShowForm(true);
//   };

//   const handleFormSubmit = async event => {
//     event.preventDefault();

//     const formData = new FormData(event.target);
//     const title = formData.get('title');
//     const description = formData.get('description');
//     const date = formData.get('date');
//     const time = formData.get('time');
//     const userId = 'user_id'; // You can get the user ID from your authentication system

//     const eventDetails = {
//       title,
//       description,
//       date: new Date(date + 'T' + time), // Combine date and time
//       userId
//     };

//     try {
//       const response = await fetch('http://localhost:5000/api/events', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(eventDetails)
//       });

//       if (!response.ok) {
//         throw new Error('Failed to add event');
//       }

//       // Event added successfully
//       setShowForm(false);

//       // Refresh the calendar or update events state if needed
//       // You may need to implement a function to fetch and update events from the backend
//     } catch (error) {
//       console.error('Error adding event:', error.message);
//       // Handle error (e.g., display error message to the user)
//     }
//   };

//   return (
//     <div style={{ height: 500 }}>

//       {showForm && (
//         <div className="event-form">
//           <h3>Add New Event</h3>
//           <form onSubmit={handleFormSubmit}>
//             <div className="form-group">
//               <label>Title:</label>
//               <input type="text" name='title' />
//             </div>
//             <div className="form-group">
//               <label>Description</label>
//               <input type="text" name='description' />
//             </div>
//             <div className="form-group">
//               <label>Date:</label>
//               <input type="text" name='date' value={moment(selectedDate).format('YYYY-MM-DD')} disabled />
//             </div>
//             <div className="form-group">
//               <label>Time:</label>
//               <input type="time" name='time'/>
//             </div>
//             <button type="submit">Add Event</button>
//           </form>
//         </div>
//       )}
//       <Calendar
//         localizer={localizer}
//         onSelectSlot={handleSelectSlot}
//         selectable
//         style={{ margin: '50px' }}
//       />
//     </div>
//   );
// };

// export default MyCalendar;

// import React, { useState, useEffect } from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';

// const localizer = momentLocalizer(moment);

// const MyCalendar = ({ events }) => {
//   const [formattedEvents, setFormattedEvents] = useState([]);

//   useEffect(() => {
//     const formatted = events.map(event => ({
//       ...event,
//       start: new Date(event.start),
//       end: new Date(event.end)
//     }));
//     setFormattedEvents(formatted);
//   }, [events]);

//   return (
//     <div style={{ height: 500 }}>
//       <Calendar
//         localizer={localizer}
//         events={formattedEvents}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ margin: '50px' }}
//       />
//     </div>
//   );
// };

// export default MyCalendar;
