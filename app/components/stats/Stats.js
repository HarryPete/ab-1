'use client'

import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import axios from 'axios'
import { Rating } from '@mui/material'

const Stats = () =>
{
    const [ users, setUsers ] = useState(null)
    const [ mocks, setMocks ] = useState(null)
    const [ feedbacks, setFeedbacks ] = useState(null)
    const [ rating, setRating ] = useState(null)

    const getUsers = async () =>
    {
        const url = '/api/user'
        const response = await axios.get(url)
        setUsers(response.data)
    }

    const getMocks = async () =>
    {
        const url = '/api/mock'
        const response = await axios.get(url)
        setMocks(response.data)
    }

    // const getFeedbacks = async () =>
    // {
    //     const url = '/api/feedback'
    //     const response = await axios.get(url)
    //     const rating  = response?.data?.reduce((acc, value)=> acc + value.rating, 0);
    //     setFeedbacks(response.data)
    //     setRating(rating)
    // }

    useEffect(()=>
    {
        getUsers();
        getMocks();
        // getFeedbacks();
    },[])

    return(
        <div className={styles.wrapper}>
           
            <div className={styles.container}>
                {users &&  
                <div className={styles.column}>
                    <span className={styles.title}>Active Users</span>
                    <p className={styles.count}>{users.length}</p>
                </div>}
                {mocks &&  <div className={styles.column}>
                    <span className={styles.title}>Mocks Generated</span>
                    <p className={styles.count}>{mocks.length}</p>
                </div>}
            </div>
        </div>
    )
}

export default Stats 