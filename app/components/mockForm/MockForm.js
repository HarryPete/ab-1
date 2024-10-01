"use client";

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import styles from './styles.module.css'
import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { Input } from "@/components/ui/input"
import { Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue, } from "@/components/ui/select";
import { toast } from "sonner";
import { CircularProgress } from "@mui/material";

const MockForm = () =>
{
    const [ isLoading, setIsLoading ] = useState(false);
    const [ role, setRole] = useState('')
    const [ description, setDescription] = useState('')
    const [ experience, setExperience] = useState('')
    const [ type, setType ] = useState('')
    const [ questions, setQuestions ] = useState('')
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
      const response = await axios.post(url, {role, description, experience, type, assessment: queries});
      toast.success(response.data.message);
      router.push(`/dashboard/mock/${response.data.mock._id}`)
    }
    catch(error)
    {
      throw error;
    }
  }

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        console.log(role, description,experience, type, questions)

        if(!role || !description || !experience || !type || !questions)
        {
          toast.error('All the fields are required')
          return 
        }

        if(questions<2 )
        {
          toast.error('Minimum of 2 questions are required to generate mock interview')
          return 
        }

        setIsLoading(true);
        try
        {            
          prompt = `Preparing for my upcoming interview for the role ${role} with ${experience} 
          years of experience, with the skillsets ${description}. Provide ${questions} ${type} 
          questions and answers in short 4-5 lines in JSON format with fields question and answer`
          runChat(prompt)
        }
        catch(error)
        {
          toast.error('Failed to generate mock. Try Again!');
          setIsLoading(false);
        }
    }

    return(
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.group}>
              <p className={styles.label}>Role</p>
              <Input className={styles.input} type="text" placeholder="Ex. Compliance analyst" name='role' value={role} onChange={(e)=> setRole(e.target.value)}/>
            </div>
            <div className={styles.group}>
              <p className={styles.label}>Skills</p>
              <Input className={styles.input} type="text" placeholder='Ex. Investigating transactions, Periodic reviews, SAR/STR filing' name='description' value={description} onChange={(e)=> setDescription(e.target.value)}/>
            </div>
            <div className={styles.group}>
              <p className={styles.label}>Experience in years</p>
              <Input className={styles.input} type="text" name='experience' value={experience} onChange={(e)=> setExperience(e.target.value)}/>
            </div>
            <div className={styles.group}>
              <p className={styles.label}>Type of question</p>
              <Select className={styles.input} name="type" onValueChange={(value)=> setType(value)}>
              <SelectTrigger className={styles.input}>
                <SelectValue placeholder='Choose' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Technical'>Technical</SelectItem>
                <SelectItem value='Situational'>Situational</SelectItem>
                <SelectItem value='Problem-Solving'>Problem solving</SelectItem>
                <SelectItem value='Career goals'>Career goals</SelectItem>
                <SelectItem value='Leadership'>Leadership</SelectItem>
                <SelectItem value='Salary expectation'>Salary expectation</SelectItem>
              </SelectContent>
              </Select>
            </div>
            <div className={styles.group}>
              <p className={styles.label}>No. of questions</p>
              <Input className={styles.input} type="text" name='role' value={questions} onChange={(e)=> setQuestions(e.target.value)}/>
            </div>
            <div className={styles.controls}>
              <button className={styles.submit} type="submit">Create mock</button>
              {isLoading && 
              <div className={styles.spinner}>
                <CircularProgress sx={{color: 'white'}}/>
                <p className={styles.message}>Creating Personalised Mock Interview</p>
            </div>}
            </div>
        </form>
    )
}

export default MockForm