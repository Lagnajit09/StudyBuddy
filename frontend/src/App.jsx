// App.js

import React, { useState, useEffect } from 'react';
import MyCalendar from './MyCalender';

const App = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from backend
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  return (
    <div>
      <h1>My Calendar</h1>
      <MyCalendar events={events} />
    </div>
  );
};

export default App;
