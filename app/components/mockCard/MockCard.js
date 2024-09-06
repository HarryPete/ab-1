import { FormatDate } from '@/utils/FormatDate'
import styles from './styles.module.css'
import mockTest from  '@/assets/mock.png' 
import Image from 'next/image'

const MockCard = ({mock}) =>
{

    return(
        <div className={styles.container}>
            <div  className={styles.mockWrapper}>
                <Image className={styles.mockIcon} src={mockTest} alt='mock'/>
            </div>
            <p className={styles.mock}><strong>Role</strong> / {mock.role}</p>
            <p className={styles.mock}><strong>Description</strong> / {mock.description}</p>
            <p className={styles.mock}>{mock.query.length} questions</p>
            <div className={styles.footer}>
                <p className={styles.date}>{FormatDate(mock.createdAt)}</p>
                <div className={styles.nav}>
                    <button className={styles.review}>Retake</button>
                    <button className={styles.review}>Review</button>
                </div>
            </div>
        </div>
    )
}

export default MockCard