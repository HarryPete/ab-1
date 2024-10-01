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
    const [ isLoading, setIsLoading ] = useState(false);
    const [ reviewMocks, setReviewMocks ] = useState(null);
    const [ draftMocks, setDraftMocks ] = useState(null);
    const [ showDropdown, setShowDropdown ] = useState(false);

    const getUser = async () =>
    {
        try
        {
            setIsLoading(true)
            const url = `/api/user/${data.user.id}`
            const response = await axios.get(url);
            setUserData(response.data)
            const reviewMocks = response.data.mocks.filter((mock)=> mock.response.length)
            const draftMocks = response.data.mocks.filter((mock)=> !mock.response.length)
            setReviewMocks(reviewMocks);
            setDraftMocks(draftMocks);   
            setIsLoading(false)
        }
        catch(error)
        {
            enqueueSnackbar(error.message)
            setIsLoading(false)
        }
    }
    
    useEffect(() => 
    {
        const currentHour = new Date().getHours();

        if (currentHour < 12) 
            setGreeting('Good Morning');
        else if (currentHour < 16) 
            setGreeting('Good Afternoon');
        else 
            setGreeting('Good Evening');
    }, []);

    useEffect(()=>
    {
        status === 'authenticated' && getUser();
    },[status])

    return (
        <div className={styles.wrapper} onClick={()=> setShowDropdown(false)}>
            <Header setShowDropdown={setShowDropdown} showDropdown={showDropdown}/>
            {isLoading ? 
            <div className={styles.spinner}>
                <CircularProgress sx={{color:"rgb(255, 255, 255)"}}/>
            </div> :
            <div className={styles.container}>
                {userData && <p className={styles.greet}>{greeting}<span className={styles.user}> {userData.name.split(' ')[0]}</span></p>}
                <MockForm/>
                {draftMocks?.length ?
                <div className={styles.mockCards}>
                    <p className={styles.mockTitle}>Drafts</p>
                    <div className={styles.mocks}>
                    {userData.mocks.map((mock)=>
                    (
                        <MockCard mock={mock}/>
                    )).filter((mock)=> !mock.props.mock.response.length)}
                    </div>
                </div>: <></>}
                {reviewMocks?.length ?
                <div className={styles.mockCards}>
                    <p className={styles.mockTitle}>Review Mocks</p>
                    <div className={styles.mocks}>
                    {userData.mocks.map((mock)=>
                    (
                        <MockCard mock={mock}/>
                    )).filter((mock)=> mock.props.mock.response.length)}
                    </div>
                </div>: <></>}
            </div>}
        </div>
  );
}
