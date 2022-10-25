import React, { Component } from 'react';
import { connect } from 'react-redux';
import ACTIONS from "../../redux/actions";

// 用于创建一个冒险者的模板
class HeroCreate extends Component {
    state = {
        hero_type: 100,
        // hp, power, magic,skill, speed, armor,resistence
        // 
        // hero_valueName : ["体","力" ,"魔","技","速","护甲","抗性"],
        // hero_value: [-1, -1, -1, -1, -1, -1, -1],
        hero_valueName: [
            {
                id: 1000,
                valname: "体质",
                engName: "hp",
                val: 100
            },
            {
                id: 1001,
                valname: "力量",
                engName: "power",
                val: 100
            },
            {
                id: 1002,
                valname: "魔力",
                engName: "magic",
                val: 100
            },
            {
                id: 1003,
                valname: "技巧",
                engName: "tech",
                val: 100
            },
            {
                id: 1004,
                valname: "速度",
                engName: "speed",
                val: 1
            },
            {
                id: 1005,
                valname: "护甲",
                engName: "armor",
                val: 1
            },
            {
                id: 1006,
                valname: "抗性",
                engName: "resitence",
                val: 1
            }
        ],
        imgsrc: "",
        herolist: [
            {
                id: 101,
                name: "岩浆法师",
                caetgory: "human",
                skillList : [
                    {
                        name: "炎爆术", //技能名称
                        damagetype: "magic", // 技能类型
                        atktype: 1,  // 攻击类型 1 单体，2 全体
                        skillparam: [0, 0, 3.3, 0, 0], // 技能伤害参数,体 力 魔 技 速
                        hitrate: 0.45, // 技能
                        criticalrate: 0.17,
                        dotpercent: 0.7,
                        dotparam : [0, 0, 0, 0.25, 0],
                        dotname : "灼烧",
                        dottime: 6 * 1000,
                        cd : 1.8,
                        ghost: 0.35,
                    },
                    {
                        name: "引燃术", //技能名称
                        damagetype: "magic", // 技能类型
                        atktype: 2,
                        skillparam: [0, 0, 1.55, 0, 0], // 技能伤害参数,体 力 魔 技 速
                        hitrate: 0.35, // 技能
                        criticalrate: 0.05,
                        dotpercent: 0.7,
                        dotbase : 1,
                        dotparam : [0, 0, 0, 0.25, 0],
                        dotname : "灼烧",
                        dottime: 6 * 1000,
                        cd : 3,
                        ghost: 0.35,
                    }, 
                    {
                        name: "凝神静气", //技能名称
                        damagetype: "buff", // 技能类型
                        atktype: 2,
                        skillparam: [0, 0, -0.6, 0, 0], // 技能伤害参数,体 力 魔 技 速
                        hitrate: 1, // 技能命中率
                        dotpercent: 1,// dot命中率
                        dotbase : 5,
                        dotparam : [0, 0, 0, 0.25, 0],
                        dotname : "灼烧",
                        dottime: 15 * 1000,
                        cd : 3,
                    }
                ]
                // 技能系数
            },
            {
                id: 102,
                name: "狂战神",
                category: "human",
                skillList : [
                    {
                        name: "乾坤一击", //技能名称
                        damagetype: "power", // 技能类型
                        atktype: 1,
                        skillparam: [0, 6, 0, 0, 0], // 技能伤害参数,体 力 魔 技 速
                        hitrate: 0.3, // 技能
                        criticalrate: 0.15,
                        dotpercent: 0,
                        cd : 1.8,
                        human: 0.1,
                    }, 
                    {
                        name: "狂野之舞", //技能名称
                        damagetype: "magic", // 技能类型
                        atktype: 1,
                        skillparam: [0, 1.8, 0, 0, 0], // 技能伤害参数,体 力 魔 技 速
                        hitrate: 0.3, // 技能命中率
                        criticalrate: 0.1,
                        dotpercent: 0,// dot命中率
                        cd : 3,
                    },
                    {
                        name: "挥击", //技能名称
                        damagetype: "power", // 技能类型
                        atktype: 1,
                        skillparam: [0, 2.4, 0, 0, 0], // 技能伤害参数,体 力 魔 技 速
                        hitrate: 0.4, // 技能
                        criticalrate: 0.08,
                        dotpercent: 0,
                        cd : 1.5,
                    },
                ]
            },
            {
                id: 103,
                name: "夜莺",
                caetgory: "human",
                skillList : [
                    {
                        name: "撕裂", //技能名称
                        damagetype: "power", // 技能类型
                        atktype: 1,  // 攻击类型 1 单体，2 全体
                        skillparam: [0, 1.85, 0, 0, 0], // 技能伤害参数,体 力 魔 技 速
                        hitrate: 0.45, // 技能
                        criticalrate: 0.18,
                        dotpercent: 0.95,
                        dotparam : [0, 0, 0, 0.25, 0],
                        dotname : "流血",
                        dottime: 8 * 1000,
                        cd : 1.5,
                    },
                    {
                        name: "剧毒猛击", //技能名称
                        damagetype: "power", // 技能类型
                        atktype: 1,  // 攻击类型 1 单体，2 全体
                        skillparam: [0, 1.9, 0, 0, 0], // 技能伤害参数,体 力 魔 技 速
                        hitrate: 0.45, // 技能命中率
                        criticalrate: 0.15, // 暴击率
                        dotpercent: 0.9,
                        dotparam : [0, 0, 0, 0.25, 0],
                        dotname : "瘟疫",
                        dottime: 8 * 1000,
                        cd : 1.6,
                    }, 
                    {
                        name: "连击", //技能名称
                        damagetype: "power", // 技能类型
                        atktype: 1,
                        skillparam: [0, 0.85, 0, 0, 0], // 技能伤害参数,体 力 魔 技 速
                        hitrate: 0.4, // 技能命中率
                        criticalrate: 0.26,
                        dotpercent: 0,// dot命中率
                        cd : -1,
                    }
                ]
            }
        ]
    };
    render() {
        return (<React.Fragment>
            <form className='heroForm' key={this.props.id-5000}>
                <div style={{ display: "inline-block", userSelect: "none"}}>{"冒险者" + this.props.id}</div>
                <select
                    id={`selecthero${this.props.id}`}
                    placeholder='选择冒险者职业'
                >
                    {this.state.herolist.map(hero => {
                        return <option value={hero.name} key={hero.id}>{hero.name}</option>
                    })}
                </select>
                {this.state.hero_valueName.map(t => {
                    return (
                        <div key={t.id}>
                            <div style={this.getStyles("text")}>{t.valname}</div>
                            <input className={`${t.engName}${this.props.id}`}
                                style={this.getStyles("input")}
                                placeholder={"输入" + t.valname}
                                value={t.val === -1 ? "" : t.val}
                                onChange={(e) => this.changeEvent(e, t.id)}
                                maxLength="10"></input>
                            <div className="buttonReset" onClick={() => this.resetVal(t.id)}>{"清除"}</div>
                        </div>
                    )
                })
                }
                <div onClick={() => this.reset()} className="btn btn-danger" style={this.getStyles("reset")}>{"重置属性"}</div>
                <div className="btn btn-success" style={this.getStyles("add")} onClick={()=>this.prepareInit()}>{"添加冒险者"}</div>
            </form>
        </React.Fragment>);
    };
    reset = () => {
        const valname = this.state.hero_valueName.filter(t => {
            t.val = -1;
            return true;
        })
        this.setState(
            {
                hero_valueName: valname
            }
        )
    }
    prepareInit = () => {
        let hero_val = this.state.hero_valueName;
        let t = document.getElementById(`selecthero${this.props.id}`);
        let heroparmeter = this.state.herolist[t.selectedIndex];
        for (let i = 0; i < hero_val.length; i ++)
        {
            if (parseInt(hero_val[i].val) < 0)
            {
                this.tempAlert("请填写"+hero_val[i].valname, 1000);
                return;
            }
        }
        
        heroparmeter.id = heroparmeter.id * 10 + this.props.id
        let param = [];

        for (let i = 0; i < hero_val.length; i ++)
        {
            param.push(parseInt(hero_val[i].val));
        }

        let hero = {
            heroindex: this.props.id,
            is_alive: 1,
            hp : param[0] * 10,
            power: param[1],
            magic : param[2],
            tech: param[3],
            speed : param[4],
            armor: param[5],
            resistence: param[6],
            heroparam: param,
            coldtime: 1.5,
            last_atk_time: 0,
            ...heroparmeter,
        }
        this.props.inithero(hero);
    }

