import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    // IconButton,
} from "@mui/material";
import Logo from '../assets/images/Logo.jpg';


function Appnavbar(){
    const history = useNavigate();

  

    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <img
                    style={{ marginTop: 10,width: "40px", height: "40px"}}
                    src={Logo} 
                    alt="Logo"
                />
              <Typography variant="h6"  component="div" sx={{ flexGrow: 1 }}>
                Sportz Events
              </Typography>
              <div>
        </div>
            </Toolbar>
          </AppBar>
        </Box>
      );
}
export default Appnavbar;