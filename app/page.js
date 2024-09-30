'use client'

import Image from "next/image";
import Header from "./components/header/Header";
import styles from './styles.module.css'
import heroImage from '@/assets/mockhub.jpg'
import Footer from "./components/footer/Footer";
import Stats from "./components/stats/Stats";
import { useRouter } from "next/navigation";
import Globe from "@/components/ui/globe";
// import Globe from "@/components/magicui/globe";

export default function Home() 
{
    const router =  useRouter();

    return (
        <div className={styles.wrapper}>
            <Header/>
            <div>
                <div className={styles.globeWrapper}>
                    <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">MockHub</span>
                    <Globe className={styles.globe}/>
                    <div className="pointer-events-none inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
                </div>
                <div className={styles.content}>
                    {/* <p className={styles.header}>Get Interview Ready <span className={styles.active}>Anytime</span></p> */}
                    <Stats/>
                    {/* <button className={styles.route} onClick={()=> router.push('/dashboard')}>Get Started</button> */}
                </div>   
            </div>
            {/* <Footer/> */}
        </div>
  );
}
