import React, { Component } from 'react';
import Base from './base';
import HeroCreate from './HeroCreate';
import FightMan from './fightMan';
import Boss from './boss';
// 让数显示的包connect
import { connect } from 'react-redux';
import SelectBoss from './Boss/selectBoss';
import TimeController from './Heros/timeController'
import ACTIONS from '../../redux/actions';

class Fight extends Component {
    state = {
        heros: [
            { id: 70001 },
            { id: 70002 },
            { id: 70003 },
            { id: 70004 }
        ],
        loadingEquipment: [
            { id: 50001 }
        ],
        boss: {
            hp: 1000,
            curhp: 1000
        },
        fihgtPlace : [
            {
                id: 60001,
                name: "通用场景"
            },
            {
                id: 60002,
                name: "遗迹"
            }

        ]
    }

    handleDelete = (heroId) => {
        const heroes = this.state.boxes.filter(
            h => h.id !== heroId
        );
        this.setState({ heroes })
    }

    render() {
        return (<React.Fragment>
            <Base>
                <div className='loadingHead'>
                {
                    <select style={{marginLeft: "1rem",height: "2rem"}}>
                        {this.state.loadingEquipment.map(t => <option value={t.id} key={t.id}>配装{t.id - 50000}</option>)}
                    </select>
                }
                {
                    <select style={{marginLeft: "1rem",height: "2rem"}} onChange={(e)=>this.changevent(e)}>
                        {this.state.fihgtPlace.map(t => <option value={t.id} key={t.id}>{t.name}</option>)}
                    </select>
                }
                {
                    <input style={{marginLeft: "1rem", display:"none", height: "2rem"}} id="revengeInput" type="Number"></input>
                }
                <SelectBoss/>
                </div>
                {/* <div className='heroPrepare'> */}
                {
                     this.state.heros.map(hero => (
                         <HeroCreate
                            key={hero.id}
                            id={hero.id - 70000}
                        />
                    ))
                }
                {/* </div> */}
                {/* 战斗区域 */}
                <div className='fightSence'>
                    <TimeController
                        name = {`开始战斗`}
                        type = {1}
                    />
                    <TimeController
                        name = {`暂停`}
                        type = {2}
                    />
                    <TimeController
                        name = {`继续`}
                        type = {3}
                    />
                    <TimeController
                        name = {`中止`}
                        type = {4}
                    />
                    <Boss
                        boss = {this.props.bossStatus}
                    />
                    {
                     this.props.heroStatus.map(t => (
                        <FightMan
                            key = {t.id}
                            id = {t.id % 10}
                            heroinfo = {t}
                        />
                    ))
                    }
                </div>
            </Base>
        </React.Fragment>);
    }
    changevent = (e) => {
        let t = document.getElementById("revengeInput");
        if (e.target.options[e.target.selectedIndex].attributes.value.value === this.state.fihgtPlace[1].id.toString(10))
        {
            t.style.display="inline";
        }
        else t.style.display="none";
        
    }
    // 创建计时器
    // 如何避免狂按战斗开始
    componentDidMount() {
        // console.log(this.props.is_fighting)
        // if (this.props.is_fighting === 1)
        // {
            this.timerID = setInterval(
                () => {
                    if (this.props.is_fighting === 1)
                        this.forceUpadate()
                },1000 / 60);
        // }
    }
    forceUpadate() {
        // clearInterval(this.timerID);
        this.props.time_update();
    }
}

const mapStateToProps = (state, props) => {
    // console.log(state.bossStatus)
    return {
        bossStatus: state.bossStatus,
        heroStatus: state.heroStatus,
        is_fighting: state.is_fighting,
    }
}

const mapDispathchToProps = {

    fight_control: ctype =>{
        return {
            type: ACTIONS.FIGHT_CONTROL,
            controltype: ctype,
        }
    },
    time_update: () => {
        return {
            type: ACTIONS.TIME_UPDATE
        }
    }
}

export default connect(mapStateToProps, mapDispathchToProps)(Fight);