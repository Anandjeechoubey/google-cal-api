import "./App.css";
import React, { useState } from "react";

import ApiCalendar from "react-google-calendar-api";
import Login from "./Login";
// import EventCard from "./components/EventCard";
import DateCal from "./DateCal";

const printDate = (date) => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};
const printTime = (date) => {
  return `${date.getHours()}:${
    date.getMinutes() != "0" ? date.getMinutes() : "00"
  }`;
};

function App() {
  const [auth, setAuth] = useState(false);
  const [startTime, setStartTime] = useState(11);
  const [endTime, setEndTime] = useState(19);
  const [daywiseEvents, setDaywiseEvents] = useState({});

  const today = new Date();
  today.setHours(9);
  const nextDate = new Date();
  nextDate.setDate(today.getDate() + 14);

  const handleItemClick = (event, asc) => {
    if (asc === "sign-in") {
      ApiCalendar.handleAuthClick()
        .then(() => {
          console.log("sign in succesful!");
          setAuth(true);
        })
        .catch((e) => {
          console.error(`sign in failed ${e}`);
          setAuth(false);
        });
    } else if (asc === "sign-out") {
      ApiCalendar.handleSignoutClick();
      console.log("sign out succesful!");
      setAuth(false);
    }
  };
  const getEvents = () => {
    setDaywiseEvents({});
    ApiCalendar.listEvents({
      timeMin: today.toISOString(),
      timeMax: nextDate.toISOString(),
      showDeleted: false,
      singleEvents: true,
      orderBy: "startTime",
    }).then(({ result }) => {
      result = result.items.filter((item) => {
        return (
          new Date(item.start.dateTime).getHours() >= startTime &&
          new Date(item.start.dateTime).getHours() <= endTime
        );
      });
      for (let i = 0; i < 14; i++) {
        daywiseEvents[i] = [];
      }

      result.forEach((item) => {
        const day = new Date(item.start.dateTime);
        const i = Math.floor(Math.abs(day - today) / 1000 / 60 / 60 / 24);
        daywiseEvents[i] = [...(daywiseEvents[i] || []), item];
      });
      setDaywiseEvents({ ...daywiseEvents });
    });
  };
  if (!auth) {
    return <Login handleSignIn={(e) => handleItemClick(e, "sign-in")} />;
  }

  return (
    <div className="App">
      <div className="Navbar">
        <button onClick={(e) => handleItemClick(e, "sign-out")}>Logout</button>
        <button onClick={getEvents}>Get Events</button>
      </div>
      <div className="EventList">
        {Object.keys(daywiseEvents).map((day, key) => {
          if (day > 13) return null;
          return (
            <>
              <DateCal
                items={daywiseEvents[day]}
                day={day}
                key={key}
                printTime={printTime}
              />
            </>
          );
        })}
      </div>
    </div>
  );
}

export default App;
