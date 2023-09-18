import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { Logout, Settings } from '@mui/icons-material';
import {Menu, MenuItem, Card,  ListItemIcon, IconButton, Avatar, Tooltip } from '@mui/material';

const Profile = () => {

    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    let user = window.localStorage.getItem("user");
    let userValues = JSON.parse(user);
    

    const handleLogout = () => {
        window.localStorage.removeItem("auth");
        window.localStorage.removeItem("user");
        navigate('/login');
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };
    return (
        <>
          <div style={{ display: "flex", justifyContent: "end" }}>
                <Tooltip title={userValues?.username}>
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}

                    >
                        <Avatar sx={{ color: "black" }}>{userValues?.username.length > 0 ? userValues?.username[0] : ""}</Avatar>
                    </IconButton>
                </Tooltip>

                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => navigate('/user-profile')}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        View Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <AccountCircleIcon style={{ width: "140px", height: "140px" }} />
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
                <Card style={{ padding: "25px", width: "400px" }}>
                    <div>
                        <h4>Name:- {userValues?.username}</h4>
                        <h4>Email:- {userValues?.email}</h4>
                        <h4>Role:- {userValues?.role}</h4>
                    </div>
                </Card>
            </div>
            



        </>
    )
}

export default Profile