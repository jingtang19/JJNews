import React, {Component} from 'react';
import styled from 'styled-components';
import { Form,Input,Button,Card,message} from 'antd';
const FormItem = Form.Item;



class Comments extends Component{
    constructor(){
        super();
        this.state={
            comments:''
        }
    }


    componentDidMount(){
        var option = {
            method:'GET'
        }
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey='+this.props.uniquekey,option)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    comments:json
                })
            })
    }



    handleSubmit(e) {
        e.preventDefault();

        if(localStorage.userid){
        var myFetchOptions = {
            method: 'GET'
        };
        var formdata = this.props.form.getFieldsValue();
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey + "&commnet=" + formdata.remark, myFetchOptions).then(response => response.json()).then(json => {
            this.componentDidMount();
            console.log('已经刷新')
            message.success('您的评论已经顺利提交啦，么么哒');
        })
        }else{
            message.warning('您需要登陆才可以评论哦');
        }
    };

    render(){
        let {getFieldProps} = this.props.form;
        const {comments} = this.state;
        const commentList = comments.length
            ?
            comments.map((comment,index)=>(
               <Card key={index} title={comment.username} extra={<a href="#">发布于{comment.datetime}</a>} >
                    <p>{comment.Comments}</p>
               </Card>
            ))
            :
            '暂时还没有评论哦'


        return(
            <div>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label="您的评论">
                        <Input type="textarea" placeholder="留下你的评论吧" {...getFieldProps('remark',{initialValue:''})}/>
                    </FormItem>
                    <Button type='primary' htmlType='submit'>提交评论</Button>
                </Form>
                {commentList}

            </div>
        );

    }

}

export default Comments = Form.create({})(Comments);