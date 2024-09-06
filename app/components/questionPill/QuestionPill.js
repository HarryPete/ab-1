import styles from './styles.module.css'

const QuestionPill = ({index, activeIndex, setActiveIndex}) =>
{

    return(
        <div className={index === activeIndex ? `${styles.container} ${styles.activePill}` : styles.container } onClick={()=> setActiveIndex(index)}>
            Q. {index+1}
        </div>
    )
} 

export default QuestionPill