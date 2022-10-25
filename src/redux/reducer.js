

const reducer = (state = {
    // "{\"id\":10001,\"name\":\"克苏恩\",\"hp\":100000,\"curhp\":100000,\"time\":150000}"
    bossStatus : [{
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
        time: 150* 1000,
        dotlist: [
        ]
    }],
    // herostripwidth: [0, 0, 0, 0],
    readingstrip: [],
    heroStatus : [],
    is_fighting : 0,
    is_success: false,
    start_time: 0,
    cur_time: 10000,
    last_time: 0,
}, action) => {
    console.log(action);
    switch(action.type) {
        case "timeupdate":
            // 更新时间每次update
            // 暂时不支持手动
            let time = state.cur_time + 1000 / 60;
            let tmpReadingStrip = [];
            state.heroStatus.map(t=>{
                let deltatime = parseInt((time - t.last_atk_time) / t.coldtime * 100)
                deltatime = Math.min(deltatime, 100)
                console.log(time, t.last_atk_time, t.coldtime, deltatime)
                // console.log(deltatime)
                tmpReadingStrip.push(deltatime)
                return true;
            })
            // console.log(time);
            return {
                ...state,
                cur_time: time,
                readingstrip: tmpReadingStrip
            }
        case "initBoss":
            // 更新对象数组，更新boss的属性，后续还要改boss模板,序列化后存入
            if (action.bossparam !== undefined)
            {
                let params = [];
                action.bossparam.map(t=> {
                    // params.push(JSON.stringify(t))
                    params.push(t)
                    return true;
                })
                // console.log(params);
                state = {
                    ...state,
                    bossStatus: params,
                }
            }
            return state;
        case "deleteBoss":
            return state;
        case "fightcontrol":
            let type = action.controltype;
            // start
            if (type === 1)
            {
                if (state.bossStatus.length === 0)
                {
                    tempAlert("请选择一个boss",1000);
                    return state;
                }
                if (state.heroStatus.length === 0)
                {
                    tempAlert("添加一个冒险者",1000);
                    return state;
                }
                // 重置各个冒险队的cd
                // boss如果开局附加状态也要判断
                // 如果有先发制人要判断掉
                // let i = 1;
                // let atktime = Date.now()
                let tmpherostatus = []
                let tmpreadingstrip = []
                state.heroStatus.map(t => {
                    // 1.5 + 力速比 + 选择技能cd（如果先发） 
                    let time = parseInt(t.power / t.speed * 10)
                    time = Math.min(3.0, time / 10)
                    let tmp = {...t}
                    tmp.coldtime = (1.5 + time) * 1000
                    tmp.last_atk_time = 0
                    tmpherostatus.push(tmp)
                    tmpreadingstrip.push(0)
                    return true;
                })
                // state.readingstrip.map(t => {

                // })
                // let i = 1;
                let tmpbossstatus = []
                state.bossStatus.map(t => {
                    // 1.5 + 力速比 + 选择技能cd（如果先发） 
                    let time = parseInt(t.power / t.speed * 10)
                    time = Math.min(3.0, time / 10)
                    let tmp = {...t}
                    tmp.coldtime = (1.5 + time) * 1000
                    tmp.last_atk_time = 0
                    tmpbossstatus.push(tmp)
                    return true;
                })
                return {
                    ...state,
                    heroStatus: tmpherostatus,
                    bossStatus: tmpbossstatus,
                    cur_time: 0,
                    is_fighting: 1,
                    start_time: 0,
                    readingstrip: tmpreadingstrip,
                    // last_time: Date.now()
                }
            } 
            else if (type === 2 && state.is_fighting === 1) //stop
                return {
                    ...state,
                    is_fighting: 2,
                }
            else if (type === 3 && state.is_fighting === 2) // continue
                return {
                    ...state,
                    is_fighting: 1,
                }
            else if (type === 4) // end
                return{
                    ...state,
                    cur_time: 0,
                    is_fighting: 0,
                }
            return state
        case "heroAtk":
            if (state.is_fighting === 0)
            {
                tempAlert("战斗还未开始",1000);
                return state;
            }
            // 遍历活着的怪，或者活着的怪的索引，
            // let l = state.bossStatus
            // 随机选择一个怪，或者血最少的怪，或者血最多的怪，
            
            // 修改怪的血量，状态
            
            let tmpstatus = [];
            // aoe
            state.bossStatus.map(t=>{
                let damagepercent = 1
                damagepercent -= t.armor/ (t.armor + 50)
                let damage = parseInt(action.atkparam * damagepercent)
                let tmphp = t.curhp - damage;

                // 血量控制
                tmphp = Math.min(t.hp, tmphp);
                tmphp = Math.max(0, tmphp);
                let tmp = {...t}
                // console.log(tmp)
                tmp.curhp = tmphp
                tmpstatus.push(tmp);
                return true;
            })
            // console.log(tmpstatus)
            // 遍历数组是不是所有怪都死了 游戏结束
            return {
                ...state,
                bossStatus: tmpstatus
            };
        case "bossHeal":
            return state;
        case "initHero":
            let t = []
            let tstrip = []
            for (let i = 0; i < state.heroStatus.length; i ++)
            {
                t.push(state.heroStatus[i])
            }
            t[action.hero.heroindex - 1] = action.hero;
            for (let i = 0; i < t.length; i ++)
            {
                tstrip.push(0);
            }
            // 如果先发读条拉满
            // console.log(t);
            return {
                ...state,
                heroStatus: t,
                readingstrip: tstrip
            };
        case "deleteHero":
            // console.log(state);
            state.splice(action.index, 1);
            return state;
        case "bossAtk":
            return state;
        case "heroHeal":
            return state;
        default:
            return state;
      }
}

function tempAlert(msg,duration)
{
    let el = document.createElement("div");
    el.setAttribute("style","position:fixed;top:8%;right:8%;background-color:#FF6347;color:#FFE4B5;height:100px;width:300px;font-size:200%;text-align:center;line-height:100px;box-shadow:0px 0px 10px #FF7F50;border-radius: 15px 50px");
    el.innerHTML = msg;
    setTimeout(function(){
    el.parentNode.removeChild(el);
    },duration);
    document.body.appendChild(el);
}

export default reducer