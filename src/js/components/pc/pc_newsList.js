import React, {Component} from 'react';
// import styled from 'styled-components';
import {Link} from 'react-router-dom';
import '../../../css/pc.css';



//核心组件
export default class NewsList extends Component{
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
        const PList={
            width:"300px",
            whiteSpace:'nowrap',
            overflow:'hidden',
            textOverflow:'ellipsis'

        }


        const {news} = this.state;
        const newsList = news.length?
            news.map((newsItem,index)=>(
            <li key={index} style={{ lineHeight:'25px',fontSize:'13px'}}>
                <Link to={`/details/${newsItem.uniquekey}`} target="_blank" ><p style={PList}>{newsItem.title}</p></Link>

            </li>))
                :
            "loading"



        return(
            <div style={{
                background:'#efefef',
                padding:'15px 20px',
            }}>
                <h2>{this.props.Newstitle}</h2>
                <hr/>
                {newsList}
            </div>
        );

    };
};