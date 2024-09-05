"use client";

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import styles from './styles.module.css'
import { useState } from "react";

const MockForm = () =>
{

    const [ response, setResponse ] = useState("");
    const [ isLoading, setIsLoading ] = useState(false);

    async function runChat(prompt) 
    {
        const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

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
    setResponse((response.text()).replace('```json','').replace('```','').split('```')[0]);
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

    return(
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
    )
}

export default MockForm