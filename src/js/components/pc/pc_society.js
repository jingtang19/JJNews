import React, {Component} from 'react';
// import styled from 'styled-components';
import {Link} from 'react-router-dom';
import '../../../css/pc.css';



//核心组件
export default class Society extends Component{
    constructor(){
        super();
        this.state={
            news:''
        };
    }

    componentWillMount(){
        var myFetchOptions = {
            method:'get'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="+this.props.type+"&count="+this.props.count,myFetchOptions)
            .then(response => response.json())
            .then(json => this.setState({news:json}));
    }



    render(){
        const styleImg ={
            width: this.props.imgWidth,
            height: this.props.imgHeight,
            display:'inline-block',
            float:'left',
            marginRight:'15px'
        }

        const styleLi={
            height:'70px',
            display:'block',
            borderBottom:'.5px solid #efefef',
            paddingTop:'10px'
        }

        const right={
            paddingLeft:'10px'
        }

        const styleLink={
            fontSize:'14px',

        }


        const {news} = this.state;
        const newsList = news.length?
            news.map((newsItem,index)=>(

            <li key={index} style={styleLi}>
                <img src={newsItem.thumbnail_pic_s} alt="tupian" style={styleImg}/>
                <div style={right}>
                    <Link to={`/details/${newsItem.uniquekey}`} style={styleLink}>{newsItem.title}</Link>
                </div>
            </li>))
                :
            "loading"



        return(
            <div>
                <h2>{this.props.Newstitle}</h2>
                {newsList}
            </div>
        );

    };
};