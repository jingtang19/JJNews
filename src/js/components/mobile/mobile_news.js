import React, {Component} from 'react';
import styled from 'styled-components';
// import {Link} from 'react-router-dom';


//组件样式
const Wrap = styled.div`
    margin:0 auto;
`;


//核心组件
export default class MobileNews extends Component{

    //创建构造函数，构建空的news来接收数据
    constructor(){
        super();
        this.state={
            news:''
        };
    }

    //fetch 调用数据：
    componentWillMount(){
        var myFetchOptions = {
          method:'get'
        };
        //1.通过这个借口请求数据。type和数量尤自己定
        //2.将请求到的数据转化成json
        //3.把这个json数据塞进之前准备好的空的news里
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="+this.props.type+"&count="+this.props.count,myFetchOptions)
            .then(response => response.json())
            .then(json => this.setState({news:json}));
    };



    render(){


        //把news拿来用
        const{news} =this.state;
        //用newsList装填好数据的html内容。
        const newsList = news.length
        ?
            news.map((newsItem,index)=>(
                <li key={index}>


                    <div className="left">
                    <a src={`/details/${newsItem.uniquekey}`} target="_blank">{newsItem.title}</a>
                    <span>来源：{newsItem.author_name} 分类：{newsItem.realtype} </span>
                    </div>
                    <img src={newsItem.thumbnail_pic_s} alt="img"/>
                </li>
            ))
            :
           <p> "加载中（^-^）...么么哒"</p>


        return(
           <Wrap>
               <ul className="mobilelistUL">
                   {newsList}
               </ul>
           </Wrap>
        );
    };
};