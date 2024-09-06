'use client'

import Image from "next/image";
import Header from "./components/header/Header";
import styles from './styles.module.css'
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import heroImage from '@/assets/mockhub.jpg'

export default function Home() 
{
    const [ userData, setUserData ] = useState(null);
    const [ greeting, setGreeting] = useState('');
    const { data, status } = useSession();

    const getUser = async () =>
    {
        try
        {
            const url = `/api/user/${data.user.id}`
            const response = await axios.get(url);
            setUserData(response.data)
        }
        catch(error)
        {
            console.log(error)
        }
    }

    useEffect(() => 
    {
        const currentHour = new Date().getHours();

        if (currentHour < 12) 
            setGreeting('Good morning');
        else if (currentHour < 18) 
            setGreeting('Good afternoon');
        else 
            setGreeting('Good evening');
    }, []);

    useEffect(()=>
    {
        status === 'authenticated' && getUser();
    },[status])

    return (
        <div className={styles.wrapper}>
            <Header/>
            <div>
                <Image className={styles.mockhub} src={heroImage} alt='mockhub'/>
                <p className={styles.header}>Get Interview Ready <span className={styles.active}>Anytime</span></p>
                
            </div>
        </div>
  );
}
