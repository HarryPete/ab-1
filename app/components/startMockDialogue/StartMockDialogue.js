import MediaQualityCheck from '@/app/useMediaStatus';
import styles from './styles.module.css'

const StartMockDialogue = () =>
{

    return (
        <div className={styles.container}>
            <MediaQualityCheck/>
        </div>
    )
}

export default StartMockDialogue