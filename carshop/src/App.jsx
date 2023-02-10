import './App.css'
import Carlist from './components/Carlist'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function App() {


  return (
    <div className="App" style={{height: 'auto', width: '1600px', margin: 'auto'}}>
      
      <AppBar position="static" >
        <Toolbar>
          <Typography variant="h6">
            Car List
          </Typography>
        </Toolbar>
      </AppBar>
      <Carlist/>
    </div>
  )
}

export default App