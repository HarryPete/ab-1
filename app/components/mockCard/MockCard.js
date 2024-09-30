import { FormatDate } from '@/utils/FormatDate'
import styles from './styles.module.css'
import mockTest from  '@/assets/mock.png' 
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Button from '../button/Button'

const MockCard = ({mock}) =>
{
    const router = useRouter();

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <p className={styles.mock}><strong>Role</strong> / {mock.role}</p>
                <p className={styles.mock}><strong>Skills</strong> / {mock.description}</p>
                <p className={styles.mock}>{mock.query.length} questions</p>
            </div>
            <p className={styles.type}>{mock.type}</p>
            <div className={styles.footer}>
                <p className={styles.date}>{FormatDate(mock.createdAt).split(',')[0]}</p>
                <div className={styles.nav}>
                    <Button text={mock.response.length ? 'Retake' : 'Start'} route={`/dashboard/mock/${mock._id}`}/>
                    {mock.response.length > 0 && <Button text='Review' route={`/dashboard/review/${mock._id}`}/>}
                </div>
            </div>
        </div>
    )
}

export default MockCard