import * as React from "react";


/**
 * 这里time是秒
 */
export default class CountDown extends React.Component{

    constructor(props){
        super(props);

        let date = new Date((this.props.date + " " + this.props.time + ":000").replace(/-/g, '/')).getTime();
        let now = new Date().getTime();

        this.state = {
            time: parseInt((date - now)/1000)
        };

        this.id = setInterval(()=>{
            let time = this.state.time;

            if(time < 0){
                clearInterval(this.id);
            }

            this.setState({time: time - 1});
        },1000);
    }

    componentWillUnmount(){
        clearInterval(this.id);
    }


    render(){
        //86400
        let day = parseInt(this.state.time / 60 / 60 / 24);
        let hour = parseInt((this.state.time % parseInt(60 * 60 * 24)) / 60 / 60);
        let min = parseInt((this.state.time % (60 * 60)) / 60);
        let sec = parseInt((this.state.time) - (day * 60 * 60 * 24 + hour * 60 * 60 + min * 60));


        // console.log("day : " + day  + "hour : " + hour + " min : " + min + " sec : " + sec);

        return (
            <span {...this.props}>
                还剩{day}天{hour}小时{min}分钟{sec}秒
            </span>
        );
    }
}