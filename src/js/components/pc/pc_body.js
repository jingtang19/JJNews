import React, {Component} from 'react';
import styled from 'styled-components';
import PCNews from './pc_news';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SlideShow from '../public/slideshow';
import NewsList from './pc_newsList';
import Society from './pc_society';
import LogoImage from '../../../images/logoWeb.svg';
import 'react-tabs/style/tabs.css';
import { BackTop,Affix } from 'antd';


//组件样式
const Wrap = styled.div`
    width:1170px;
    margin:0 auto;
    margin-top:15px
`;

const Logo = styled.div`
    margin:0 auto;
    width:110px;
    height:27px;
    background-image: url(${LogoImage});
    margin-top:6px;
`;

const LeftNav = styled.div`width:110px;float:left; height:300px;margin-right:30px;`;
const MiddleContent = styled.div`width:660px;float:left; height:300px;margin-right:30px;`;
const RightBox = styled.div`width:340px;float:left; height:300px;`;

//核心组件






export default class PCBody extends Component{
    constructor(){
        super();
        this.state ={
            tabIndex:0,
          sliders:[
              "https://p3.pstatp.com/origin/382d000cf98f26fc3526",
              "https://p9.pstatp.com/origin/38310008949e5c938bfc",
              "https://p1.pstatp.com/origin/383000089bece3fed00f"
          ],
            titles:[
                "威廉王子夫妇和哈里出席活动 纪念母妃戴安娜逝世20周年",
                "伊拉克库尔德90后帅哥在北大清华任教 宁当北漂也不回国",
                "朝鲜导弹能力突飞猛进，背后技术支撑竟是这国？"
            ]

    }}





    render(){
        const tabStyle={
            width:"110px",
            height:'40px',
            textAlign:'center',
            lineHeight:'40px'

        }


        return(


           <Wrap>
               <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
               <LeftNav>
                   <Logo/><br/>
                   <Affix offsetTop={30}>
                       <TabList>
                    <Tab><div>头条</div></Tab>
                    <Tab><div>娱乐</div></Tab>
                        <Tab><div>社会</div></Tab>
                        <Tab><div>国内</div></Tab>
                        <Tab><div>国际</div></Tab>
                        <Tab><div>军事</div></Tab>
                    </TabList>
                   </Affix>
                </LeftNav>
               <MiddleContent>
                   <TabPanel>
                       <SlideShow imgWidth="660px"/>
                       <PCNews count={10} type="top" bordered="false" imgWidth="158px" imgHeight="100px"/>
                   </TabPanel>
                   <TabPanel>
                       <PCNews count={10} type="yule"  bordered="false" imgWidth="158px" imgHeight="100px"/>
                   </TabPanel>
                   <TabPanel>
                       <PCNews count={10} type="shehui"  bordered="false" imgWidth="158px" imgHeight="100px"/>
                   </TabPanel>
                   <TabPanel>
                       <PCNews count={10} type="guonei"  bordered="false" imgWidth="158px" imgHeight="100px"/>
                   </TabPanel>
                   <TabPanel>
                       <PCNews count={10} type="guoji"  bordered="false" imgWidth="158px" imgHeight="100px"/>
                   </TabPanel>
                   <TabPanel>
                       <PCNews count={10} type="junshi"  bordered="false" imgWidth="158px" imgHeight="100px"/>
                   </TabPanel>

               </MiddleContent>
    </Tabs>
               <RightBox>
                   <Society count={5} type="shehui" bordered="false" Newstitle="社会新闻" imgWidth="80px" imgHeight="50px"/>
                   <br/>
                   <img src="http://img1.126.net/channel21/0/028585_300250_0811.jpg" alt="广告" width="100%"/>
                   <br/><br/>
                   <NewsList count={10} type="guoji" bordered="false" Newstitle="国际新闻"/>
                   <br/>
                   <NewsList count={10} type="junshi" bordered="false" Newstitle="军事新闻"/>



               </RightBox>

           <BackTop/>
           </Wrap>
        );
    };
};