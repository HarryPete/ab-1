import { doLogout } from "@/app/action"
import styles from './styles.module.css' 

const Logout = () => {
  return (
    <form action={doLogout}>
        <button className={styles.logout} type="submit">Logout</button>
    </form>
  )
}

export default Logout