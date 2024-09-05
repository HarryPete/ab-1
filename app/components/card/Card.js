"use client";

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import styles from './styles.module.css'
import axios from "axios";
import { useState } from "react";

const MODEL_NAME = "gemini-1.0-pro";

export default function Card() 
{
  const [data, setData] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);

  async function runChat(prompt) 
  {
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: "user",
          parts: [{ text: "HELLO" }],
        },
        {
          role: "model",
          parts: [{ text: "Hello there! How can I assist you today?" }],
        },
      ],
    })

    
    setIsLoading(true)
    const result = await chat.sendMessage(prompt);
    const response = result.response;
    setData((response.text()).replace('```json','').replace('```','').split('```')[0]);
    setIsLoading(false)
  }

    const handleSubmit = async (e) =>
    {
        e.preventDefault()
        
        try
        {
            const formData = new FormData(e.currentTarget)
            const role = formData.get('role');
            const description = formData.get('description');
            const experience = formData.get('experience');
            const questions = formData.get('questions');
            const type = formData.get('type');
            
            prompt = `Preparing for my upcoming interview for the role ${role} with ${experience} years of experience, with the skillsets ${description}. Provide ${questions} ${type} questions and answers in array of objects`
            runChat(prompt)
        }
        catch(error)
        {
            console.log(error.message)
        }
    }

    console.log(data);

    return(
        <div className={styles.container}>
            {/* <div className={styles.content}>
                <p className={styles.about}><span className={styles.title}>Mock Hub </span>
                simulates real exams, helping you prepare effectively with personalized mock tests and detailed feedback</p>
            </div> */}
            
            <form onSubmit={handleSubmit} className={styles.form}>
                <TextField name='role' label='Job Role' placeholder='Ex.Frontend developer'/>
                <TextField name='description' label='Job Description' placeholder='Ex.HTML, CSS, Javascript, React'/>
                <TextField name='experience' label='Experience' placeholder='Ex.2'/>
                <FormControl fullWidth>
                <InputLabel>Type of questions</InputLabel>
                <Select name="type" label='Type of questions'>
                    <MenuItem value='Technical'>Technical</MenuItem>
                    <MenuItem value='Situational'>Situational</MenuItem>
                    <MenuItem value='Problem-solving'>Problem solving</MenuItem>
                    <MenuItem value='Career goals'>Career goals</MenuItem>
                    <MenuItem value='Leadership'>Leadership</MenuItem>
                    <MenuItem value='Career goals'>Salary expectation</MenuItem>
                </Select>
                </FormControl>
                <TextField name='questions' label='Numer of questions' placeholder='Ex.5'/>
                <div className={styles.controls}>
                    <button className={styles.cancel}>Clear</button>
                    <button className={styles.submit} type="submit">Submit</button>
                </div>
            </form>
            {isLoading && <CircularProgress sx={{color: 'blue'}}/>}
        </div>
    )
}