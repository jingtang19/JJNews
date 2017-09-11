import React, {Component} from 'react';
import styled from 'styled-components';
import {Icon,Tabs,message,Form,Input,Button,Modal} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;




//组件样式
const TopBar = styled.div`
    height:34px;
    background:#333;
    color:white;
    line-height:34px;    
`;

//核心组件
class PCHeader extends Component{
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
        console.log(localStorage.userid);
        if (localStorage.userid!=='') {
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
                if(this.state.action==='login'){
                    this.setState({hasLogined:'true'});
                }

                message.success('请求成功');
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
        const userShow = this.state.hasLogined
            ?
            <div>
            <Button type="primary" htmlType='button'>{this.state.userNickName}</Button>
            <Button type="dashed" htmlType="button" style={{backgroundColor:'#333',color:'white'}}>个人中心</Button>
            <Button type="ghost" htmlType="button" style={{color:'#ffffff'}} onClick={this.logOut.bind(this)}>退出</Button>
            </div>
            :
            <div onClick={()=>this.setModalVisible(true)}><h4 style={{color:'#ffffff'}}>注册／登陆</h4></div>



        return(
            <div>
            <TopBar>
                <div style={{margin:'auto' ,float:'left', marginLeft:'5%'}} ><Icon type="mail" />  Email: jingtang19@hotmail.com</div>
                <div className="topRight" style={{margin:'auto' ,float:'right', marginRight:'5%'}}>
                    {userShow}
                </div>
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

export default PCHeader = Form.create({})(PCHeader);