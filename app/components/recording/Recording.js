'use client'

import { useEffect, useState } from 'react';
import styles from './styles.module.css'
import webcam from '@/assets/webcam.png'
import Webcam from 'react-webcam';
import Image from 'next/image';
import useSpeechToText from 'react-hook-speech-to-text';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { useDispatch, useSelector } from 'react-redux';
import { addResponse } from '@/store/slices/mockReducer';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import { CircularProgress } from '@mui/material';
import { toast } from 'sonner';

const Recording = ({setActiveIndex, activeIndex, mockData}) =>
{

    const { error, interimResult, isRecording, results, setResults,
        startSpeechToText, stopSpeechToText } = 
        useSpeechToText({ continuous: true, useLegacyResults: false });
    const [ showWebcam, setShowWebam ] = useState(false);
    const [ answer, setAnswer ] = useState(null);
    const disptach = useDispatch();
    const responses = useSelector((state)=> state.mockResponse.result);
    const [ isLoading, setIsLoading ] = useState(false);
    const {mockId} = useParams();
    const router = useRouter();

    useEffect(()=>
    {
        {results && results.map((result)=>
        {
            setAnswer(result.transcript)
        })}

    },[results])

    console.log(responses);

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
    const startIndex = query.indexOf("{");
    const endIndex = query.lastIndexOf("}") + 1; 
    const response = JSON.parse(query.slice(startIndex, endIndex));
    
    if(activeIndex+1 < mockData.assessment.length)
    {
        disptach(addResponse({response, answer}));
        setIsLoading(false)
        setActiveIndex((prev)=> prev+1)
        setResults([]);
        setAnswer(null);
    }     
    else
    {
        setIsLoading(true)
        const feedback = [...responses, {response, answer}]
        try
        {
            const url = `/api/mock/${mockId}`
            const response = await axios.put(url, {result: feedback});
            setIsLoading(false)
            toast.success(response.data.message);
            router.push(`/dashboard/review/${mockId}`)
        }
        catch(error)
        {
            toast.error(error.message)
            setIsLoading(false)
        }
        
    }
    }

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        stopSpeechToText();
        if(!answer)
            return toast.error('Answer cannot be empty') 
        
        try
        {      
            setIsLoading(true)      
            prompt = `For the given interview question ${mockData.assessment[activeIndex].question} rate this answer ${answer} on scale of 10
            and feedback in 3-4 lines, return in JSON with fields rating and feedback`
            runChat(prompt);
        }
        catch(error)
        {
            toast.error(error.message)
        }
    }

    return(
        <div className={styles.container}>
            <div className={styles.webWrapper}>
            {showWebcam ? 
                <Webcam className={styles.cam} onUserMedia={()=> setShowWebam(true)} onUserMediaError={()=> setShowWebam(false)} mirrored={true} height={100} width={100}/> : <Image className={styles.webcam} src={webcam} alt='webcam'/>}
                <button className={styles.webcamButton} 
                    onClick={()=> setShowWebam(!showWebcam)}>
                    {showWebcam ? 'Disable Webcam' : 'Enable Webcam'}
                </button> 
            </div>

            <div className={styles.record}>

                {answer && 
                <button className={styles.webButton} onClick={()=> {stopSpeechToText(); setResults([]); setAnswer(null);}}>
                    Clear Answer
                </button>}

                <button className={styles.webButton} onClick={isRecording ? stopSpeechToText : startSpeechToText}>
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                </button>
 
                {answer && <button className={styles.webButton} onClick={handleSubmit}>{activeIndex+1 === mockData.assessment.length ? 'Finish' : 'Submit'}</button>}
            </div>

            {isLoading && 
            <div className={styles.spinner}>
                <CircularProgress sx={{color:"white"}}/>
                <p className={styles.message}>{activeIndex+1 === mockData.assessment.length ? 'Generating Detailed Review' : 'Analyzing'}</p>
            </div>}

            <ul className={styles.answer}>
                {results?.map((result) => (
                    <li key={result.timestamp}>{result?.transcript}</li>
                ))}
                {interimResult && <li>{interimResult}</li>}
            </ul>
        </div>
    )
}

export default Recording