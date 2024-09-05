'use client'

import Image from "next/image";
import Header from "./components/header/Header";
import styles from './styles.module.css'
import MockForm from "./components/mockForm/MockForm";

export default function Home() {
    return (
        <div className={styles.wrapper}>
            <Header/>
            <div className={styles.container}>
                <MockForm/>
            </div>
        </div>
  );
}
