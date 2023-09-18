import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import SideBar from './components/SideBar';
import AdminEvents from './components/AdminEvents';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmployeeEvents from './components/EmployeeEvents';
import Profile from './components/Profile';
import Role from "./components/Role";


function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={1000} />
      {/* <div style={{ display: "flex" }}>
          <SideBar />
          <div style={{ width: "100vw" }}>
            <Routes>
              <Route path="/approval-pending" element={<Admin />} />
              <Route path="/admin-events" element={<AdminEvents />} />
            </Routes>
          </div>
        </div>
      </div> */}

      <div className="App">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/role" element={<Role />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/admin-events" element={<AdminEvents />} />
          <Route path="/" exact={true} element={<Navigate to="/registration" />} />
          <Route path="/user-profile" element={
            <div style={{ display: "flex" }}>
              <SideBar />
              <div style={{ width: "100vw" }}>
                <Profile />
              </div>
            </div>} />
          <Route path="/employee-events" element={
            <>
              <div style={{ display: "flex" }}>
                <SideBar />
                <div style={{ width: "100vw" }}>
                  <EmployeeEvents />
                </div>
              </div>
            </>
          } />

          <Route
            path="/admin"
            element={
              <>
                <div style={{ display: "flex" }}>
                  <SideBar />
                  <div style={{ width: "100vw" }}>
                    <AdminEvents />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/employee"
            element={
              <>
                <div style={{ display: "flex" }}>
                  <SideBar />
                  <div style={{ width: "100vw" }}>
                    <EmployeeEvents />
                  </div>
                </div>
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
