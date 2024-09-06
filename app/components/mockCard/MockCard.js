import { FormatDate } from '@/utils/FormatDate'
import styles from './styles.module.css'
import mockTest from  '@/assets/mock.png' 
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const MockCard = ({mock}) =>
{
    const router = useRouter();

    return(
        <div className={styles.container}>
            <div className={styles.mockWrapper}>
                <Image className={styles.mockIcon} src={mockTest} alt='mock'/>
                <p className={styles.type}>{mock.type}</p>
            </div>
            <p className={styles.mock}><strong>Role</strong> / {mock.role}</p>
            <p className={styles.mock}><strong>Description</strong> / {mock.description}</p>
            <p className={styles.mock}>{mock.query.length} questions</p>
            <div className={styles.footer}>
                <p className={styles.date}>{FormatDate(mock.createdAt)}</p>
                <div className={styles.nav}>
                    <button className={styles.review} onClick={()=> router.push(`/mock/${mock._id}`)}>{mock.response.length ? 'Retake' : 'Start'}</button>
                    {mock.response.length > 0 && <button className={styles.review} onClick={()=> router.push(`/review/${mock._id}`)}>Review</button>}
                </div>
            </div>
        </div>
    )
}

export default MockCard