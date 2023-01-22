import React, { Fragment } from 'react';
import './style/App.css';
import Topbar from './components/Topbar/Topbar';
import MainBlock from './components/MainBlock/MainBlock';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import RTL from './components/RTL'
import axios from 'axios'
import SimProvider from './context/SimContext';
import Alert from './components/Layout/Alert/Alert';
import InfoProvider, { InfoContext } from './context/InfoContext';
import SendDocs from './components/SendDocs/SendDocs';
import Loading from './components/Layout/Loading/Loading';

const theme = createMuiTheme({
  palette: {
    primary: { 
      main: '#3880eb',
    },
    secondary: {
      main: '#ddd'
    }
  },
  typography: {
    fontSize: 20
  },
  direction: 'rtl'
})

if(process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://sim-editor-static.onrender.com';
}

else {
  axios.defaults.baseURL = 'http://localhost:8000';
}

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
                  <Fragment>
                    <Alert 
                    changeGenError={context.changeGenError}
                    error={context.errors.genError} />
                    {context.loading.status &&
                      <Loading 
                      message={context.loading.message} />
                    }
                  </Fragment>
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
