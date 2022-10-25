import React, { Component } from 'react';
import img2 from '../../images/2.png'
import { connect } from 'react-redux';
// import ACTIONS from '../../redux/actions';

class Boss extends Component {
    state = {
        id: -1,
        bosslist: [
            {
                id: 10001,
                name: "一字马儿",
                val: {
                    power: 100000,
                    magic: 100000,
                    tech: 100000,
                    speed: 100000,
                    armor: 1000,
                    hp: 100000,
                    resistence: 1000,
                },
                time: 280,
                skill_strategy: "circle", // "random"
                skill: [
                    {
                        atk_type: 1, //攻击方式 1->all 全体, 2 random 单点, 3 回复, 4 buff
                        damge_type: 1, //伤害类型 1 power, 2 magic
                        // 位运算代替
                        if_taunt: 0, // 0 不吃嘲讽，1 吃嘲讽
                        if_armor: 0, // 是否攻击护甲最低
                        if_hp_low: 0, // 是否攻击血量最低
                        if_hp_high: 0, // 是否攻击血量最高
                        if_res: 0, //是否攻击抗性最低
                        damage: 1000, // 基础伤害
                        critical_percent: 0.5, // 暴击几率
                        damage_param: 1.0, // 伤害系数
                    }
                ]

            }
        ]
    }
    
    // // 创建计时器
    // // 如何避免狂按战斗开始
    // componentDidUpdate() {
    //     console.log(this.props.is_fighting)
    //     if (this.props.is_fighting === 1)
    //     {
    //         this.timerID = setInterval(
    //             () => this.forceUpadate(), 
    //             1000);
    //     }
    // }
    // forceUpadate() {

    //     // if (this.state.id === -1)
    //     //     this.state.id = this.timerID;
    //     // let t = this.timerID
    //     // console.log(t)
    //     clearInterval(this.timerID);
    //     this.props.time_update();
    //     // if (t <= this.state.id)
    //     // {
    //     //     clearInterval(this.timerID)
    //     //     this.props.time_update();
    //     //     this.state.id = -1;
    //     // }
    //     // 清除计时器
    // }

    render() {
        return (
            <React.Fragment>
                {/* 
                人物图片 状态栏血条 名称*/}
                <div className='monster'>
                    <h6>{this.props.boss[0].name}</h6>
                    <div className='BloodStrip'>
                        <div>{this.props.boss[0].curhp}<div style={this.getstyles("hp")}></div></div>
                    </div>
                    <div className='ReadingStrip'>
                        <div></div>
                    </div>
                    <div style={{position:"relative"}}>
                        <img src={img2} className="monsterimg" alt="boss"></img>
                        <div className='clock'>{this.getTime()}</div>
                    </div>
                </div>
                
            </React.Fragment>
        );
    }
    getstyles = (type) => {
        let style;
        let percent = parseInt(this.props.boss.curhp / this.props.boss.hp * 100);
        // console.log(this.props)
        if (type === "hp")
        {
            style = {
                width: percent.toString() + "%",
            }
        }
        return style;
    }
    getTime = () => {
        // 毫秒转化为秒
        // console.log(time);
        let time = parseInt(this.props.cur_time / 1000);
        // 对于小时 除3600 获得小时数
        let h = parseInt(time / 3600)
        // console.log(h);
        // 获取一小时内秒数
        time %= 3600;
        // 获取分钟数
        let min = parseInt(time / 60).toString();
        // while (min.length < 2) min = "0" + min;
        // 获取一分钟秒数
        time %= 60;
        let sec = time.toString();
        while (sec.length < 2) sec = "0" + sec;

        let strtime = min + ":" + sec
        if (h !== 0)
            strtime = h.toString() + ":" + strtime;
        
        return strtime;
    }
}

const mapStateToProps = (state, props) =>{
    return {
        cur_time: state.cur_time,
    }
}

export default connect(mapStateToProps, null)(Boss);