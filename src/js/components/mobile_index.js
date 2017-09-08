/**
 * Created by videoedit on 8/18/17.
 */
import React, { Component } from 'react';
import MobileHeader from './mobile/mobile_header';
import MobileBody from "./mobile/mobile_body";
import '../../css/mobile.css';


export default class MobileIndex extends Component{
    render(){
        return(
            <div>
                <MobileHeader/>
                <MobileBody/>
            </div>
        );
    };
};