import React from 'react';
import './style/App.css';
import Topbar from './components/Topbar/Topbar';
import MainBlock from './components/MainBlock/MainBlock';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import RTL from './components/RTL'
import axios from 'axios'
import SimProvider from './context/SimContext';
import Alert from './components/Alert/Alert';
import InfoProvider, { InfoContext } from './context/InfoContext';
import SendDocs from './components/SendDocs/SendDocs';

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
        <InfoProvider>
          <SimProvider>
            <RTL>
              <Topbar />
              <div className="main-container">
                <MainBlock />
                <SendDocs />
              </div>
              <InfoContext.Consumer>
                {context => 
                  <Alert 
                  changeGenError={context.changeGenError}
                  error={context.errors.genError} />
                }
              </InfoContext.Consumer>
            </RTL>  
          </SimProvider>
        </InfoProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
