import React, { useEffect, useState, useCallback } from "react";
import { getMyRequests } from "../../services/calendarRequest";
import "./TimeOff.css";
import TimeOffForm from "../../components/TimeOffForm/TimeOffForm";
import TimeOffTable from "../../components/TimeOffTable/TimeOffTable";
import { Grid } from "@mui/material";

const TimeOff = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEvents = useCallback(() => {
    getMyRequests()
      .then((response) => {
        setEvents(response.data);
        setIsLoading(false);
      })

      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);
  
  return (
    <div className="TimeOff">
      <h1>Time Off</h1>
      <h3>Make your Request</h3>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <TimeOffForm onSubmitSuccess={()=>fetchEvents()} />
        </Grid>
        <Grid item xs={12} md={8}>
          <h3>Time Off Records</h3>
          <TimeOffTable events={events} isLoading={isLoading} />
        </Grid>
      </Grid>
    </div>
  );
};

export default TimeOff;