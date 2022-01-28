import "./App.css";
import React, { useState } from "react";

import ApiCalendar from "react-google-calendar-api";
import Login from "./Login";
import EventCard from "./components/EventCard";

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
  const [events, setEvents] = useState([]);
  const [startTime, setStartTime] = useState(11);
  const [endTime, setEndTime] = useState(19);
  const today = new Date();
  const nextDate = new Date();
  const daywiseEvents = new Array(14).fill([]);
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
      // for (let i = 0; i < 14; i++) {
      //   let day = today;
      //   day = new Date(day.setDate(today.getDate() + i));
      //   daywiseEvents[i] = result.filter((item) => {
      //     console.log(
      //       "filtering: ",
      //       new Date(item.start.dateTime).getDate(),
      //       day.getDate()
      //     );
      //     return new Date(item.start.dateTime).getDate() === day.getDate();
      //   });
      // }
      // result.forEach((item, index) => {
      //   const day = new Date(item.start.dateTime);
      //   const i = Math.floor(Math.abs(day - today) / 1000 / 60 / 60 / 24);
      //   console.log("checking", i, item);
      //   daywiseEvents[i].push(index);
      //   console.log(i, daywiseEvents[i]);
      // });
      // console.log(daywiseEvents);
      setEvents(result);
      // setEvents(result.items);
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
        {events.map((event, index) => (
          <React.Fragment key={index}>
            {index > 0
              ? new Date(event.start.dateTime).getDate() !==
                  new Date(events[index - 1].start.dateTime).getDate() && (
                  <>
                    <p>
                      {printDate(new Date(events[index - 1].start.dateTime))}
                    </p>
                    <hr />
                  </>
                )
              : null}
            {/* <li>
              {event.summary}: {printTime(new Date(event.start.dateTime))} -{" "}
              {printTime(new Date(event.end.dateTime))}
            </li> */}
            <EventCard
              summary={event.summary}
              startTime={printTime(new Date(event.start.dateTime))}
              endTime={printTime(new Date(event.end.dateTime))}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default App;
