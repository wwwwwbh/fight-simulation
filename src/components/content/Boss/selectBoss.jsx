import React, { Component } from 'react';
import { connect } from 'react-redux';
import ACTIONS from '../../../redux/actions';

class SelectBoss extends Component {
    state = { 
        bossList: [
            {
                id: 10000,
                name:"请选择Boss",
            },
            {
                id: 10001,
                name: "克苏恩",
                param: [{
                    id : 10001,
                    name: "克苏恩",
                    hp: 100000,
                    curhp: 100000,
                    power: 1000,
                    magic: 1000,
                    tech: 1000,
                    speed: 1000,
                    armor: 50,
                    resistence: 50,
                    coldtime : 1.5,
                    time: 150* 1000,
                    dotlist: [
                    ]
                }]
            },
            {
                id: 10002,
                name: "????",
                param : [{
                    id : 10002,
                    name: "????",
                    hp: 200000,
                    curhp: 200000,
                    power: 1000,
                    magic: 1000,
                    tech: 1000,
                    speed: 1000,
                    armor: 100,
                    resistence: 100,
                    coldtime : 1.5,
                    time: 240 * 1000,
                    dotlist: [
                    ]
                }]
            }
        ]
     } 
    render() { 
        return (
            <select
                style={{marginLeft: "1rem",height: "2rem"}}
                // 根据选择的boss不同传入不同boss参数，现在是对象,之后改对象数组
                onChange={(e)=>{this.props.init_boss(this.state.bossList[e.target.selectedIndex].param)}}
            >
                {this.state.bossList.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
        );
    }
}

const mapDispathchToProps = {
    init_boss: (bossparam) => {
        return {
            type: ACTIONS.INIT_BOSS,
            bossparam: bossparam,
        }
    }
}

export default connect(null, mapDispathchToProps)(SelectBoss);