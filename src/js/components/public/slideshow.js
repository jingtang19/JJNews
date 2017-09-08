import React, {Component} from 'react';






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
            width:this.props.imgWidth
        }

        return(

                       <div id="slider">
                           <img src={this.state.currentImg}  style={imgStyle} alt="图片"/>
                           <span>{this.state.currentTitle}</span>
                           <button onClick={this.prevImg}>prev</button>
                           <button onClick={this.nextImg}>next</button>
                       </div>

        );
    };
};