import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header/Header';
import HelpPage from './HelpPage/HelpPage';
import MainPage from './MainPage/MainPage';
import AdminPage from './AdminPage/AdminPage';

const styleFlex = {
    display: "flex", 
    flexWrap: "wrap",
    justifyContent: "space-around",
    pt: "100px",
};

const Rout = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path='/' element={<MainPage styleFlex={styleFlex}/>} />
                <Route path='/help' element={<HelpPage styleFlex={styleFlex}/>} />
                <Route path='/admin' element={<AdminPage />} />
            </Routes>
        </Router>    
    )
}

export default Rout;