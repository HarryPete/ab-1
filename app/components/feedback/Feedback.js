'use client'

import { Rating, TextField } from '@mui/material';
import styles from './Feedback.module.css'
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const Feedback = ({setFeedbackForm}) =>
{
    const [ value, setValue ] = useState(null)
    const [ feedback, setFeedback ] = useState('');
    const [ isPay, setIsPay ] = useState('');
    const { data } = useSession();

    const handleSubmit = async (e) =>
    {
        if(!value || !feedback || !isPay)
            return toast.error('All fields are required');

        e.preventDefault();
        try
        {
            const url = `/api/feedback/${data.user.id}`
            const response = await axios.post(url, {rating: value, feedback, isPay});
            toast.success(response.data.message);
            setFeedback('');
            setFeedbackForm(false);
        }
        catch(error)
        {
            toast.error(error.message);
        }
    }    

    console.log(isPay)

    return(
        <div className={styles.container}>
            <p className={styles.description}>
                We value your feedback to help us improve our offerings 
                and provide the best possible experience for you.
            </p>
            <Rating name="simple-controlled" sx={{'& .MuiRating-iconEmpty': { color: 'rgb(75,75,75)'}}} value={value} onChange={(event, newValue) => {setValue(newValue)}} size="large"/>
            <Textarea className={styles.feedback} placeholder='Feedback' fullWidth onChange={(e)=> setFeedback(e.target.value)}/>
            <Select className={styles.pay} name="type" onValueChange={(value)=> setIsPay(value)}>
              <SelectTrigger className={styles.pay}>
                <SelectValue placeholder='Would you pay for such service?'/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Yes'>Yes</SelectItem>
                <SelectItem value='No'>No</SelectItem>
              </SelectContent>
              </Select>
            <button className={styles.submit} onClick={handleSubmit}>Submit</button>
            <p className={styles.close} onClick={()=> setFeedbackForm(false)}>X</p>
        </div>
    )
}

export default Feedback