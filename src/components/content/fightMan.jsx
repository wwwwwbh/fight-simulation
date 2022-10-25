import React, { Component } from 'react';
// import img1 from '../../images/1.png'
import SkillButton from './Heros/skillButton'
import ReadingStrip from "./Heros/readingStrip";

class FightMan extends Component {
    // image 存储人物图片
    // statues 存储人物状态buff，用数组。
    // value 存储人物各项属性name
    // skill 存储人物技能
    // strategy 存储人物策略
    state = { 
        image: "1",
        statu: {},
     } 
    render() { 
        return (
            <React.Fragment>
                {/* 
                人物图片 状态栏血条 名称*/}
                <div className='adventurer'>
                    <img src={require('../../images/'+ this.state.image +'.png')} alt={`hero${this.props.heroinfo.id}`}></img>
                    {/* <img src={img1} alt=""></img> */}
                    {/* js保留一位小数点向下 */}
                    <div className='BloodStrip'>
                        <div>{this.props.heroinfo.hp}<div></div></div>
                    </div>
                    <h6>{this.props.heroinfo.name}</h6>
                    {/* <div className={`ReadingStrip${this.props.id}`}>
                        <div></div>
                    </div> */}
                    <ReadingStrip 
                        id = {this.props.id}
                    />
                    <div className='SkillButton'>
                        <SkillButton
                            skillname = {this.props.heroinfo.skillList[0].name}
                            damage = {this.getdamages(this.props.heroinfo.heroparam, this.props.heroinfo.skillList[0].skillparam)}
                        />
                        <SkillButton
                            skillname = {this.props.heroinfo.skillList[1].name}
                            damage = {this.getdamages(this.props.heroinfo.heroparam, this.props.heroinfo.skillList[1].skillparam)}
                        />
                        <SkillButton
                            skillname = {this.props.heroinfo.skillList[2].name}
                            damage = {this.getdamages(this.props.heroinfo.heroparam, this.props.heroinfo.skillList[2].skillparam)}
                        />
                    </div>
                </div>
                
            </React.Fragment>
        );
    }
    getstyle = () => {

    }
    getdamages = (heroparam, skillparam) => {
        let damage = 0;
        for (let i = 0; i < skillparam.length; i ++)
            damage += heroparam[i] * skillparam[i]
        return damage
    }
}
 
export default FightMan;