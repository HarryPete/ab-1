import { Rating, TextField } from '@mui/material';
import styles from './Feedback.module.css'
import { useState } from 'react';

const Feedback = ({setFeedbackForm}) =>
{
    const [ value, setValue ] = useState(null)

    return(
        <div className={styles.container}>
            <h1 className={styles.title}>Feedback</h1>
            <p className={styles.description}>
                We value your feedback to help us improve our offerings 
                and provide the best possible experience for you.
            </p>
            <Rating name="simple-controlled" value={value} onChange={(event, newValue) => {setValue(newValue)}} size="large"/>
            <TextField className={styles.feedback} label='Feedback' fullWidth/>
            <button className={styles.submit}>Submit</button>
            <p className={styles.close} onClick={()=> setFeedbackForm(false)}>X</p>
        </div>
    )
}

export default Feedback