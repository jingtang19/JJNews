/**
 * Created by videoedit on 8/18/17.
 */
import React, {Component} from 'react';
// import styled from 'styled-components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import MobileNews from './mobile_news';
import '../../../css/mobile.css';
import SlideShow from '../public/slideshow';
import { BackTop} from 'antd';


//核心组件
export default class MobileBody extends Component{
    render(){
        return(
            <div>

                <Tabs >
                    <div className="tabsWrap">

                    <TabList className="tabsList" style={{background:''}}>
                        <Tab style={{borderRadius:0,height:'36px'}}>头条</Tab>
                        <Tab style={{borderRadius:0,height:'36px'}}>社会</Tab>
                        <Tab style={{borderRadius:0,height:'36px'}}>国内</Tab>
                        <Tab style={{borderRadius:0,height:'36px'}}>国际</Tab>
                    </TabList>

                    </div>

                    <TabPanel>
                        <SlideShow imgWidth="100%"/>
                        <MobileNews count={10} type="top" bordered="false"/>
                    </TabPanel>
                    <TabPanel>
                        <MobileNews count={10} type="shehui" bordered="false"/>
                    </TabPanel>
                    <TabPanel>
                        <MobileNews count={10} type="guonei" bordered="false"/>
                    </TabPanel>
                    <TabPanel>
                        <MobileNews count={10} type="guoji" bordered="false"/>
                    </TabPanel>
                </Tabs>

                <BackTop style={{right:'5%',bottom:'5%'}}/>
            </div>
        );
    };
};