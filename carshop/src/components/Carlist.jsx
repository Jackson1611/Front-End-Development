import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import Addcar from './Addcar';
import Editcar from './Editcar';



export default function Carlist() {
	const [cars, setCars] = useState([]);

	useEffect(() => fetchData(), []);

	const fetchData = () => { 
		fetch('http://carrestapi.herokuapp.com/cars')
			.then(response => response.json())
			.then(data => setCars(data._embedded.cars));
	};


    const deleteCar = (link) => {	
        if (window.confirm('Are you sure?')) {	
			fetch(link, { method: 'DELETE' })
				.then((response) => fetchData())
				.catch((err) => console.error(err));
			alert('Car deleted!');
		} else {
			alert('Nothing deleted.');
		}
	};

    const updateCar = (car, link) => {
		fetch(link, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(car),
		})
			.then((response) => fetchData())
			.catch((err) => console.error(err));
	};

    const saveCar = (car) => {
		fetch('http://carrestapi.herokuapp.com/cars', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(car),
		})
			.then((response) => fetchData())
			.catch((err) => console.error(err));
	};

    const columns = [  
        { headerName: "Brand",field: "brand", sortable: true,  suppressMenu: true, },  
        { headerName: "Model",field: "model", sortable: true,  suppressMenu: true, },  
        { headerName: "Color",field: "color", sortable: true,  suppressMenu: true, },
        { headerName: "Fuel",field: "fuel", sortable: true,  suppressMenu: true, },  
        { headerName: "Year",field: "year", sortable: true,  suppressMenu: true, },  
        { headerName: "Price",field: "price", sortable: true,  suppressMenu: true, },
        { headerName: "action" ,field: "_links.self.href",
        cellRenderer: ({ value }) => (
            <Button size="large" onClick={() => deleteCar(value)}>Delete</Button>
            ), },
        { headerName: "action", field: "_links.self.href",
            cellRenderer: row  => (
                <Editcar updateCar={updateCar} car={row.original} />
            ),
        }
            
  ];

  return (
    <div className="ag-theme-material" style={{height: '1200px', width: '1450px'}}>
        <Addcar saveCar={saveCar}/>
        <AgGridReact 
        columnDefs={columns} 
        rowData={cars}  
        enableSorting={false}
        enableFilter={true}></AgGridReact>
    </div>
  );
}


