import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import Tloader from 'react-touch-loader';


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
            news:'',
            count:10,
            hasMore:0,
            initializing:0,
            refreshedAt:Date.now()
        };
    }


    //fetch 调用数据：
    componentWillMount(){
        var myFetchOptions = {
          method:'get'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="+this.props.type+"&count="+this.props.count,myFetchOptions)
            .then(response => response.json())
            .then(json => this.setState({news:json}));
    };

    loadMore(resolve){
        setTimeout(()=>{
            var count = this.state.count;
            this.setState({
                count:count+10

            })


            var myFetchOptions = {
                method:'get'
            };
            console.log(this.state.count);
            fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="+this.props.type+"&count="+this.state.count,myFetchOptions)
                .then(response => response.json())
                .then(json => this.setState({news:json}));

            this.setState({
                hasMore: count >0 && count< 50
            });

            resolve();

        },2e3)
    }


    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                initializing:0,
                hasMore:1
            });
        },2e3)
    }




    render(){
        const loaderStyle ={
            height: '100%',
            overflowY: 'scroll',
            webkitOverflowScrolling: 'touch'
        }

        var {hasMore,initializing,refreshedAt} = this.state;
        //把news拿来用
        const{news} =this.state;
        //用newsList装填好数据的html内容。
        const newsList = news.length
        ?
            news.map((newsItem,index)=>(
                <li key={index}>


                    <div className="left">
                    <Link to={`/details/${newsItem.uniquekey}`}>{newsItem.title}</Link>
                    <span>来源：{newsItem.author_name} 分类：{newsItem.realtype} </span>
                    </div>
                    <img src={newsItem.thumbnail_pic_s} alt="img"/>
                </li>
            ))
            :
           <p></p>


        return(
           <Wrap>
               <ul className="mobilelistUL">
                   <Tloader  style={loaderStyle}
                       initializing={initializing}
                       hasMore={hasMore}
                       onLoadMore={this.loadMore.bind(this)}
                       autoLoadMore={true}
                       className="main">

                       {newsList}
                   </Tloader>
               </ul>
           </Wrap>
        );
    };
};