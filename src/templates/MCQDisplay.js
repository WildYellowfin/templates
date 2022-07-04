import React from "react";
import { FormControl, FormLabel, FormControlLabel, RadioGroup, Radio, Typography, Stack } from "@mui/material";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import "../app.scss"

export default function MCQDisplay(props) {
    return (
    <div id="wrapper">
        <Stack direction="row" spacing={2} alignItems="stretch"  sx={{position: "relative", top: '30px'}}>
            <Document file={props.params.url}>
                <Page pageNumber={1}/>
            </Document>
            {!props.correctness 
                ? <FormControl>
                    <FormLabel>Answers</FormLabel>
                    <RadioGroup value={props.studentInput} onChange={props.handleChange}>
                        {props.params.ans.map((val) => 
                            <FormControlLabel 
                                key={val}
                                value={val} 
                                control={<Radio />} 
                                label={val} 
                            />)}
                    </RadioGroup>
                </FormControl>
                : <Typography>{props.correctness.feedback}</Typography>
            }
        </Stack>
    </div>)
}