import React from "react";
import { Typography, TextField, Grid } from "@mui/material";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import "../app.scss"

export default function TextDisplay(props) {
    return (
    <div id="wrapper">
        <Grid container>
            <Grid item xs={8}>
            <Document file={props.params.url}>
                <Page pageNumber={1} scale={1}/>
            </Document>
            </Grid>
            <Grid item xs={4}>
                {!props.correctness 
                ? <TextField label="Answer" variant="outlined" size="small" 
                        onChange={props.handleChange}
                        value={props.studentInput} 
                        sx={{top: '30px', left: "10px"}}
                    />
                : <Typography sx={{top: '30px', left: "10px"}}>{props.correctness.feedback}</Typography>
                }
            </Grid>
        </Grid>
    </div>)
}