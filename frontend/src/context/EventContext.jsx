import { createContext, useState } from "react";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Tech Fest 2026",
      date: "15 April 2026",
      price: 499,
      image: "https://images.unsplash.com/photo-1503428593586-e225b39bddfe",
    },
  ]);

  const addEvent = (event) => {
    setEvents([...events, { ...event, id: Date.now() }]);
  };

  const deleteEvent = (id) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  return (
    <EventContext.Provider value={{ events, addEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
};
