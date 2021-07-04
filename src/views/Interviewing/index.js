import { Box, Typography } from '@material-ui/core';
import React from 'react';
import axios from 'axios'
import { useLocation } from 'react-router';
import bg from './bg3.svg'
import VideoModule from '../../components/VideoModule'

const Interviewing = () => {
    const location = useLocation()
    const userData = {
       position: new URLSearchParams(location.search).get("position"),
       fullName: new URLSearchParams(location.search).get("fullName"),
       gender: new URLSearchParams(location.search).get("gender"),
       address: new URLSearchParams(location.search).get("address"),
       email: new URLSearchParams(location.search).get("email"),
       phone: new URLSearchParams(location.search).get("phoneNumber"),
       dateOfBirth: new URLSearchParams(location.search).get("dateOfBirth")
    }
    const styles={
        backgroundColor: "#ffffff",
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",
        backgroundSize: 'contain',
    }
    const uploadInitialData = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/v1/userdata', {...userData})
            console.log(res)
        } catch (error) {
            console.warn(error)
        }
    }
    React.useEffect(() => {
        userData.fullName && uploadInitialData()
    }, [])

    return (
        <Box minHeight="126vh" p="5% 10% 5% 10%" maxWidth="100%" style={styles}>
            <Typography variant="h5">
                Hello {userData.fullName}
            </Typography>
            <Typography variant="h2">
                Interviewing phase
            </Typography>
            <VideoModule userData={userData} />
        </Box>
    );
}

export default Interviewing;
