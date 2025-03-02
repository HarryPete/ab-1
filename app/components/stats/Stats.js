'use client'

import { useEffect, useState } from 'react';
import styles from './styles.module.css'

const Counter = ({ value, type }) => 
{
    const [count, setCount] = useState(0);
    
    useEffect(() => 
    {
        let start = 0;
        const end = parseInt(value);
        if (start === end) return;
    
        const incrementTime = Math.floor(2000 / end);
        const timer = setInterval(() => {
          start += 1;
          setCount(start);
          if (start === end) clearInterval(timer);
        }, incrementTime);
    
        return () => clearInterval(timer);
    }, [value]);
    
    return <span className="">{count +(type === 'percent' ? '%' : '+')}</span>;
};

const Stats = () =>
{
    

    return(
        <div className={styles.wrapper}>
           
            <div className={styles.container}>
                <div className={styles.column}>
                    <span className={styles.title}>Mocks Generated</span>
                    <p className={styles.count}><Counter value={250} /></p>
                </div>
            </div>
        </div>
    )
}

export default Stats 