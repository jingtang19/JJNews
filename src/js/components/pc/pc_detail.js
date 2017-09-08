import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import '../../../css/pc.css';
import Comments from '../public/comments';
import PCHeader from './pc_header'
import { BackTop } from 'antd';
import Society from './pc_society';
import LogoImage from '../../../images/logoWeb.svg';



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
export default class PCDetail extends Component{
    constructor(){
        super();
        this.state ={
            newsItem:''
        }
    }


    componentWillMount(){
        var myMethod = {method:'GET'}

        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey='+ this.props.match.params.uniquekey,myMethod)
            .then(response => response.json())
            .then(json => {
                this.setState({newsItem: json});
                document.title = this.state.newsItem.title;
            });

    }



    createMarkup(){
        return {__html:this.state.newsItem.pagecontent}
    }


    render(){
        return(
            <div>
                <PCHeader/>
                <Wrap>
                    <LeftNav>
                        <Link to="/"><Logo/></Link>
                    </LeftNav>
                    <MiddleContent>
                        <div id="articleContent" dangerouslySetInnerHTML={this.createMarkup()}></div>
                        <Comments uniquekey={this.props.match.params.uniquekey}/>
                    </MiddleContent>
                    <RightBox>
                        <img src="https://p3.pstatp.com/origin/38090011ad13345ea0a7" alt="广告" width="100%"/>
                        <br/><br/>
                        <Society count={15} type="yule" bordered="false" Newstitle="娱乐新闻" imgWidth="80px" imgHeight="50px"/>

                    </RightBox>
                </Wrap>

                <BackTop />
            </div>

        );
    };
};

