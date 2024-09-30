
import Image from 'next/image'
import styles from './styles.module.css' 
import { signOut } from "next-auth/react"
import logout from '@/assets/logout.png'

const Logout = () => {
  return (
    <div>
        <Image src={logout} alt='mockhub' className={styles.logout} onClick={()=> signOut({callbackUrl: '/'})}/>
    </div>
  )
}

export default Logout