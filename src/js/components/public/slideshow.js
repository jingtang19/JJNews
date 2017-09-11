import React, {Component} from 'react';
import {Button} from 'antd';






export default class SlideShow extends Component{
    constructor(){
        super();
        this.autoPlay = () => {};
        this.state ={
          sliders:[
              "https://p3.pstatp.com/origin/382d000cf98f26fc3526",
              "https://p9.pstatp.com/origin/38310008949e5c938bfc",
              "https://p1.pstatp.com/origin/383000089bece3fed00f"
          ],
            titles:[
                "威廉王子夫妇和哈里出席活动 纪念母妃戴安娜逝世20周年",
                "伊拉克库尔德90后帅哥在北大清华任教 宁当北漂也不回国",
                "朝鲜导弹能力突飞猛进，背后技术支撑竟是这国？"
            ],
            currentImg:"https://p3.pstatp.com/origin/382d000cf98f26fc3526",
            currentTitle:"威廉王子夫妇和哈里出席活动 纪念母妃戴安娜逝世20周年",
            currentIndex:0
    }}


    //click next button so change image to next one.
    nextImg = () =>{
        let Index = this.state.currentIndex >= this.state.sliders.length-1? 0 : this.state.currentIndex+1;
        this.setState({
            currentImg:this.state.sliders[Index],
            currentTitle:this.state.titles[Index],
            currentIndex:  Index

        });
    }

    //click prev button so change image to prev one.
    prevImg = () =>{
        let Index = this.state.currentIndex <=0 ? this.state.sliders.length-1 : this.state.currentIndex-1;
        this.setState({
            currentImg:this.state.sliders[Index],
            currentTitle:this.state.titles[Index],
            currentIndex:  Index

        });
    }


    componentDidMount(){
        this.autoPlay =(setInterval(this.nextImg, 2000));
    }

    componentWillUnmount(){
        clearInterval(this.autoPlay);
    }



    render(){
        const imgStyle={
            width:this.props.imgWidth,
            height:this.props.imgHeight
        }

        const titleStyle ={
            position:'absolute',
            bottom:'0',
            left:'0',
            color:'#fff',
            fontSize:'20px',
            display:'inline-block',
            width:this.props.imgWidth,
            whiteSpace:'nowrap',
            overflow:'hidden',
            textOverflow:'ellipsis',
            padding:'55px 20px 15px',
            height:'100px',
            // background:'-moz-linear-gradient(top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.19) 29%, rgba(0,0,0,0.65) 100%)',
            // background: '-webkit-linear-gradient(top, rgba(0,0,0,0) 0%,rgba(0,0,0,0.19) 29%,rgba(0,0,0,0.65) 100%)',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.35) 29%,rgba(0,0,0,1) 100%)',
            filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr="#00000000", endColorstr="#a6000000",GradientType=0 )',
        }

        const prevStyle={
            position:'absolute',
            top:'45%',
            left:'20px',
            background:'#000',
            border:'none',
            opacity:'.7',
        }

        const nextStyle={
            position:'absolute',
            top:'45%',
            right:'20px',
            background:'#000',
            border:'none',
            opacity:'.7',
        }

        return(

                       <div id="slider" style={{
                           position:'relative',
                           borderTop:'3px solid #00D1FF',
                           width:this.props.imgWidth,
                           height:this.props.imgHeight,
                           overflow:"hidden",
                       }}>
                           <img src={this.state.currentImg}  style={imgStyle} alt="图片"/>
                           <span style={titleStyle}>{this.state.currentTitle}</span>
                           <Button type="primary" shape="circle" icon="caret-left" size={'default'} onClick={this.prevImg} style={prevStyle}/>
                           <Button type="primary" shape="circle" icon="caret-right" size={'default'}onClick={this.nextImg} style={nextStyle}/>
                       </div>

        );
    };
};