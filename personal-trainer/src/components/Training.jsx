import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';





export function Traininglist() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
    fetch("http://traineeapp.azurewebsites.net/api/trainings")
        .then(res => res.json())
        .then(data => {
        Promise.all(
            data.content.map((training) =>
            fetch(training.links.find(link => link.rel === "customer").href)
                .then(res => res.json())
                .then(customerData => ({
                activity: training.activity,
                duration: training.duration,
                date: dayjs(training.date).format("DD-MM-YYYY HH.mm a"),
                time: dayjs(training.date).format("HH.mm"),
                customerName: `${customerData.firstname} ${customerData.lastname}`

                }))
            )
        )
            .then(formattedTrainings => setTrainings(formattedTrainings))
            .catch(error => console.error(error));
        });
    }, []);

   
    const columns = [
       
        { headerName: "Activity", field: "activity", sortable: true, filter: true  },
        { headerName: "Date", field: "date", sortable: true, filter: true  },
        { headerName: "Duration (minutes)", field: "duration", sortable: true, filter: true  },
        { headerName: "Customer Name", field: "customerName", sortable: true, filter: true  },

      ];
      
  
    
  
    return (
      <div className="ag-theme-material" style={{ height: '800px', width: '1400px', margin:'auto' }}>
        <AgGridReact columnDefs={columns} rowData={trainings} enableSorting={true}
        enableFilter={true} />
      </div>
    );
  }
  

