import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { toast } from "react-toastify";
import { Logout, Settings } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import axios from 'axios';
import { Menu, MenuItem, Button, Card, Modal, ListItemIcon, IconButton, Avatar, Tooltip, CardContent, Typography, Grid } from '@mui/material';


const VISIBLE_FIELDS = ['id', 'venue', 'sport', 'date'];


const EmployeeEvents = () => {

    const initialValues = {
        venue: "",
        sport: "",
        date: ""
    };
    const [sendData, setSendData] = useState({})
    const [selectedSportData, setSelectedSportData] = useState('Cricket')
    const [value, setValue] = useState(dayjs('2022-04-17T15:30'));
    const [endTime, setEndTime] = useState(dayjs('2022-04-17T15:30'));
    const [bookingMsg, setbookingMsg] = useState('')
    const [sportsDataList, setSportsDataList] = useState([]);
    const [allEvents, setAllEvents] = useState([]);
    const [modal, setModal] = useState(false);
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    let user = window.localStorage.getItem("user");
    let userValues = JSON.parse(user);
    let token = window.localStorage.getItem("auth");

    const sports =
    {
        "Table-Tennis": "90 minutes",
        "Carrom": "45 minutes",
        "Chess": "90 minutes",
        "Cricket": "180 minutes",
        "Hockey": "150 minutes",
        "Boxing": "150 minutes",
        "Lawn-Tennis": "180 minutes",
        "Badminton": "90 minutes",
        "Basketball": "150 minutes"
    }
    useEffect(() => {
        try {
            axios.get(`http://localhost:4000/viewEvent`, { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
                if (res) {
                    setAllEvents([...res.data.data]);
                }

            })
        }
        catch (err) {
        }
    }, [])

    useEffect(() => {
        try {
            axios.get(`http://localhost:4000/viewEquip`, { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
                if (res) {
                    setSportsDataList(res.data.data);
                }

            })
        }
        catch (err) {
            console.log("Error ", err);
        }
    }, [])

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

    const handleRequest = (row) => {
        setbookingMsg(`For ${row.sport}  Please select the Starting Time from the Time you have selected you have ${sports[row.sport]}`)
        setSendData({
            ...row
        })
        setSelectedSportData(row.sport)
        setModal(true)
    }

    function dateToTimerString(date) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        return `${hours}:${minutes}:${seconds}`;
    }

    const handleQuantityChange = (itemName, operation) => {
        setSportsDataList((prevData) => {
            const updatedData = [...prevData];
            const sportIndex = updatedData.findIndex((sport) => sport.sport === selectedSportData);
            const itemIndex = updatedData[sportIndex].Equipname.findIndex((item) => item.item === itemName);

            if (operation === 'increment') {
                updatedData[sportIndex].Equipname[itemIndex].quantity += 1;
            } else if (operation === 'decrement' && updatedData[sportIndex].Equipname[itemIndex].quantity > 0) {
                updatedData[sportIndex].Equipname[itemIndex].quantity -= 1;
            }

            return updatedData;
        });
    };
    const handleUpdateEquipment = async () => {
        try {
            const response = await axios.put(`http://localhost:4000/updateEquip/${selectedSportData}`, sportsDataList, {
                headers: { "Authorization": `Bearer ${token}` },

            });

            if (response.status === 200) {
                console.log('Equipment updated successfully.');
                console.log('Submitted Data:', sportsDataList);
            } else {
                console.error('Equipment update failed.');
            }
        } catch (error) {
            console.error('Error updating equipment:', error);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const date1 = value.toDate();
        const date2 = endTime.toDate();
        const timeDifference = date2 - date1;
        const minutesDifference = timeDifference / (1000 * 60);
        const payload = {
            ...sendData,
            Requested: true,
            startTime: dateToTimerString(date1),
            endTime: dateToTimerString(date2),
            RequestedBy: userValues?.username,
            ApprovedBy: '',
            Approved: false
        }
        if (minutesDifference < Number(sports[sendData.sport].split(" ")[0])) {
            try {
                await axios.put(`http://localhost:4000/updateEvent`, payload, { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {

                    setModal(false)
                })
            }
            catch (err) {
                console.log("Error ", err);
            }
        }
        else {
            toast.error("Your Time is greater than allocated time");
        }
    }
    const column = [
        { field: 'id', headerName: 'ID', width: 250 },
        { field: 'venue', headerName: 'Venue', width: 250 },
        { field: 'sport', headerName: 'Sport', width: 250 },
        { field: 'date', headerName: 'Date', width: 250 },
        { field: 'action', headerName: ' Action', width: 150 },
    ];

    const sportdata = sportsDataList.find((sport) => sport.sport === selectedSportData);

    const rows =
        allEvents && allEvents.map((row) => {
            return (
                {
                    id: row.id,
                    venue: row.venue,
                    sport: row.sport,
                    date: row.date,
                    ApprovedBy: row.ApprovedBy,
                    action:
                        (
                            <>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => handleRequest(row)}
                                >
                                    Request
                                </Button>
                            </>
                        )
                }
            )
        }
        )

    const columns = React.useMemo(
        () => column.filter((column) => VISIBLE_FIELDS.includes(column.field))
            .concat([
                {
                    field: 'action',
                    headerName: 'Action',
                    width: 250,
                    sortable: false,
                    renderCell: (params) => params.row.action,
                },
            ]),
        [column],
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

            <h2 style={{ margin: "3rem 0" }}>All Events</h2>

            <Box sx={{ height: 400, width: 1 }}>
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
                <>
                    <Card style={{ position: 'absolute', top: '50%', left: '50%', width: "600px", transform: 'translate(-50%, -50%)', padding: "25px" }}>
                        <form onSubmit={handleSubmit}>
                            <h2 >Please Select CheckIn Time</h2>
                            <p>{bookingMsg}</p>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker', 'TimePicker']}>
                                    <TimePicker
                                        label="Start Time"
                                        value={value}
                                        onChange={(newValue) => setValue(newValue)}
                                    />
                                    <TimePicker
                                        label="End Time"
                                        value={endTime}
                                        onChange={(newValue) => setEndTime(newValue)}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>


                            <div style={{ display: "flex", justifyContent: "end" }}>
                                <Button variant="contained" color="inherit" onClick={() => setModal(false)} style={{ marginRight: "1rem" }}>Close</Button>
                                <Button variant="contained" type="submit">Save</Button>
                            </div>

                        </form>
                    </Card>
                    <Card style={{ width: '400px', boxShadow: 'none' }}>
                        {sportdata != undefined && (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                                    <Card style={{ width: '400px' }}>
                                        <CardContent>
                                            <Typography variant="h5" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                                {sportdata.sport} Equipment
                                            </Typography>
                                            <Grid container spacing={2}>
                                                {sportdata.Equipname.map((item) => (
                                                    <Grid item xs={12} key={item.item}>
                                                        <Grid container justifyContent="space-between" alignItems="center">
                                                            <Grid item xs={6}>
                                                                {item.item}:
                                                            </Grid>
                                                            <Grid item xs={6} style={{ textAlign: 'right' }}>
                                                                <Button variant="contained" onClick={() => handleQuantityChange(item.item, 'decrement')}>
                                                                    -
                                                                </Button>
                                                                <span style={{ margin: '0 0.5rem' }}>{item.quantity || 0}</span>
                                                                <Button variant="contained" onClick={() => handleQuantityChange(item.item, 'increment')}>
                                                                    +
                                                                </Button>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                                    <Button variant="contained" color="primary" onClick={handleUpdateEquipment} style={{ marginTop: '1rem' }}>
                                        Submit
                                    </Button>
                                </div>
                            </>
                        )}
                    </Card>
                </>
            </Modal>

        </>
    );
}

export default EmployeeEvents;
