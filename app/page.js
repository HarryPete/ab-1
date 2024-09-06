'use client'

import Image from "next/image";
import Header from "./components/header/Header";
import styles from './styles.module.css'
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import heroImage from '@/assets/mockhub.jpg'

export default function Home() 
{
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
