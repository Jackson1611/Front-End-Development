import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import Addcustomer from './Addcustomer';
import Addtraining from './AddTraining';


export function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch('http://traineeapp.azurewebsites.net/api/customers')
      .then(res => res.json())
      .then(data => {
        setCustomers(data.content);
      })
      .catch(error => console.error(error));
  };


  function handleCellValueChanged(params) {
    const data = { ...params.data };
    const updatedData = { ...data, [params.colDef.field]: params.newValue };
  
    updateCustomer(updatedData)
      .then(() => {
        console.log("Customer data updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating customer data:", error);
      });
  }
  
  async function updateCustomer(customerData) {
    const response = await fetch(`${customerData.links[0].href}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerData),
    });
  
    if (!response.ok) {
      throw new Error(`Failed to update customer data: ${response.statusText}`);
    }
  }



  const deleteCustomer = (link) => {
    if (window.confirm('Are you sure?')) {
      fetch(link, { method: 'DELETE' })
        .then((response) => fetchData())
        .catch((err) => console.error(err));
      alert('Customer is deleted!');
    } else {
      alert('Nothing deleted.');
    }
  };

  const saveCustomer = (customer) => {
		fetch('http://traineeapp.azurewebsites.net/api/customers', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(customer),
		})
			.then((response) => fetchData())
			.catch((err) => console.error(err));
	};


  const saveTraining = (training) => {
    fetch('http://traineeapp.azurewebsites.net/api/trainings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(training),
    })
    .then((response) => fetchData())
    .catch((err) => console.error(err));
  };
  

  const columns = [
    { headerName: "Last Name", field: "lastname", sortable: true, filter: true, editable: true, onCellValueChanged: handleCellValueChanged },
    { headerName: "First Name", field: "firstname", sortable: true, filter: true, editable: true, onCellValueChanged: handleCellValueChanged },
    { headerName: "Email", field: "email", sortable: true, filter: true, editable: true, onCellValueChanged: handleCellValueChanged },
    { headerName: "Phone", field: "phone", sortable: true, filter: true, editable: true, onCellValueChanged: handleCellValueChanged },
    { headerName: "Address", field: "streetaddress", sortable: true, filter: true, editable: true, onCellValueChanged: handleCellValueChanged },
    { headerName: "Postcode", field: "postcode", sortable: true, filter: true, editable: true, onCellValueChanged: handleCellValueChanged },
    { headerName: "City", field: "city", sortable: true, filter: true, editable: true, onCellValueChanged: handleCellValueChanged },
    { headerName: "Action",
      cellRendererFramework: (props) => (
        
        <Button onClick={() => deleteCustomer(props.data.links[0].href)}>
          Delete
        </Button>
        
        
      ),
    }, { headerName: "Add",
    cellRendererFramework: (props) => (
      <>
      <Addtraining saveTraining={saveTraining} />
      </>
    ),
  },
  ];

  

  return (
    <div className="ag-theme-material" style={{ height: '800px', width: '1800px', margin:'auto' }}>
      <Addcustomer saveCustomer={saveCustomer}/>
      <AgGridReact columnDefs={columns} rowData={customers} enableSorting={true}
      enableFilter={true} />
    </div>
  );
}
