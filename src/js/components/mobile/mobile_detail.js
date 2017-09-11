import React, {Component} from 'react';
import '../../../css/pc.css';
import Comments from '../public/comments';
import MobileHeaderBack from './mobile_header_back'
import { BackTop } from 'antd';







export default class MobileDetail extends Component{
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
                <MobileHeaderBack/>
                <br/>
                        <section  style={{width:'90%',margin:'0 auto'}}>
                        <div id="articleContent" dangerouslySetInnerHTML={this.createMarkup()}></div>
                        <Comments uniquekey={this.props.match.params.uniquekey}/>
                        </section>

                <BackTop style={{right:'5%',bottom:'5%'}}/>
            </div>

        );
    };
};

