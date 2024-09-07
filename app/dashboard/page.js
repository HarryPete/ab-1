'use client'

import Image from "next/image";
import styles from './styles.module.css'
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Header from "../components/header/Header";
import MockForm from "../components/mockForm/MockForm";
import MockCard from "../components/mockCard/MockCard";
import { CircularProgress } from "@mui/material";
import { enqueueSnackbar } from "notistack";

export default function Home() 
{
    const [ userData, setUserData ] = useState(null);
    const [ greeting, setGreeting] = useState('');
    const { data, status } = useSession();
    const [ isLoading, setIsLoading ] = useState(true);

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
            enqueueSnackbar(error.message)
        }
        setIsLoading(false)
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
            {isLoading ? 
            <div className={styles.container}>
                <p className={styles.greet}>{greeting}<span className={styles.user}> {data.user.name.split(' ')[0]}</span></p>
                <MockForm/>
                {userData && 
                <div className={styles.mockCards}>
                    <p className={styles.mockTitle}>Drafts</p>
                    <div className={styles.mocks}>
                    {userData.mocks.map((mock)=>
                    (
                        <MockCard mock={mock}/>
                    )).filter((mock)=> !mock.props.mock.response.length)}
                    </div>

                    <p className={styles.mockTitle}>Review Mocks</p>
                    <div className={styles.mocks}>
                    {userData.mocks.map((mock)=>
                    (
                        <MockCard mock={mock}/>
                    )).filter((mock)=> mock.props.mock.response.length)}
                    </div>
                </div>}
            </div> :
            <div className={styles.spinner}>
                <CircularProgress sx={{color:"rgb(0, 177, 94)"}}/>
            </div>}
        </div>
  );
}
