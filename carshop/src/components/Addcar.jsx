import React from "react";
import { useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function Addcar(props){

    const [open, setOpen] = React.useState(false);
    const [car, setCar] = useState({brand: '', model: '', color: '', fuel: '', year: '', price: ''});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e) => {
        setCar({ ...car, [e.target.name]: e.target.value });
    };

    const addCar = () => {
        props.saveCar(car);
        handleClose();
    };

return (
    <div>
    <Button style={{margin:10, color:"white"}}variant="outlined" onClick={handleClickOpen}>
        Add new car
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New car</DialogTitle>
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
          <Button onClick={addCar}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
);
}