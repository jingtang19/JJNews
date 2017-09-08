/**
 * Created by videoedit on 8/18/17.
 */
import React, {Component} from 'react';
import styled from 'styled-components';
import 'whatwg-fetch';
import 'es6-promise';
import LogoImage from '../../../images/logo.svg';
import Person from 'react-icons/lib/md/person';




//组件样式
const TopBar = styled.div`
    height:44px;
    background:#333;
    color:white;
    display: flex;
    flex-direction: row;
    line-height:44px;
    justify-content:space-between;
    
    
`;

const Logo = styled.div`
    margin:0 auto;
    width:120px;
    height:30px;
    background-image: url(${LogoImage});
    margin-top:6px;
`;



//核心组件
export default class MobileHeader extends Component{
    render(){
        return(
            <div>
                <TopBar>
                    <Person style={{marginLeft:'3%', opacity:'0'}}/>
                   <Logo/>
                    <Person style={{width: '20px',height:'20px',marginTop:'12px',marginRight:'3%'}}/>
                </TopBar>
            </div>
        );
    };
};