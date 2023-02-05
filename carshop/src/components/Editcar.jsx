import React from "react";
import { useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export default function Editcar(props){

    const [open, setOpen] = React.useState(false);
    const [car, setCar] = useState({brand: '', model: '', color: '', fuel: '', year: '', price: ''});

    const handleClickOpen = () => {
		setCar({
			brand: props.brand ,
			model: props.model,
			color: props.color,
			fuel: props.fuel,
			year: props.year, 
			price:props.price
		})
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e) => {
        setCar({ ...car, [e.target.name]: e.target.value });
    };

    const updateCar = () => {
		props.updateCar(car, props.car._links.car.href);
		handleClose();
	};

return (
    <div>
    <Button  onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit car</DialogTitle>
            <DialogContent>
                    <TextField
						autoFocus
						margin='dense'
						name='brand'
						value={car.brand}
						onChange={(event) => handleInputChange(event)}
						label='Brand'
						fullWidth
						variant='standard'
					/>
					<TextField
						margin='dense'
						name='model'
						value={car.model}
						onChange={(event) => handleInputChange(event)}
						label='Model'
						fullWidth
						variant='standard'
					/>
					<TextField
						margin='dense'
						name='color'
						value={car.color}
						onChange={(event) => handleInputChange(event)}
						label='Color'
						fullWidth
						variant='standard'
					/>
					<TextField
						margin='dense'
						name='fuel'
						value={car.fuel}
						onChange={(event) => handleInputChange(event)}
						label='Fuel'
						fullWidth
						variant='standard'
					/>
					<TextField
						margin='dense'
						name='year'
						value={car.year}
						onChange={(event) => handleInputChange(event)}
						label='Year'
						fullWidth
						variant='standard'
					/>
					<TextField
						margin='dense'
						name='price'
						value={car.price}
						onChange={(event) => handleInputChange(event)}
						label='Price'
						fullWidth
						variant='standard'
					/>
            </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateCar}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
);
}