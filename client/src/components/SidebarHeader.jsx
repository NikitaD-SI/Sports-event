import React from 'react';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import WorkspacesRoundedIcon from '@mui/icons-material/WorkspacesRounded';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Logo from '../assets/images/Logo.jpg';
import styled from "@emotion/styled";
import { Link } from 'react-router-dom';

const StyledSidebarHeader = styled.div`
  height: 64px;
  min-height: 64px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  > div {
    width: 100%;
    overflow: hidden;
  }
`;

const SidebarHeader = ({collapse, setCollapse}) => {

    const collapseClick = () => {
         setCollapse(!collapse);
      };

  return (
    <StyledSidebarHeader
      className="d-flex justify-content-center align-items-center py-4"
    >
      <div style={{ display: "flex", alignItems: "center" }} onClick={collapseClick}>

          <img 
            src={Logo}
            alt="Logo"
            style={{ width: "30px", height: "30px"}}
          />
         
        &nbsp;&nbsp;
        {!collapse && (
          <span>
            <div className="sidebar-link" style={{fontSize: "24px", fontWeight: "bold"}} >
              Sports Events
            </div>{" "}
          </span>
        )}
        <hr />
        <div className="close-menu-icon" onClick={collapseClick}>
          {collapse ? (
            <ArrowCircleRightRoundedIcon style={{color: "black"}} />
          ) : (
            <ArrowCircleLeftRoundedIcon style={{color: "black"}} />
          )}
        </div>
        </div>
    </StyledSidebarHeader>
  )
}

export default SidebarHeader;