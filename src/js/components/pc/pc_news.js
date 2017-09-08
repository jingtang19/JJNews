import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import '../../../css/pc.css';
import Tloader from 'react-touch-loader';



//组件样式
const Wrap = styled.div`
    margin:0 auto;
`;


//核心组件
export default class PCNews extends Component{

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
        //1.通过这个借口请求数据。type和数量尤自己定
        //2.将请求到的数据转化成json
        //3.把这个json数据塞进之前准备好的空的news里
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

        var {hasMore,initializing,refreshedAt} = this.state;
        const styleImg ={
            width: this.props.imgWidth,
            height: this.props.imgHeight
        }

        //把news拿来用
        const{news} =this.state;
        //用newsList装填好数据的html内容。
        const newsList = news.length
        ?
            news.map((newsItem,index)=>(
                <li key={index}>
                    {/*<Link to={`/details/${newsItem.uniquekey}`} target="_blank" >{newsItem.title}</Link>*/}
                    <img src={newsItem.thumbnail_pic_s} alt="img" style={styleImg}/>
                    <div className="right">
                        <Link to={`/details/${newsItem.uniquekey}`} >{newsItem.title}</Link>
                    <span>来源：{newsItem.author_name} 分类：{newsItem.realtype} </span>
                    </div>
                </li>
            ))
            :
            "正在加载数据"

        return(
           <Wrap>
               <ul className="newsListUL">
                   <Tloader
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