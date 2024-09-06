import styles from  './styles.module.css'

const ColorCard = () =>
{

    return(
        <div className={styles.container}>
            <div className={styles.feedback}>
                <div className={styles.yellow}></div>
                <p className={styles.title}>Feedback</p>
            </div>
            <div className={styles.feedback}>
                <div className={styles.green}></div>
                <p className={styles.title}>Improvised Answer</p>
            </div>
        </div>
    )
}

export default ColorCard