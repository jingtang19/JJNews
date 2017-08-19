/**
 * Created by videoedit on 8/18/17.
 */
import React, {Component} from 'react';
import styled from 'styled-components';
import 'whatwg-fetch';
import 'es6-promise';



//组件样式
const TopBar = styled.div`
    height:44px;
    background:#333;
    color:white;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Logo = styled.img`
    width:120px;
    height:25px;
    background:#fff;
    margin:0 auto;
`;

const Tabs = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    height:36px;
    background-color: rgb(244, 245, 246);
    line-height:36px;
    font-size:17px;
    color: #505050;
    justify-content:space-around;
    a:link {
      color: #505050;
    }
    a:visited {
      color: #505050;
    }
     a:hover {
      color: #505050;
    }
    a:active {
      color: #505050;
    }
`;


//核心组件
export default class MobileHeader extends Component{
    render(){
        return(
            <div>
                <TopBar>
                   <Logo/>
                </TopBar>

                <Tabs>
                    {/*<Link to={} target="_blank">今日头条</Link>*/}
                    {/*<Link to={} target="_blank">玩转美国</Link>*/}
                    {/*<Link to={} target="_blank">娱乐八卦</Link>*/}
                    {/*<Link to={} target="_blank">热门折扣</Link>*/}
                    <a href="">今日头条</a>
                    <a href="">玩转美国</a>
                    <a href="">娱乐八卦</a>
                    <a href="">热门折扣</a>
                </Tabs>

            </div>
        );
    };
};