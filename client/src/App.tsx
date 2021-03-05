import React from 'react';
import './style/App.css';
import Topbar from './components/Topbar/Topbar';
import MainBlock from './components/MainBlock/MainBlock';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import RTL from './components/RTL'
import axios from 'axios'
import SimProvider from './context/SimContext';

const theme = createMuiTheme({
  palette: {
    primary: { 
      main: '#3880eb',
    },
    secondary: {
      main: '#fff'
    }
  },
  typography: {
    fontSize: 20
  },
  direction: 'rtl'
})

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.headers['Content-Type'] = 'application/json';


function App() {
  return (
    <div dir="rtl" className="App">
      <ThemeProvider theme={theme}>
        <SimProvider>
          <RTL>
            <Topbar />
            <MainBlock />
          </RTL>  
        </SimProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
