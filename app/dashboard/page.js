'use client'

import Image from "next/image";
import styles from './styles.module.css'
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Header from "../components/header/Header";
import MockForm from "../components/mockForm/MockForm";
import MockCard from "../components/mockCard/MockCard";

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
            {userData && 
            <div className={styles.container}>
                <p className={styles.greet}>{greeting}<span className={styles.user}> {data.user.name.split(' ')[0]}</span></p>
                <MockForm/>
                <p className={styles.mockTitle}>Review Mocks</p>
                <div className={styles.mocks}>
                    {userData.mocks.map((mock)=>
                    (
                        <MockCard mock={mock}/>
                    ))}
                </div>
            </div>}
        </div>
  );
}
