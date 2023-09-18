/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import Appnavbar from './Appnavbar';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [selectedSport, setSelectedSport] = useState('Cricket');
  const [sportsDataList, setSportsDataList] = useState([]);
  let token = window.localStorage.getItem("auth");
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>{
    try {
       axios.get(`http://localhost:4000/viewEquip`, { headers: {"Authorization" : `Bearer ${token}`}}).then((res) => {
          console.log(...res.data.data);
          if (res) {
            setSportsDataList([...res.data.data]);
          }

      })
  }
  catch (err) {
      console.log("Error ", err);
  }
  },[])

  const handleQuantityChange = (itemName, operation) => {
    setSportsDataList((prevData) => {
      const updatedData = [...prevData];
      const sportIndex = updatedData.findIndex((sport) => sport.sport === selectedSport);
      const itemIndex = updatedData[sportIndex].Equipname.findIndex((item) => item.item === itemName);

      if (operation === 'increment') {
        updatedData[sportIndex].Equipname[itemIndex].quantity += 1;
      } else if (operation === 'decrement' && updatedData[sportIndex].Equipname[itemIndex].quantity > 0) {
        updatedData[sportIndex].Equipname[itemIndex].quantity -= 1;
      }

      return updatedData;
    });
  };

  const handleSportChange = (event) => {
    setSelectedSport(event.target.value);
  };

  const handleSubmit = () => {
    console.log('Submitted Data:', sportsDataList);
  };

  const sportdata = sportsDataList.find((sport) => sport.sport === selectedSport);


  const handleUpdateEquipment = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/updateEquip/${selectedSport}`, sportsDataList, {
        headers: {"Authorization" : `Bearer ${token}`},
        
      });
  
      if (response.status === 200) {
        toast.success('Equipment updated successfully.');
        console.log('Submitted Data:', sportsDataList);
        navigate('/admin-events');
      } else {
        toast.error('Equipment update failed.');
      }
    } catch (error) {
      console.error('Error updating equipment:', error);
    }
  };


  return (
    <>
      <Appnavbar />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card style={{ width: '400px', boxShadow: 'none' }}>
          <h2 style={{ textAlign: 'center' }}>Select Sport</h2>

          <FormControl variant="outlined" fullWidth>
            <InputLabel id="game">Game</InputLabel>
            <Select
              labelId="game"
              value={selectedSport}
              label="Sport"
              onChange={handleSportChange}
              style={{ marginBottom: '1rem' }}
              fullWidth
            >
              {sportsDataList.map((sport) => (
                <MenuItem key={sport.sport} value={sport.sport}>
                  {sport.sport}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Card>
      </div>
      <br />

      {sportdata && (
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
    </>
  );
}

export default Home;
