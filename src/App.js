import React, {useCallback, useEffect, useState} from "react";
import Card from '@mui/material/Card';
import {
  Paper,
  styled
} from "@mui/material";
import "./app.scss"

function MCQ() {
  // Params are metadata for question
  // For example:
  // - URL for a PDF
  // - Text options for MCQ
  const [params, setParams] = useState({});

  // Student input captures what has currently been "done"
  // For now this means text input or MCQ option
  const [studentInput, setStudentInput] = useState("A");

  // Correctness state serves to inform the content window whether the student is correct or not.
  // Content window might display visual or concrete feedback based on correctness
  // Automated grading is not done in the content window to avoid source scraping (students finding solution in code)
  const [correctness, setCorrectness] = useState();

  function handleMessage(event) {
    setParams({...event.data.PARAMS});
    setCorrectness({...event.data.CORRECTNESS});

    // If the message includes student state
    if (event.data.INPUT) {
      setStudentInput(event.data.INPUT);
    }
    return
  }

  function handleChange(event) {
    setStudentInput(event.target.value);
  }

  useEffect(() => {
    window.top.postMessage({"INPUT": studentInput}, "*");
  }, [studentInput]);

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    window.top.postMessage("request", "*");
    return () =>
        window.removeEventListener("message", handleMessage);
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
      <div id="wrapper">
        <div id="prompt"></div>
        <div id="option1"></div>
        <div id="option1"></div>
        <div id="option1"></div>
        <div id="option1"></div>
      </div>
  )
}

export default MCQ;