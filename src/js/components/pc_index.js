/**
 * Created by videoedit on 8/18/17.
 */
import React, { Component } from 'react';
import PCHeader from'./pc/pc_header';
import PCBody from'./pc/pc_body';


export default class PCIndex extends Component{
    render(){
        return(
            <div>
                <PCHeader/>
                <PCBody/>
            </div>
        );
    };
};