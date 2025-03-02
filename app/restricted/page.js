import Image from 'next/image'
import styles from './styles.module.css'
import error from '@/assets/error-icon.png'

const Restricted = () =>
{

    return(
        <div className={styles.container}>
            <Image className={styles.error} src={error} alt='error'/>
            Access Denied
        </div>
    )
}

export default Restricted