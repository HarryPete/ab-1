import { useRouter } from 'next/navigation'
import styles from './styles.module.css'

const Button = ({text, route}) =>
{
    const router = useRouter();
    return <button className={styles.container} onClick={()=> route && router.push(route)}>{text}</button>
}

export default Button