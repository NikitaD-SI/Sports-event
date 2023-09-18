import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { Logout, Settings } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import axios from 'axios';
import { FormControl, InputLabel, Select, Menu, MenuItem, Card, Modal, TextField, ListItemIcon, IconButton, Avatar, Tooltip } from '@mui/material';


const VISIBLE_FIELDS = ['id', 'venue', 'sport', 'date', 'RequestedBy', 'ApprovedBy'];


const AdminEvents = () => {
    const initialValues = {
        venue: "",
        sport: "",
        date: ""
    };

    const [values, setValues] = useState(initialValues);
    const [modal, setModal] = useState(false);
    const [allEvents, setAllEvents] = useState([]);
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    let user = window.localStorage.getItem("user");
    let token = window.localStorage.getItem("auth");
    let userValues = JSON.parse(user);

    useEffect(() => {
        try {
             axios.get(`http://localhost:4000/viewEvent`,{ headers: {"Authorization" : `Bearer ${token}`}}).then((res) => {
                if (res) {
                    setAllEvents([...res.data.data]);
                }

            })
        }
        catch (err) {
            console.log("Error ", err);
        }
    }, [])



    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`http://localhost:4000/createEvent`, { ...values },{ headers: {"Authorization" : `Bearer ${token}`}}).then((res) => {
                
                setAllEvents([...allEvents, res.data.data])
                setValues(initialValues);
                setModal(false);

            })
        }
        catch (err) {
            console.log("Error ", err);
        }

    }

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

    const handleApprove = async (row) => {
        
        const payload = {
            ...row,
            Approved: true,
            ApprovedBy: userValues?.username
        }
        try {
            await axios.put(`http://localhost:4000/updateEvent`, payload, { headers: {"Authorization" : `Bearer ${token}`}}).then((res) => {
                
                  setAllEvents([...allEvents, res.data.data])
            })
        }
        catch (err) {
            console.log("Error ", err);
        }

    }

    const column = [
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'venue', headerName: 'Venue', width: 150 },
        { field: 'sport', headerName: 'Sport', width: 150 },
        { field: 'date', headerName: 'Date', width: 150 },
        { field: 'RequestedBy', headerName: 'Requested BY', width: 150 },
        { field: 'ApprovedBy', headerName: ' Approved BY', width: 150 },
        { field: 'action', headerName: ' Action', width: 150 },
    ];

    const rows =
        allEvents && allEvents.map((row) => {
            return (
                {
                    id: row.id,
                    venue: row.venue,
                    sport: row.sport,
                    date: row.date,
                    RequestedBy: row.RequestedBy,
                    ApprovedBy: row.ApprovedBy,
                    action: row.ApprovedBy === "" && row.RequestedBy !== ""  ?
                        (
                            <>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => handleApprove(row)}
                                >
                                    Approve
                                </Button>
                            </>
                        ) : null
                }
            )
        }
        )

    const columns = React.useMemo(
        () =>
            column
                .filter((column) => VISIBLE_FIELDS.includes(column.field))
                .concat([
                    {
                        field: 'action',
                        headerName: 'Action',
                        width: 150,
                        sortable: false,
                        renderCell: (params) => params.row.action,
                    },
                ]),
        [column]
    );


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
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ margin: "3rem 0" }}>Creating Events</h2>
                <Button variant="outlined" onClick={() => setModal(true)}>Create Event</Button>
            </div><Box sx={{ height: 400, width: 1 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        filter: {
                            filterModel: {
                                items: [],
                                quickFilterValues: [''],
                            },
                        },
                    }}
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                        },
                    }} />
            </Box>
            <Modal open={modal}>
                <Card style={{ position: 'absolute', top: '50%', left: '50%', width: "600px", transform: 'translate(-50%, -50%)', padding: "25px" }}>
                    <form onSubmit={handleSubmit}>
                        <h2 >Create Event</h2>
                        <TextField
                            name="venue"
                            type="text"
                            label="Venue"
                            value={values.venue}
                            onChange={handleChange}
                            placeholder="Enter Venue"
                            style={{ width: "100%", marginBottom: "1rem" }}
                            required
                        />

                        <FormControl variant="outlined" fullWidth>
                            <InputLabel id="game">Game</InputLabel>
                            <Select
                                labelId="game"
                                name="sport"
                                value={values.sport}
                                label="Sport"
                                onChange={handleChange}
                                style={{ width: "100%", marginBottom: "1rem" }}
                                required
                            >
                                <MenuItem value="Cricket">Cricket</MenuItem>
                                <MenuItem value="Badminton">Badminton</MenuItem>
                                <MenuItem value="Hockey">Hockey</MenuItem>
                                <MenuItem value="Carrom">Carrom</MenuItem>
                                <MenuItem value="Table-Tennis">Table-Tennis</MenuItem>
                                <MenuItem value="Chess">Chess</MenuItem>
                                <MenuItem value="Boxing">Boxing</MenuItem>
                                <MenuItem value="Lawn-Tennis">Lawn-Tennis</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            name="date"
                            type="date"
                            value={values.date}
                            onChange={handleChange}
                            style={{ width: "100%", marginBottom: "1rem" }}
                            required

                        />

                        <div style={{ display: "flex", justifyContent: "end" }}>
                            <Button variant="contained" color="inherit" onClick={() => setModal(false)} style={{ marginRight: "1rem" }}>Close</Button>
                            <Button variant="contained" type="submit">Save</Button>
                        </div>

                    </form>
                </Card>
            </Modal>

        </>
    );
}

export default AdminEvents;
