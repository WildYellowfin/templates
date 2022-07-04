import React, { useEffect, useState} from "react";
import MCQDisplay from "./templates/MCQDisplay"
import TextDisplay from "./templates/TextDisplay";

export default function App() {
	// Params are metadata for question
	// For example:
	// - URL for a PDF
	// - Text options for MCQ
	const [params, setParams] = useState({ans: [], url: ""});
	const [type, setType] = useState("")

	// Student input captures what has currently been "done"
	// For now this means text input or MCQ option
	const [studentInput, setStudentInput] = useState("");

	// Correctness state serves to inform the content window whether the student is correct or not.
	// Content window might display visual or concrete feedback based on correctness
	// Automated grading is not done in the content window to avoid source scraping (students finding solution in code)
	const [correctness, setCorrectness] = useState();
	function handleMessage(event) {
		if (event.data.PARAMS) {
			setParams(event.data.PARAMS);
			setCorrectness(event.data.CORRECTNESS);
			setStudentInput(event.data.INPUT);
			setType(event.data.TYPE)
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

	switch (type) {
		case "mcq":
			return (
				<MCQDisplay 
					params={params}
					studentInput={studentInput}
					correctness={correctness}
					handleChange={handleChange}
				/>
			)
		case "text":
			return (
				<TextDisplay
					params={params}
					studentInput={studentInput}
					correctness={correctness}
					handleChange={handleChange}
				/>
			)
		default:
			return <h1>Loading...</h1>
	}
}