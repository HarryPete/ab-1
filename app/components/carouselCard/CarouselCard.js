import { Rating } from '@mui/material'
import styles from './styles.module.css'

const CarouselCard = ({feedback}) =>
{
    return(
        <div className={styles.container}>
            <p className={styles.user}>{feedback.user.name}</p>
            <Rating className={styles.name} name="half-rating-read" defaultValue={feedback.rating} precision={1} readOnly />
            <p className={styles.feedback}>{feedback.feedback}</p>
        </div>
    )
}

export default CarouselCard