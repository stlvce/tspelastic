import React from 'react';
import { 
    BrowserRouter as Router,
    Route, 
    Routes 
} from 'react-router-dom';
import Header from './Header/Header';
import HelpPage from './HelpPage/HelpPage';
import MainPage from './MainPage/MainPage';
import AdminPage from './AdminPage/AdminPage';

const Rout = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/help' element={<HelpPage />} />
                <Route path='/admin' element={<AdminPage />} />
            </Routes>
        </Router>    
    )
}

export default Rout;