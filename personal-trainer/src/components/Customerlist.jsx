import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';


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



  const columns = [
    { headerName: "Last Name", field: "lastname", sortable: true, filter: true  },
    { headerName: "First Name", field: "firstname", sortable: true, filter: true  },
    { headerName: "Email", field: "email", sortable: true, filter: true  },
    { headerName: "Phone", field: "phone", sortable: true, filter: true  },
    { headerName: "Address", field: "streetaddress", sortable: true, filter: true  },
    { headerName: "Postcode", field: "postcode", sortable: true, filter: true  },
    { headerName: "City", field: "city", sortable: true, filter: true  },
    { headerName: "Action",
      cellRendererFramework: (props) => (
        <Button
          onClick={() => deleteCustomer(props.data.links[0].href)}
        >
          Delete
        </Button>
      ),
    },
  ];
  

  return (
    <div className="ag-theme-material" style={{ height: '800px', width: '1800px', margin:'auto' }}>
      <AgGridReact columnDefs={columns} rowData={customers} enableSorting={true}
      enableFilter={true} />
    </div>
  );
}
