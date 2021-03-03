import React from 'react';
import './style/App.css';
import Topbar from './components/Topbar/Topbar';
import MainBlock from './components/MainBlock/MainBlock';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import RTL from './components/RTL'
import axios from 'axios'

const theme = createMuiTheme({
  palette: {
    primary: { 
      main: '#0a1963',
    }
  },
  typography: {
    fontSize: 20
  },
  direction: 'rtl'
})

axios.defaults.baseURL = 'http://10.0.0.18:5000';
axios.defaults.headers['Content-Type'] = 'application/json';


function App() {
  return (
    <div dir="rtl" className="App">
      <ThemeProvider theme={theme}>
        <RTL>
          <Topbar />
          <MainBlock />
        </RTL>  
        
      </ThemeProvider>
    </div>
  );
}

export default App;
