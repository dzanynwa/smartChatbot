import React from "react";
import axios from "axios";
import bg from "../Interviewing/bg3.svg";
import { Box, Typography, Grid } from "@material-ui/core";
import { ChevronRight } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import interviewQuestions from "../../data/interviewQuestions.json";

const DataOverview = () => {
  const [userData, setUserData] = React.useState([]);
  const [activeData, setActiveData] = React.useState({});
  React.useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/userdata")
      .then((res) => setUserData(res?.data?.userDataList));
  }, []);
  const styles = {
    backgroundColor: "#ffffff",
    backgroundImage: `url(${bg})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top left",
    backgroundSize: "contain",
  };
  const [vid, setVid] = React.useState([]);
  const onSelectItem = async (item) => {
    setActiveData(item);
    interviewQuestions.questions.map(async (i) => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/userdata/getURL?title=${item.fullName}_${i.title}`
        );
        const ress = await axios.get(res.data, {
          headers: {
            "Content-Type": "video/webm",
          },
        });
        const byteCharacters = btoa(unescape(encodeURIComponent(ress.data)));
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "video/webm" });
        // console.log(blob);
        console.log(ress)
        setVid(old => [...old, ress.config.url]);
      } catch (error) {
        console.log(error);
      }
    });
  };
  return (
    <Box minHeight="126vh" p="5% 10% 5% 10%" maxWidth="100%" style={styles}>
      <Typography variant="h2">Candidate Overview</Typography>
      <Box
        mt="3%"
        bgcolor="white"
        borderRadius="30px"
        boxShadow={3}
        width="100%"
      >
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Box p="5%">
              <Autocomplete
                id="combo-box-demo"
                options={userData}
                getOptionLabel={(option) => option.fullName}
                style={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search by name"
                    variant="outlined"
                  />
                )}
              />
              {userData?.map((item) => {
                return (
                  <Box
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        item === activeData ? "#f5f5f5" : "white",
                    }}
                    onClick={() => onSelectItem(item)}
                    p="5%"
                    pb="5%"
                    backgroundColor={item === activeData ? "red" : "white"}
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                  >
                    <Typography color="primary">{item.fullName}</Typography>
                    <ChevronRight />
                  </Box>
                );
              })}
            </Box>
          </Grid>
          <Grid item xs={7}>
            {!activeData && (
              <Typography variant="h5">
                Select a candidate to see more information
              </Typography>
            )}
            {activeData && (
              <Box p="2% 5%">
                <Typography variant="h2">{activeData.fullName}</Typography>
                <Box
                  width="15%"
                  height="5px"
                  mb="10px"
                  style={{ backgroundColor: "#1262fb" }}
                />
                <Typography variant="h5">
                  <Typography
                    variant="h5"
                    style={{ fontWeight: 600, marginTop: 10 }}
                  >
                    Gender:
                  </Typography>
                  {activeData.gender}
                </Typography>
                <Typography variant="h5">
                  <Typography
                    variant="h5"
                    style={{ fontWeight: 600, marginTop: 10 }}
                  >
                    Date of Birth:
                  </Typography>{" "}
                  {activeData.dateOfBirth}
                </Typography>
                <Typography variant="h5">
                  <Typography
                    variant="h5"
                    style={{ fontWeight: 600, marginTop: 10 }}
                  >
                    Email:
                  </Typography>
                  {activeData.email}
                </Typography>
                <Typography variant="h5">
                  <Typography
                    variant="h5"
                    style={{ fontWeight: 600, marginTop: 10 }}
                  >
                    Phone number:{" "}
                  </Typography>{" "}
                  {activeData.phone}
                </Typography>
                <Typography variant="h5">
                  <Typography
                    variant="h5"
                    style={{ fontWeight: 600, marginTop: 10 }}
                  >
                    Address:
                  </Typography>
                  {activeData.address}
                </Typography>
                <Typography variant="h5">
                  <Typography
                    variant="h5"
                    style={{ fontWeight: 600, marginTop: 10 }}
                  >
                    Position:
                  </Typography>
                  {activeData.position}
                </Typography>
                <Typography variant="h5">
                  <Typography
                    variant="h5"
                    style={{ fontWeight: 600, marginTop: 10 }}
                  >
                    Skill Test Link:
                  </Typography>
                  <a href={activeData.skillTestLink} target="_blank">
                    {activeData.skillTestLink}
                  </a>
                </Typography>
                {vid.length > 0 && vid.map((i) => {return <video preload="auto" controls src={i} style={{ width: '100%' }} />})}
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DataOverview;