    resetVal = (key) => {
        const valname = this.state.hero_valueName.filter(t => {
            if (t.id === key) t.val = -1;
            return true;
        })
        this.setState(
            {
                hero_valueName: valname
            }
        )
    }
    getNum = (key) => {
        let value = this.state.hero_valueName[key].val;
        if (value === -1) return "";
        return value;
    }
    changeEvent = (e, key) => {
        let value = e.target.value.replace(/[^\d]/g, '');
        let valname = this.state.hero_valueName;
        valname[key - 1000].val = value
        this.setState(
            {
                hero_valueName: valname
            }
        )
    };

    tempAlert(msg,duration)
    {
        var el = document.createElement("div");
        el.setAttribute("style","position:fixed;top:8%;right:8%;background-color:#FF6347;color:#FFE4B5;height:100px;width:300px;font-size:200%;text-align:center;line-height:100px;box-shadow:0px 0px 10px #FF7F50;border-radius: 15px 50px");
        el.innerHTML = msg;
        setTimeout(function(){
            el.parentNode.removeChild(el);
        },duration);
        document.body.appendChild(el);
    }

    // InintHero = ()

    getStyles = (type) => {
        if (type === "text") {
            let styles = {
                width: "40px",
                height: "20px",
                display: "inline-block",
                marginLeft: "5px",
                userSelect: "none"
            }
            return styles;
        }
        if (type === "reset") {
            let styles = {
                marginTop: "2px",
                marginLeft: "5px",
            }
            return styles;
        }
        if (type === "add") {
            let styles = {
                marginTop: "2px",
                marginLeft: "0.5rem",
            }
            return styles;
        }
        if (type === "input") {
            let styles = {
                width: "100px",
                height: "20px",
                marginTop: "2px",
                display: "inline-block",
                textAlign: "left"
            }
            return styles;
        }
        let styles = {
            width: "200px",
            height: "50px",
            background: "red",
            color: "white",
            textAlign: "center",
            lineHeight: "50px",
            borderRadius: "5px",
        }
        return styles;
    };
}

const mapDispathchToProps = {
    inithero: (hero) => {
        return {
            type: ACTIONS.INIT_HERO,
            hero: hero,
        }
    }
}

export default connect(null, mapDispathchToProps)(HeroCreate);
// export default HeroCreate;
