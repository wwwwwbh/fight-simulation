import React, { Component } from 'react';
import NavBar from './Navbar';
import Home from './content/Home';
import Notfound from './content/notfound';
import Fight from './content/fight';
import Calculator from './content/calculator';
import Login from './content/login';
import Register from './content/register';
import { Routes, Route, Navigate } from 'react-router-dom';

class App extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <div className='container'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/fight" element={<Fight />} />
                        <Route path="/calculator" element={<Calculator />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/404" element={<Notfound />} />
                        <Route path="/*" element={<Navigate replace to="/404" />} />
                    </Routes>
                </div>
            </React.Fragment>
        );
    }
}

export default App;

// 将多个Route包含在Routes里