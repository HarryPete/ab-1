import Image from 'next/image'
import styles from './styles.module.css'
import google from '@/assets/google.png'
import { googleLogin } from '@/app/action'

const GoogleAuth = () =>
{
    return(
        <div className={styles.container} onClick={()=> googleLogin()}> 
            <Image className={styles.googleIcon} src={google} alt='google' />
            <button className={styles.title}>Sign in with Google</button>
        </div>
    )
}

export default GoogleAuth