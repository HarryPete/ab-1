import styles from './styles.module.css'

const ReviewCard = ({query, response, index}) =>
{

    return(
        <div className={styles.container}>
            <p className={styles.question}><strong>{query.question}</strong></p>
            <p className={styles.rating}>{response[index].rating}/10</p>
            <p className={styles.feedback}>{response[index].feedback}</p>
            
            <span className={styles.subheader}>Improvised Answer</span>
            <p className={styles.answer}>    
            {query.answer}</p>
        </div>
    )
}

export default ReviewCard