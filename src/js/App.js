import React, { Component } from 'react';
import '../css/App.css';
import MediaQuery from 'react-responsive';
import PCIndex from './components/pc_index';
import MobileIndex from './components/mobile_index';

class App extends Component {
  render() {
    return (
        <div>
            <MediaQuery query='(min-device-width: 768px)'>
                <PCIndex/>
            </MediaQuery>
            <MediaQuery query='(max-device-width: 768px)'>
                <MobileIndex/>
            </MediaQuery>
        </div>
    );
  }
}

export default App;
