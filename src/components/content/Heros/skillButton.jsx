import React, { Component } from 'react';
import { connect } from 'react-redux';
import ACTIONS from '../../../redux/actions'

class SkillButton extends Component {
    state = {  } 
    render() { 
        return (
            // 每次点击更新一下怪的伤害和状态，以及自身的状态
            <button
                className='skillbutton'
                onClick={()=>this.props.hero_atk(this.props.damage)}
            >
                {this.props.skillname}
            </button>
        );
    }
}
const mapDispathchToProps = {
    hero_atk: atkparam => {
        return {
            type: ACTIONS.HERO_ATK,
            atkparam: atkparam,
        }
    }
}
export default connect(null,mapDispathchToProps)(SkillButton);
