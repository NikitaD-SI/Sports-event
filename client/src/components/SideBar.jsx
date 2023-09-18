
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sidebar, Menu, SubMenu } from "react-pro-sidebar";
import ApiIcon from '@mui/icons-material/Api';
import AddBoxIcon from '@mui/icons-material/AddBox';

import SidebarHeader from './SidebarHeader';
import "./style.css";

const SideBar = () => {
    const [collapse, setCollapse] = useState(false);
    const navigate = useNavigate()
    return (
        <>
            <Sidebar style={{ height: "100vh" }} collapsed={collapse}>
                <SidebarHeader
                    collapse={collapse}
                    setCollapse={setCollapse}
                />
                <Menu>
                    <SubMenu
                        label="Requested Events"
                        icon={<ApiIcon />}
                    />
                    <SubMenu 
                        label="Events"
                        icon={<AddBoxIcon />}
                    />
                      
                </Menu>
            </Sidebar>
            
             
        </>
    )
}

export default SideBar;