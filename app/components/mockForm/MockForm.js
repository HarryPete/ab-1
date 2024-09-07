"use client";

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import styles from './styles.module.css'
import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";

const MockForm = () =>
{

    const [ isLoading, setIsLoading ] = useState(false);
    const [ role, setRole] = useState('')
    const [ description, setDescription] = useState('')
    const [ experience, setExperience] = useState('')
    const [ type, setType ] = useState('')
    const [ questions, setQuestions ] = useState('')
    const [ error, setError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('') 
    const { data } = useSession()
    const router = useRouter();

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

    const result = await chat.sendMessage(prompt);
    const query = result.response.text();
    const startIndex = query.indexOf("[");
    const endIndex = query.lastIndexOf("]") + 1; 
    const queries = JSON.parse(query.slice(startIndex, endIndex));
   
    try
    {
      const url = `/api/mock/create/${data.user.id}`
      const response = await axios.post(url, {role, description, experience, type, query: queries});
      enqueueSnackbar(response.data.message);
      router.push(`/mock/${response.data.mock._id}`)
    }
    catch(error)
    {
      console.log(error);
    }
    setIsLoading(false);
  }

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        if(!role || !description || !experience || !type || !questions)
        {
          setErrorMessage('All the fields are required*')
          return setError(true)
        }

        if(questions<2 )
        {
          setErrorMessage('Atleast 2 questions are required to generate mock interview')
          return setError(true)
        }

        setError(false)
        setErrorMessage('')
        setIsLoading(true);
        
        try
        {            
          prompt = `Preparing for my upcoming interview for the role ${role} with ${experience} 
          years of experience, with the skillsets ${description}. Provide ${questions} ${type} 
          questions and answers in JSON format with fields question and answer`
          runChat(prompt)
        }
        catch(error)
        {
          enqueueSnackbar(error.message);
          setIsLoading(false);
        }
    }

    return(
        <form onSubmit={handleSubmit} className={styles.form}>
            <TextField name='role' value={role} onChange={(e)=> setRole(e.target.value)} label='Job Role' placeholder='Ex.Frontend developer'/>
            <TextField name='description' value={description} onChange={(e)=> setDescription(e.target.value)} label='Job Description' placeholder='Ex.HTML, CSS, Javascript, React'/>
            <TextField name='experience' value={experience} onChange={(e)=> setExperience(e.target.value)} label='Experience' placeholder='Ex.2'/>
            <FormControl fullWidth>
                <InputLabel>Type of questions</InputLabel>
                <Select name="type" label='Type of questions' value={type} onChange={(e)=> setType(e.target.value)}>
                    <MenuItem value='Technical'>Technical</MenuItem>
                    <MenuItem value='Situational'>Situational</MenuItem>
                    <MenuItem value='Problem-Solving'>Problem solving</MenuItem>
                    <MenuItem value='Career goals'>Career goals</MenuItem>
                    <MenuItem value='Leadership'>Leadership</MenuItem>
                    <MenuItem value='Career goals'>Salary expectation</MenuItem>
                </Select>
            </FormControl>
            <TextField name='questions' value={questions} onChange={(e)=> setQuestions(e.target.value)} label='Numer of questions' placeholder='Minimum 2 questions'/>
            {error && <p className={styles.error}>{errorMessage}</p>}
            <div className={styles.controls}>
              <button className={styles.submit} type="submit">Create mock</button>
              {isLoading && 
              <div className={styles.spinner}>
                <CircularProgress sx={{color:"rgb(0, 177, 94)"}}/>
                <p className={styles.message}>Creating Personalised Mock Interview</p>
            </div>}
            </div>
        </form>
    )
}

export default MockForm