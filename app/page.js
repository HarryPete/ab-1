'use client'

import Image from "next/image";
import Header from "./components/header/Header";
import styles from './styles.module.css'
import heroImage from '@/assets/mockhub.jpg'
import Footer from "./components/footer/Footer";
import Stats from "./components/stats/Stats";
import { useRouter } from "next/navigation";

export default function Home() 
{
    const router =  useRouter();

    return (
        <div className={styles.wrapper}>
            <Header/>
            <div>
                <Image className={styles.mockhub} src={heroImage} alt='MoockHub' priority={true}/>
                <div className={styles.content}>
                    <p className={styles.header}>Get Interview Ready <span className={styles.active}>Anytime</span></p>
                    <Stats/>
                    <button className={styles.route} onClick={()=> router.push('/dashboard')}>Get Started</button>
                </div>   
            </div>
            <Footer/>
        </div>
  );
}
