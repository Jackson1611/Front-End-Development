import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';




export default function Carlist() {
	const [cars, setCars] = useState([]);

	useEffect(() => fetchData(), []);

	const fetchData = () => {
		fetch('http://carrestapi.herokuapp.com/cars')
			.then(response => response.json())
			.then(data => setCars(data._embedded.cars));
	};

    const columns = [  
        { headerName: "Brand",field: "brand" },  
        { headerName: "Model",field: "model" },  
        { headerName: "Color",field: "color" },
        { headerName: "Fuel",field: "fuel" },  
        { headerName: "Year",field: "year" },  
        { headerName: "Price",field: "price" },
		
  ];

  return (
    <div className="ag-theme-material" style={{height: '1200px', width: '1250px'}}>
        <AgGridReact columnDefs={columns} rowData={cars}></AgGridReact>
    </div>
  );
}


