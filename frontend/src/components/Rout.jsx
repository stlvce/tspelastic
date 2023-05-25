import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header/Header';
import HelpPage from './HelpPage/HelpPage';
import MainPage from './MainPage/MainPage';
import AdminPage from './AdminPage/AdminPage';
import { useCanvasStore } from '../services/state';
import { shallow } from 'zustand/shallow';
import Login from './Login';

const styleFlex = {
    display: "flex", 
    flexWrap: "wrap",
    justifyContent: "space-around",
    pt: "100px",
};

const Rout = () => {
    const state = useCanvasStore((state) => state, shallow);
    return (
        <Router>
            <Header />
            <Routes>
                <Route path='/' element={<MainPage styleFlex={styleFlex}/>} />
                <Route path='/help' element={<HelpPage styleFlex={styleFlex}/>} />
                <Route path='/admin' element={state.auth ? <AdminPage /> : <Login />} />
            </Routes>
        </Router>    
    )
}

export default Rout;