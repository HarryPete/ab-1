'use client'

import styles from './styles.module.css'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import Feedback from '../feedback/Feedback'

const Header = () =>
{
    const [ showDropdown, setShowDropdown ] = useState(false);
    const [ feedbackForm, setFeedbackForm ] = useState(false)
    const router = useRouter();
    const { data, status } = useSession();

    return(
        <div className={styles.container}>
            <p className={styles.title}><span className={styles.mock}>Mock</span> Hub</p>
            {status === 'authenticated' ?
            <div className={styles.routes}>
                <p className={styles.nav} >Dashboard</p>
                <p className={styles.nav} onClick={()=> setFeedbackForm(true)}>Feedback</p>
                <p className={styles.user} onClick={()=> setShowDropdown(!showDropdown)}>{showDropdown ? 'X' : data.user.name.charAt(0)}</p> 
            </div> :
            (status === 'loading' ? <></> : <div className={styles.navigation}>
                <button className={styles.route} onClick={()=> router.push('/login')}>Login</button>
                <button className={styles.route} onClick={()=> router.push('/signup')}>Sign up</button>
            </div>)}
           {showDropdown && 
           <div className={styles.dropdown}>
                <p>{data.user.name}</p>
                <p>{data.user.email}</p>
                <button className={styles.logout} onClick={()=> router.push('/logout')}>Logout</button>
            </div>}
            {feedbackForm && <div className={styles.feedback}>
                <Feedback setFeedbackForm={setFeedbackForm}/>
            </div>}
        </div>
    )
}

export default Header