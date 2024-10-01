'use client'

import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import axios from 'axios'
import NumberTicker from '@/components/ui/number-ticker'

const Stats = () =>
{
    // const [ users, setUsers ] = useState(null)
    // const [ mocks, setMocks ] = useState(null)

    // const getUsers = async () =>
    // {
    //     const url = '/api/user'
    //     const response = await axios.get(url)
    //     setUsers(response.data)
    // }

    // const getMocks = async () =>
    // {
    //     const url = '/api/mock'
    //     const response = await axios.get(url)
    //     setMocks(response.data)
    // }

    // useEffect(()=>
    // {
    //     getUsers();
    //     getMocks();
    // },[])

    return(
        <div className={styles.wrapper}>
           
            <div className={styles.container}>
                <div className={styles.column}>
                    <span className={styles.title}>Mocks Generated</span>
                    <p className={styles.count}><NumberTicker value={150}/>+</p>
                </div>
            </div>
        </div>
    )
}

export default Stats 