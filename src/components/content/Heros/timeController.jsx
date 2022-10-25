import React, { Component } from 'react';
import { connect } from 'react-redux';
import ACTIONS from '../../../redux/actions';

class TimeController extends Component {
    state = {
    } 
    // 创建计时器
    // 如何避免狂按战斗开始
    // componentDidMount() {
    //     // console.log(this.props.is_fighting)
    //     if (this.props.is_fighting === 1)
    //     {
    //         this.timerID = setInterval(
    //             () => this.forceUpadate(), 
    //             1000 / 16);
    //     }
    //     if (this.props.is_fighting === 0)
    //     {
    //         if (this.timerID)
    //             clearInterval(this.timerID);
    //     }
    // }
    // forceUpadate() {
    //     // clearInterval(this.timerID);
    //     this.props.time_update();
    // }
    render() { 
        return (
            <button
                onClick={()=>this.props.fight_control(this.props.type)}
            >{this.props.name}</button>
        );
    }
}

// const mapStateToProps = (state, props) => {
//     // console.log(state.bossStatus)
//     return {
//         is_fighting: state.is_fighting,
//     }
// }


const mapDispathchToProps = {

    fight_control: ctype =>{
        return {
            type: ACTIONS.FIGHT_CONTROL,
            controltype: ctype,
        }
    },
    // time_update: () => {
    //     return {
    //         type: ACTIONS.TIME_UPDATE
    //     }
    // }
}

export default connect(null, mapDispathchToProps)(TimeController);