import React from "react";
import EventCard from "./components/EventCard";

const DateCal = ({ items, printTime, key, day }) => {
  const [freeTime, setFreeTime] = React.useState({});
  let start = 1100;
  let end = 1100;
  let i = 0;
  items.forEach((item) => {
    const st =
      new Date(item.start.dateTime).getHours() * 100 +
      new Date(item.start.dateTime).getMinutes();
    const et =
      new Date(item.end.dateTime).getHours() * 100 +
      new Date(item.end.dateTime).getMinutes();
    if (end < st) {
      freeTime[i] = { start: start, end: st, duration: st - start };
      i++;
    }
    if (end < et) {
      end = et;
      start = et;
    }
  });
  if (end < 1900) {
    freeTime[i] = { start: end, end: 1900, duration: 1900 - end };
    end = 1900;
    i++;
  }
  return (
    <>
      <div className="DateHeader">
        {new Date(
          new Date().setDate(new Date().getDate() + day)
        ).toDateString()}
      </div>
      <div className="Day" key={key}>
        {items.map((item, key2) => {
          return (
            <EventCard
              key={key2}
              summary={item.summary}
              startTime={printTime(new Date(item.start.dateTime))}
              endTime={printTime(new Date(item.end.dateTime))}
            />
          );
        })}
      </div>
      <div className="Timeline">
        <div>11AM</div>
        <div>12PM</div>
        <div>01PM</div>
        <div>02PM</div>
        <div>03PM</div>
        <div>04PM</div>
        <div>05PM</div>
        <div>06PM</div>
      </div>
      <div className="FreeTime">
        <div>
          <span>Free Time:(In order of recommendation)</span>
        </div>
        {Object.values(freeTime)
          .sort((a, b) => {
            if (a.start == 1100 || a.end == 1900) return 1;
            if (b.start == 1100 || b.end == 1900) return -1;
            return a.duration - b.duration;
          })
          .map((time, key) => {
            return (
              <div className="FreeTimeCard" key={key}>
                <h4>{`${time.start}hrs - `}</h4>
                <h4>{`${time.end}hrs `}</h4>
              </div>
            );
          })}
      </div>
      <hr />
    </>
  );
};

export default DateCal;
