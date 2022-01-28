import React from "react";
import "./EventCard.css";

const EventCard = ({ summary, startTime, endTime }) => {
  const h1 = parseInt(startTime.split(":")[0]);
  const m1 = parseInt(startTime.split(":")[1]);
  const h2 = parseInt(endTime.split(":")[0]);
  const m2 = parseInt(endTime.split(":")[1]);

  const width = ((h2 - h1) * 60 + (m2 - m1)) / 60;
  return (
    <div
      className="Card"
      style={{
        width: `${width * 12.5}%`,
      }}
    >
      <h4>{summary}</h4>
      <p>
        {startTime} - {endTime}
      </p>
    </div>
  );
};

export default EventCard;
