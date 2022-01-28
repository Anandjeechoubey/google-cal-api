import React from "react";
import "./EventCard.css";

const EventCard = ({ summary, startTime, endTime }) => {
  return (
    <div className="Card">
      <h4>{summary}</h4>
      <p>
        {startTime} - {endTime}
      </p>
    </div>
  );
};

export default EventCard;
