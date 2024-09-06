'use client'

import axios from 'axios';
import styles from './styles.module.css'
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import Header from '@/app/components/header/Header';
import QuestionPill from '@/app/components/questionPill/QuestionPill';
import Recording from '@/app/components/recording/Recording';
import Image from 'next/image';
import sound from '@/assets/sound.png'
import StartMockDialogue from '@/app/components/startMockDialogue/StartMockDialogue';
import { CircularProgress } from '@mui/material';

const Mock = () =>
{

    const { mockId } = useParams();
    const [ mockData, setMockData ] = useState(null);
    const [ activeIndex, setActiveIndex ] = useState(0);
    const [ showInstructions, setShowInstructions ] = useState(false);

    const getMockData = async () =>
    {
        const url = `/api/mock/${mockId}`
        const response = await axios.get(url);
        setMockData(response.data)
    }

    useEffect(()=>
    {
        getMockData();
    },[])

    const handleTextToSpeech = () =>
    {
        if('speechSynthesis' in window)
        {
            const speech = new SpeechSynthesisUtterance(mockData.query[activeIndex].question);
            window.speechSynthesis.speak(speech)
        }
        else
            alert('Text to speech is not supported')

    }

    return(
        <div className={styles.wrapper}>
            <Header/>
            {mockData ? 
            <div className={styles.container}>
                <div className={styles.questions}>
                    <div className={styles.header}>
                        {/* <p>{activeIndex+1}/{mockData.query.length}</p> */}
                        <div className={styles.questionPills}>
                        {mockData.query.map((_, index)=>
                        (
                            <QuestionPill key={index} index={index} activeIndex={activeIndex}/>
                        ))}
                        </div>
                        <p className={styles.question}>{mockData.query[activeIndex].question}</p>
                        <Image className={styles.sound} src={sound} alt='sound' onClick={()=> handleTextToSpeech()}/>
                    </div>
                    <div className={styles.footer}>
                        <div className={styles.mockInfo}>
                            <p><strong>Role: </strong>{mockData.role}</p>
                            <p><strong>Description: </strong>{mockData.description}</p>
                            <p><strong>Experience: </strong>{mockData.experience} years</p>
                            <p><strong>Category: </strong>{mockData.type}</p>
                        </div>
                        <p className={styles.note}>
                            <strong>Note: </strong> This mock interview is designed to help you practice
                            with your webcam on. Feel free to turn off your camera at any time if you need to.
                        </p>
                    </div>
                </div>
                <div className={styles.responses}>
                    <Recording mockData={mockData} 
                    setActiveIndex={setActiveIndex} activeIndex={activeIndex}/>
                    <div></div>
                </div>
                <p className={styles.instructions} onClick={()=> setShowInstructions(true)}>Instructions</p>
                {showInstructions && <div className={styles.checkMedia}>
                    <StartMockDialogue setShowInstructions={setShowInstructions}/>
                </div>}
            </div> :
            <div className={styles.spinner}>
                <CircularProgress sx={{color:"rgb(0, 177, 94)"}}/>
            </div>}
        </div>
    )
} 

export default Mock