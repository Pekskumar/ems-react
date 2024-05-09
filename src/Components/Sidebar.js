import React, { useEffect, useState } from "react";
import lofoimg from '../Assets/Images/logonew.png'
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarHeader,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import CalenderIcon from "../Assets/Images/CalenderIcon";
import DashboardIcon from "../Assets/Images/DashboardIcon";
import EventIcon from "../Assets/Images/EventIcon";
import LeftArrowIcon from "../Assets/Images/LeftArrowIcon";
import LogoIcon from "../Assets/Images/LogoIcon";
import RightArrowIcon from "../Assets/Images/RightArrowIcon";
import WorkflowIcon from "../Assets/Images/WorkflowIcon";
import { EventStoreSlice } from "../Redux-Toolkit/EventSlice";
import { eventList } from "../Services/Event-list";

const Sidebar = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("dashboard");

  const [menuCollapse, setMenuCollapse] = useState(false);
  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  const existingEvents = localStorage.getItem("EventStore");
  if (!existingEvents) {
    dispatch(EventStoreSlice(eventList));
  }

  useEffect(() => {
    if (window.location.href) {
      let temp = window.location.href.split("/");
      console.log(temp);
      setActiveTab(temp[temp?.length - 1]);
    }
  }, [activeTab]);

  return (
    <>
      <div id="header">
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div
              onClick={() => {
                navigate("/dashboard");

                setActiveTab("dashboard");

              }}
              className="main-logo d-flex     align-items-center     cursor-pointer"
            >
              <img height={50} src={lofoimg} />
              {/* <LogoIcon />
              {!menuCollapse && (
                <h5 className="m-0 ms-2">
                  <b>EMS</b>
                </h5>
              )} */}
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {menuCollapse ? <RightArrowIcon /> : <LeftArrowIcon />}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem
                className={activeTab === "dashboard" ? "active" : ""}
                icon={
                  <DashboardIcon
                    color={activeTab === "dashboard" ? "#008ce3" : "#333"}
                  />
                }
              >
                <NavLink
                  to={"/dashboard"}
                  onClick={() => {
                    setActiveTab("dashboard");
                  }}
                />
                {!menuCollapse && (
                  <div className="d-flex justify-content-between">
                    <div>Dashboard</div>
                  </div>
                )}
              </MenuItem>
              <MenuItem
                className={activeTab === "calender" ? "active" : ""}
                icon={
                  <CalenderIcon
                    color={activeTab === "calender" ? "#008ce3" : "#333"}
                  />
                }
              >
                <NavLink
                  to={"/calender"}
                  onClick={() => {
                    setActiveTab("calender");
                  }}
                />
                {!menuCollapse && (
                  <div className="d-flex justify-content-between">
                    <div>My Calendar</div>
                  </div>
                )}
              </MenuItem>
              <MenuItem
                className={activeTab === "events" ? "active" : ""}
                icon={
                  <EventIcon
                    color={activeTab === "events" ? "#008ce3" : "#333"}
                  />
                }
              >
                <NavLink
                  to={"/events"}
                  onClick={() => {
                    setActiveTab("events");
                  }}
                />
                {!menuCollapse && (
                  <div className="d-flex justify-content-between">
                    <div>Events</div>
                  </div>
                )}
              </MenuItem>
              <MenuItem
                className={activeTab === "workflows" ? "active" : ""}
                icon={
                  <WorkflowIcon
                    color={activeTab === "workflows" ? "#008ce3" : "#333"}
                  />
                }
              >
                <NavLink
                  to={"/workflows"}
                  onClick={() => {
                    setActiveTab("workflows");
                  }}
                />
                {!menuCollapse && (
                  <div className="d-flex justify-content-between">
                    <div>Workflows</div>
                  </div>
                )}
              </MenuItem>
            </Menu>
          </SidebarContent>
        </ProSidebar>
      </div>
    </>
  );
};

export default Sidebar;
