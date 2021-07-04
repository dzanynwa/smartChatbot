/* eslint-disable react/jsx-no-target-blank */
import { Box, Typography, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import skillTest from "../../data/skillTest.json";
import bg from "../Interviewing/bg3.svg";
import { Button } from '@material-ui/core';
import axios from 'axios';

const SkillTest = () => {
  const location = useLocation();
  const [selectedTest, setSelectedTest] = useState(null);
  const [skillTestLink, setSkillTestLink] = useState(null);
  const fullName = new URLSearchParams(location.search).get("fullName");
  useEffect(() => {
    const query = new URLSearchParams(location.search).get("position");
    const job = skillTest.positions.find(
      (position) => position.identifier === query
    );
    setSelectedTest(job?.tests[Math.floor(Math.random() * job.tests.length)]);
    console.log(selectedTest);
  }, []);
  const onSubmit = async () => {
      try {
        const res = await axios.put('http://localhost:5000/api/v1/userdata', { fullName, skillTestLink })
        alert("You have successfully submited your solution for the skill test! You can now return to chatbot.")
      } catch (error) {
        console.log(error)
      }
  }
  const styles = {
    backgroundColor: "#ffffff",
    backgroundImage: `url(${bg})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top left",
  };
  return (
    <Box minHeight="126vh" p="5% 10% 5% 10%" maxWidth="100%" style={styles}>
      {!selectedTest && (
        <Typography variant="h2">Position has not been specified.</Typography>
      )}
      {selectedTest && (
        <Box p="5%" borderRadius="30px" boxShadow={3}>
          <Typography variant="h4" style={{ marginBottom: 10 }}>
            Description:{" "}
          </Typography>

          <Typography variant="h5">{selectedTest.testDescription}</Typography>

          <Typography variant="h4" style={{ marginBottom: 10, marginTop: 10 }}>
            UI Link:{" "}
          </Typography>

          <a
            href={selectedTest.gitRepo}
            target="_blank"
            style={{ fontSize: 16 }}
          >
            <Typography variant="h5">{selectedTest.testUILink}</Typography>
          </a>

          <Typography variant="h4" style={{ marginBottom: 10, marginTop: 10 }}>
            Useful Links:{" "}
          </Typography>
          {selectedTest.testHelperLinks.map((link) => {
            return (
              <Box mb={2} mt={2}>
                <Typography variant="h5">{link.title}</Typography>
                <a
                  href={selectedTest.gitRepo}
                  target="_blank"
                  style={{ fontSize: 16 }}
                >
                  <Typography variant="h5"> {link.url}</Typography>
                </a>
              </Box>
            );
          })}

          <Typography variant="h4" style={{ marginBottom: 10, marginTop: 10 }}>
            Git Link:{" "}
          </Typography>

          <a
            href={selectedTest.gitRepo}
            target="_blank"
            style={{ fontSize: 16 }}
          >
            <Typography variant="h5"> {selectedTest.gitRepo} </Typography>
          </a>

          <Typography variant="h4" style={{ marginBottom: 10, marginTop: 10 }}>
            Time Limit:{" "}
          </Typography>

          <Typography variant="h5">
            {(selectedTest.timeLimit / 60).toFixed(1)} Hours (
            {selectedTest.timeLimit} minutes)
          </Typography>
          <Typography variant="h4" style={{ marginBottom: 10, marginTop: 10 }}>
            Link to your solution:
          </Typography>
          <TextField onChange={(e) => setSkillTestLink(e.target.value)} label="Your answer" variant="outlined" />
          <Button onClick={onSubmit} style={{marginLeft: 10, height: 55}} variant="contained" block color="primary">Submit answer</Button>
        </Box>
      )}
    </Box>
  );
};

export default SkillTest;
