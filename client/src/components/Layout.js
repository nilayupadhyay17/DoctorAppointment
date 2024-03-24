import { Badge, message } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/LayoutStyles.css";
import { adminMenu, userMenu } from "./../Data/data";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  // logout function
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  // Doctor menu
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];

  // Rendering menu list
  const SidebarMenu = user?.isAdmin
    ? adminMenu.filter((menu) => menu.name !== "Profile")
    : user?.isDoctor
    ? doctorMenu
    : userMenu.filter((menu) => menu.name !== "Profile");

  return (
    <div className="container">
      <div className="sidebar">
        <div className="logo">
          <h1>AppointDoc</h1>
        </div>
        <div className="menu">
          {SidebarMenu.map((menu) => {
            const isActive = location.pathname === menu.path;
            return (
              <div
                key={menu.name}
                className={`menu-item ${isActive && "active"}`}
              >
                <i className={menu.icon}></i>
                <Link to={menu.path}>{menu.name}</Link>
              </div>
            );
          })}
          <div className="menu-item" onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i>
            <Link to="/login">Logout</Link>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="header">
          <div className="user-info">
            <h2>Welcome, {user?.name}</h2>
            <Badge count={user && user.notification ? user.notification.length : 0}>
              <i className="fa-solid fa-bell"></i>
            </Badge>
          </div>
        </div>
        <div className="body">{children}</div>
      </div>
    </div>
  );
};

export default Layout;

