import styles from './styles.module.css'

const StartMockDialogue = ({setShowInstructions}) =>
{

    return(
        <div className={styles.container}>
            
            <div className={styles.instructions}>
                <p className={styles.instruction}>1. Click on the volume icon to listen to the question</p>
                <p className={styles.instruction}>2. Before you begin answering, click on <strong>Start Recording</strong></p>
                <p className={styles.instruction}>3. Once you finish answering, click on <strong>Stop Recording</strong> and then click on <strong>Submit</strong></p>
                <p className={styles.instruction}>4. Click on <strong>Clear Answer</strong> to record your answer again</p>
                <p className={styles.instruction}>5. Once you <strong>Finish</strong> you can review your performance from your dashboard</p>
            </div>

            <button className={styles.webButton}  onClick={()=> setShowInstructions(false)}>Resume Mock</button>
        </div>
        )
}

export default StartMockDialogue