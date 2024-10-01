import { useSession } from 'next-auth/react'
import styles from './styles.module.css'
import Image from 'next/image';
import sound from '@/assets/sound.png'

const ReviewCard = ({query, result, index, activeIndex, setActiveIndex}) =>
{
    const {data} = useSession();
    const user = data?.user?.name;
    const formattedResponse = query.answer.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    return(
        <div className={styles.container}>
            <p className={styles.question}><strong>{query.question}</strong></p>
            <button className={styles.checkFeedback} onClick={()=> setActiveIndex(index)}>Expert Feedback</button>
            <p className={styles.rating}>{result[index].response.rating}/10</p>
            <span className={styles.subheader}>{user}'s Answer</span>
            <p className={styles.userAnswer}>{result[index].answer}</p>
            
            <span className={styles.subheader}>Improvised Answer</span>
            <p className={styles.answer}>    
            {formattedResponse}</p>
            {activeIndex === index &&
            <div className={styles.feed}>
                <p className={styles.aiFeedback}>{result[activeIndex].response.feedback}<span onClick={()=> setActiveIndex(-1)} className={styles.close}>X</span></p>
                
            </div>}
        </div>
    )
}

export default ReviewCard