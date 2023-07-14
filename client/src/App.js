import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import UserDetails from './components/UserDetails';

function App() {
    return (
        <BrowserRouter>
            <ToastContainer />
            <div className="heading-container">
                <h1 className='heading'>User Management System</h1>
            </div>
            <Routes>
                <Route path="/" element={<UserList />} />
                <Route path="/add" element={<UserForm />} />
                <Route path="/edit/:id" element={<UserForm />} />
                <Route path="/details/:id" element={<UserDetails />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
