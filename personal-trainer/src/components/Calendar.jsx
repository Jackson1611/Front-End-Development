import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);

export function CalendarComponent() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "http://traineeapp.azurewebsites.net/api/trainings"
        );
        const data = await res.json();

        const formattedTrainings = await Promise.all(
          data.content.map(async (training) => {
            const customerRes = await fetch(
              training.links.find((link) => link.rel === "customer").href
            );
            const customerData = await customerRes.json();

            return {
              title: `${training.activity} / ${customerData.firstname} ${customerData.lastname}`,
              start: moment(training.date).toDate(),
              end: moment(training.date).add(training.duration, "m").toDate(),
              customerName: `${customerData.firstname} ${customerData.lastname}`,
            };
          })
        );

        setTrainings(formattedTrainings);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={trainings}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        tooltipAccessor="customerName"
        style={{ color: "black", backgroundColor: "#f2f2f2" }}
        views={["month", "week", "day"]}
        defaultView="week"
      />
    </div>
  );
}
