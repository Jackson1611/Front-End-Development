import React, { useState, useEffect } from "react";
import _ from "lodash";
import dayjs from "dayjs";

export function TrainingChart() {
  const [trainings, setTrainings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = () => {
    setIsLoading(true);
    setError(null);
    fetch("http://traineeapp.azurewebsites.net/api/trainings")
      .then((res) => res.json())
      .then((data) => {
        Promise.all(
          data.content.map((training) =>
            fetch(training.links.find((link) => link.rel === "customer").href)
              .then((res) => res.json())
              .then((customerData) => ({
                activity: training.activity,
                duration: training.duration,
                date: dayjs(training.date).format("DD-MM-YYYY HH.mm a"),
                time: dayjs(training.date).format("HH.mm"),
                customerName: `${customerData.firstname} ${customerData.lastname}`,
                link: training.links[0].href,
              }))
          )
        )
          .then((formattedTrainings) => {
            setTrainings(formattedTrainings);
            setIsLoading(false);
          })
          .catch((error) => {
            setError(error);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const groupTrainingsByActivity = () => {
    const groupedTrainings = _.groupBy(trainings, "activity");
    const summedDurations = _.mapValues(groupedTrainings, (group) =>
      _.sumBy(group, "duration")
    );
    return summedDurations;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {Object.entries(groupTrainingsByActivity()).map(
        ([activity, duration]) => (
          <div key={activity}>
            <p>
              {activity}: {duration} minutes
            </p>
          </div>
        )
      )}
    </div>
  );
}
