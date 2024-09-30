'use client'

import styles from './styles.module.css'
import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Feedback from '../feedback/Feedback'
import Logout from '../logout/Logout'
import logo from '@/assets/logo.png'
import fints from '@/assets/fints.png'
import Image from 'next/image'

const Header = ({showDropdown, setShowDropdown}) =>
{
    const [ feedbackForm, setFeedbackForm ] = useState(false);
    const [ active, setActive ] = useState(false);
    const router = useRouter();
    const { data, status } = useSession();
    const pathname = usePathname();

    useEffect(()=>
    {
        const nav = pathname.split('/')[1]
        if(nav === 'dashboard')
            setActive(true)

    },[])

    return(
        <div className={styles.container}>
            <Image src={pathname === '/' ? fints : logo} className={pathname === '/' ? styles.fints : styles.logo} onClick={()=> router.push('/')}/>
            {status === 'authenticated' ?
            <div className={styles.routes}>
                <p className={active ? `${styles.nav} ${styles.active}` : styles.nav} onClick={()=> router.push('/dashboard')}>Dashboard</p>
                <p className={styles.nav} onClick={()=> setFeedbackForm(true)}>Feedback</p>
                {pathname !== '/' && <p className={styles.user} onClick={(e)=> {e.stopPropagation(); setShowDropdown(!showDropdown)}}>{data.user.name.charAt(0)}</p> }
            </div> :
            (status === 'loading' ? <></> : <div className={styles.navigation}>
                {/* <button className={styles.route} onClick={()=> router.push('/login')}>Login</button>
                <button className={styles.route} onClick={()=> router.push('/signup')}>Sign up</button> */}
                <button className={styles.route} onClick={()=> router.push('/dashboard')}>Get Started</button>
                
            </div>)}
           {showDropdown && 
           <div className={styles.dropdown}>
                <p>{data.user.name}</p>
                <p>{data.user.email}</p>
                <Logout/>
            </div>}
            {feedbackForm && <div className={styles.feedback}>
                <Feedback setFeedbackForm={setFeedbackForm}/>
            </div>}
        </div>
    )
}

export default Header