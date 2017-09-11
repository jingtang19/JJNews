/**
 * Created by videoedit on 8/18/17.
 */
import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import LogoImage from '../../../images/logo.svg';
import Person from 'react-icons/lib/md/person';
import MdChevronLeft  from 'react-icons/lib/md/chevron-left';
import { Tabs,message,Form,Input,Button,Modal} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;





//组件样式
const TopBar = styled.div`
    height:44px;
    background:#333;
    color:white;
    display: flex;
    flex-direction: row;
    line-height:44px;
    justify-content:space-between;
    
    
`;

const Logo = styled.div`
    margin:0 auto;
    width:120px;
    height:30px;
    background-image: url(${LogoImage});
    margin-top:6px;
`;



//核心组件
class MobileHeaderBack extends Component{
    constructor(){
        super()
        this.state={
            current:'top',
            modalVisible:false,
            action:'login',
            hasLogined:false,
            userNickName:'',
            userid:0
        }
    }



    componentWillMount(){
        if (localStorage.userid!='') {
            this.setState({hasLogined:true});
            this.setState({userNickName:localStorage.userNickName,userid:localStorage.userid});
        }
    };

    setModalVisible(value){
        this.setState({modalVisible:value});
    };

    logOut(){
        localStorage.userid = '';
        localStorage.userNickName = '';
        this.setState({hasLogined:false});
    }

    handleSubmit(e){

        e.preventDefault();
        var myMethod ={
            method:'GET'
        }
        this.props.form.validateFields((err, values) => {

            if (!err) {
                fetch('http://newsapi.gugujiankong.com/Handler.ashx?action='+this.state.action+'&username='+values.username+'&password='+values.password+'&r_userName='+values.r_username+'&r_password='+values.r_password+'&_confirmPassword='+values.r_confirm,myMethod)
                    .then(response => response.json())
                    .then(json=>{
                        this.setState({
                            userNickName:json.NickUserName,
                            userid:json.UserId});

                        localStorage.userNickName = json.NickUserName;
                        localStorage.userid = json.UserId;
                    });
                if(this.state.action=='login'){
                    this.setState({hasLogined:'true'});
                }

                message.success('搞定！成功啦！');
                this.setModalVisible(false);

            }
        });
    }

    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('r_password')) {
            callback('请输入一致的代码!');
        } else {
            callback();
        }
    }

    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['r_confirm'], { force: true });
        }
        callback();
    }

    actionPass(key){

        if(key == 1 ){
            this.setState({action:'login'});
        }else if(key == 2){
            this.setState({action:'register'});
        }
        console.log('执行后'+key +'状态'+ this.state.action);
    }


    render(){
        let {getFieldDecorator} = this.props.form;
        return(
            <div>
                <TopBar>
                    <Link  style={{marginLeft:'3%',width: '25px',height:'25px',display:'inline-block'}}to="/"> <MdChevronLeft style={{width: '25px',height:'25px',color:'white'}}/></Link>
                   <Logo/>
                    <Person style={{width: '20px',height:'20px',marginTop:'12px',marginRight:'3%'}} onClick={()=>this.setModalVisible(true)}/>
                </TopBar>


                <Modal title =""
                       wrapClassName="vertical-center-modal"
                       visible={this.state.modalVisible}
                       onCancel={()=>this.setModalVisible(false)}
                       onOk={()=>this.setModalVisible(false)}
                       okText='关闭'>

                    <Tabs type="card" onChange={this.actionPass.bind(this)}>
                        <TabPane tab="登录" key="1">
                            {
                                this.state.action === 'login'?<Form  layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>

                                    <FormItem
                                        label="用户名"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('username', {
                                            rules: [{ required: true, message: '请输入用户名!', whitespace: true }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>

                                    <FormItem
                                        label="密码"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('password', {
                                            rules: [{
                                                required: true, message: '请输入密码',
                                            }],
                                        })(
                                            <Input type="password" />
                                        )}
                                    </FormItem>
                                    <Button type="primary" htmlType='submit'>登录</Button>
                                </Form>:null
                            }

                        </TabPane>


                        <TabPane tab="注册" key="2">
                            {
                                this.state.action === 'register'?<Form  layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>

                                    <FormItem
                                        label="用户名"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('r_username', {
                                            rules: [{ required: true, message: '请输入用户名!', whitespace: true }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>

                                    <FormItem
                                        label="密码"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('r_password', {
                                            rules: [{
                                                required: true, message: '请输入密码',
                                            }, {
                                                validator: this.checkConfirm,
                                            }],
                                        })(
                                            <Input type="password" />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        label="确认密码"
                                        hasFeedback>
                                        {getFieldDecorator('r_confirm', {
                                            rules: [{
                                                required: true, message: '请输入确认密码',
                                            }, {
                                                validator: this.checkPassword,
                                            }],
                                        })(
                                            <Input type="password"/>
                                        )}
                                    </FormItem>
                                    <Button type="primary" htmlType='submit'>注册</Button>
                                </Form>:null
                            }
                        </TabPane>
                    </Tabs>

                </Modal>
            </div>
        );
    };
};

export default MobileHeaderBack = Form.create({})(MobileHeaderBack);