"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
require("./style/App.css");
var Topbar_1 = __importDefault(require("./components/Topbar/Topbar"));
var MainBlock_1 = __importDefault(require("./components/MainBlock/MainBlock"));
var core_1 = require("@material-ui/core");
var RTL_1 = __importDefault(require("./components/RTL"));
var axios_1 = __importDefault(require("axios"));
var SimContext_1 = __importDefault(require("./context/SimContext"));
var Alert_1 = __importDefault(require("./components/Layout/Alert/Alert"));
var InfoContext_1 = __importStar(require("./context/InfoContext"));
var SendDocs_1 = __importDefault(require("./components/SendDocs/SendDocs"));
var Loading_1 = __importDefault(require("./components/Layout/Loading/Loading"));
var theme = core_1.createMuiTheme({
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
});
axios_1.default.defaults.baseURL = 'http://localhost:5000';
axios_1.default.defaults.headers['Content-Type'] = 'application/json';
function App() {
    return (<div dir="rtl" className="App">
      <core_1.ThemeProvider theme={theme}>
        <InfoContext_1.default>
          <SimContext_1.default>
            <RTL_1.default>
              <Topbar_1.default />
              <div className="main-container">
                <MainBlock_1.default />
                <SendDocs_1.default />
              </div>
              <InfoContext_1.InfoContext.Consumer>
                {function (context) {
            return <react_1.Fragment>
                    <Alert_1.default changeGenError={context.changeGenError} error={context.errors.genError}/>
                    {context.loading.status &&
                    <Loading_1.default message={context.loading.message}/>}
                  </react_1.Fragment>;
        }}
              </InfoContext_1.InfoContext.Consumer>
            </RTL_1.default>  
          </SimContext_1.default>
        </InfoContext_1.default>
      </core_1.ThemeProvider>
    </div>);
}
exports.default = App;
