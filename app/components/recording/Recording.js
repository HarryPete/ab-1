'use client'

import { useState } from 'react';
import styles from './styles.module.css'
import webcam from '@/assets/webcam.png'
import Webcam from 'react-webcam';
import Image from 'next/image';
import useSpeechToText from 'react-hook-speech-to-text';

const Recording = () =>
{

    const { error, interimResult, isRecording, results,
        startSpeechToText, stopSpeechToText } = 
        useSpeechToText({ continuous: true, useLegacyResults: false });
    const [ showWebcam, setShowWebam ] = useState(false);

    return(
        <div className={styles.container}>
            <div className={styles.webWrapper}>
            {showWebcam ? 
                <Webcam onUserMedia={()=> setShowWebam(true)} onUserMediaError={()=> setShowWebam(false)} mirrored={true}/> : <Image className={styles.webcam} src={webcam} alt='webcam'/>}
            </div>

            <div className={styles.record}>
                <button className={styles.webButton} onClick={isRecording ? stopSpeechToText : startSpeechToText}>
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                </button>
                
                <button className={styles.webButton} 
                    onClick={()=> setShowWebam(!showWebcam)}>
                    {showWebcam ? 'Disable Webcam and microphone' : 'Enable Webcam and microphone'}
                </button>    

                <ul className={styles.answer}>
                {results.map((result) => (
                    <li key={result.timestamp}>{result.transcript}</li>
                ))}
                {interimResult && <li>{interimResult}</li>}
                </ul>
            </div>

        
        </div>
    )
}

export default Recording