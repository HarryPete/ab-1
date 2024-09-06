import { useEffect, useState } from 'react';
import styles from './styles.module.css'
import useSpeechToText from 'react-hook-speech-to-text';
import Webcam from 'react-webcam';
import webcam from '@/assets/webcam.png'
import Image from 'next/image';
import successIcon from '@/assets/success-icon.png'

const StartMockDialogue = () =>
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
                
                
                <button className={styles.webButton} 
                    onClick={()=> setShowWebam(!showWebcam)}>
                    {showWebcam ? 'Disable Webcam' : 'Test Webcam'}
                </button> 
                <button className={styles.webButton} onClick={isRecording ? stopSpeechToText : startSpeechToText}>
                    {isRecording ? (interimResult ? 'Testing' : <Image className={styles.success} src={successIcon} alt='success'/>) : 'Test Microphone'}
                </button> 
            </div>

            <p className={styles.note}>
                <strong>Note: </strong> This mock interview is designed to help you practice
                with your webcam on. Feel free to turn off your camera at any time if you need to.
            </p>
        </div>
        )
}

export default StartMockDialogue