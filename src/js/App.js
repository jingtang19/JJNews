import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import PCIndex from './components/pc_index';
import MobileIndex from './components/mobile_index';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import PCDetail from "./components/pc/pc_detail";
import 'antd/dist/antd.css';
import '../css/App.css';



class App extends Component {
  render() {
    return (
        <div>
            <MediaQuery query='(min-device-width: 769px)'>
                <BrowserRouter>
                    <Switch>
                        <Route exact component={PCIndex} path="/"/>
                        <Route component={PCDetail} path="/details/:uniquekey"/>
                    </Switch>
                </BrowserRouter>
            </MediaQuery>
            <MediaQuery query='(max-device-width: 768px)'>
                <BrowserRouter>
                    <Switch>
                        <Route exact component={MobileIndex} path="/"/>
                    </Switch>
                </BrowserRouter>
            </MediaQuery>
        </div>
    );
  }
}

export default App;
