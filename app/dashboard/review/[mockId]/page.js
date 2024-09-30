'use client'

import axios from 'axios';
import styles from './styles.module.css'
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import Header from '@/app/components/header/Header';
import Image from 'next/image';
import ReviewCard from '@/app/components/reviewCard/ReviewCard';
import { FormatDate } from '@/utils/FormatDate';
import ColorCard from '@/app/components/colorCard/ColorCard';
import { CircularProgress } from '@mui/material';

const Review = () =>
{

    const { mockId } = useParams();
    const [ mockData, setMockData ] = useState(null);
    // const [ activeIndex, setActiveIndex ] = useState(0);

    const getMockData = async () =>
    {
        const url = `/api/mock/${mockId}`
        const response = await axios.get(url);
        setMockData(response.data)
    }

    useEffect(()=>
    {
        getMockData();
    },[])

    return(
        <div className={styles.wrapper}>
            <Header/>
            {mockData ? 
            <div className={styles.container}>
                <div className={styles.info}>
                    <div className={styles.mockInfo}>
                        <p><strong>Role: </strong>{mockData.role}</p>
                        <p><strong>Description: </strong>{mockData.description}</p>
                        <p><strong>Experience: </strong>{mockData.experience} years</p>
                        <p><strong>Category: </strong>{mockData.type}</p>                 
                    </div>
                    {/* <ColorCard/> */}
                </div>
                <div className={styles.review}>
                <p className={styles.date}>{FormatDate(mockData.updatedAt)}</p> 
                {mockData.query.map((question,index)=>
                (
                    <ReviewCard query={question} response={mockData.response} index={index} />
                ))}
                </div>
                {/* <div className={styles.footer}>
                        
                </div> */}
            </div>:
            <div className={styles.spinner}>
                <CircularProgress sx={{color:"rgb(255, 255, 255)"}}/>
            </div>}   
        </div>
    )
} 

export default Review