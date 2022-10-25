import React, { Component } from 'react';
import Base from './base';
import $ from 'jquery';

class Login extends Component {
    state = {
        error_message : "",
        username: "",
        password: "",
        // inviteuser: ""
    }
    handleClick = e => {
        e.preventDefault();
        if (this.state.username === "") this.setState({ error_message: "请输入用户名" })
        
        else if (this.state.password === "") this.setState({ error_message: "请输入密码" })
        // else if (this.state.inviteuser === "") this.setState({ error_message: "请输入邀请人" })
        else{
            this.setState({ error_message: "" })
            $.ajax({
                url: "http://81.68.153.205:7500/user/login",
                type: "post",
                data: {
                    username: this.state.username,
                    password: this.state.password
                },
                dataType: "json",
                success: resp => {
                    if (resp.result === "success")
                        window.location.href="/";
                    else this.setState({error_message: resp.msg})
                }
            })
        }
    }

    render() {
        return (
            <Base>
                <h4>登录</h4>
                <div className='container'>
                    <div className='row justify-content-md-center'>
                        <div className='col col-sm-3'>
                            <form>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">用户名</label>
                                <input onChange={e=>{this.setState({username: e.target.value})}} type="text" className="form-control" id="username"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">密码</label>
                                <input onChange={e=>{this.setState({password: e.target.value})}} type="password" className="form-control" id="password"/>
                            </div>
                            {/* <div className="mb-3">
                                <label htmlFor="inviteuser" className="form-label">邀请用户</label>
                                <input onChange={e=>{this.setState({inviteuser: e.target.value})}} type="text" className="form-control" id="inviteuser"/>
                            </div> */}
                            <div style={{height: "2rem", color:"red"} }>{this.state.error_message}</div>
                            <button onClick={e=>{this.handleClick(e)}} style={{width: "100%"}} type = "submit" className='btn btn-primary'>登录</button>
                            </form>
                        </div>
                    </div>
                </div>
            </Base>);
    }
}

export default Login;