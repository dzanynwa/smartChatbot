import {
  Button,
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import VideoRecorder from "react-video-recorder";
import interviewQuestions from "../data/interviewQuestions.json";
import ListRecords from "./ListRecords";
import axios from "axios";

const VideoModule = ({ userData }) => {
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [count, setCount] = useState(0);

  const addToList = (videoBlob) => {
    const active = activeQuestion;
    setActiveQuestion(null);
    const answeredQues = questions.find((que) => que.title === active);
    setAnsweredQuestions((old) => [...old, answeredQues]);
    setAnswers((old) => [...old, { title: active, video: videoBlob }]);
    setCount(count + 1);
  };
  const handlerDeleteEntry = (index) => {
    let newList = answers;
    const updatedAnswers = answeredQuestions.filter(
      (ans) => ans.title !== newList[index].title
    );
    setAnsweredQuestions(updatedAnswers);
    newList.splice(index, 1);
    setAnswers(newList);
    setCount(count - 1);
  };
  const getInfo = () => {
    const info = questions?.find((que) => que.title === activeQuestion);
    return info?.info;
  };
  useEffect(() => {
    setQuestions(interviewQuestions.questions);
  }, []);
  const blobToBase64 = async (blob) => {
    return await blob.arrayBuffer();
  };
  const onSubmit = async () => {
    const videos = answers.map((i) => {
      return blobToBase64(i.video);
    });
    const base64videos = await Promise.all(videos).then(function (results) {
      return results;
    });
    for (let i = 0; i < base64videos.length; i++) {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/userdata/getUploadURL?title=${userData.fullName}_${answers[i].title}`
        );
        const body = new Uint8Array(base64videos[i]);
        const ress = await axios.put(
          res.data,
          body,
          {
            headers: {
              "Content-Type": "video/webm",
            },
          }
        );
        console.log(new Blob(ress.data));
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        flexWrap="wrap"
        mt={5}
      >
        <Box flexDirection="column" width="50%" height="30vh">
          <VideoRecorder
            onRecordingComplete={(videoBlob) => {
              activeQuestion !== null && addToList(videoBlob);
            }}
          />
        </Box>
        <Box flexDirection="column" width="45%">
          <Typography style={{paddingRight: 60, marginBottom: 20}}>Please select a question before recording your answer. If you do not, the answer won't be saved!</Typography>
          <FormControl>
            <InputLabel id="demo-simple-select-helper-label">
              Question
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={activeQuestion}
              onChange={(data) => setActiveQuestion(data.target.value)}
            >
              {questions.map((question) => {
                return (
                  <MenuItem
                    disabled={answeredQuestions.find((que) => que === question)}
                    value={question.title}
                  >
                    {question.title}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText>Select a question to answer</FormHelperText>
            {activeQuestion && (
              <Box mt={2}>
                <Typography>
                  Explanation: <br />
                  {getInfo()}
                </Typography>
              </Box>
            )}
            <Box mt={5}>
              {count === 5 && (
                <Button onClick={onSubmit} variant="contained" color="primary">
                  Submit answers
                </Button>
              )}
            </Box>
          </FormControl>
        </Box>
      </Box>
      <ListRecords list={answers} deleteEntry={handlerDeleteEntry} />
    </Box>
  );
};

export default VideoModule;
