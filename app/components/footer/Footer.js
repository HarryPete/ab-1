import Image from 'next/image'
import styles  from './styles.module.css'
import email from '@/assets/email.png'

const Footer = () =>
{
    return(
        <div className={styles.container}>
            <p className={styles.title}><span className={styles.mock}>Mock</span> Hub</p>
            <div className={styles.emailWrapper}>
                <Image className={styles.emailIcon} src={email} alt='email'/>
                <p className={styles.email}>abhishekmagadum7@gmail.com</p>
            </div>
        </div>
    )
}

export default Footer