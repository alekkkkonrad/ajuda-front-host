import styles from './CardPedido.module.css'
import { AiFillPhone } from "react-icons/ai";
import { useAuth } from '../../hooks/useAuth'
import { Link } from 'react-router-dom';
import { uploads } from '../../utils/config';

const CardPedido = ({id, email, url, username, local, tipos, desc, contact}) => {

    const {auth} = useAuth()

    const handleContact = () => {
        contact(email)
    }

  return (
    <div className={styles.card}>
        <div className={styles.user_info}>
            <img src={`${uploads}/users/${url}`} alt="perfil img" />
        </div>
        <div className={styles.primary}>
            <span>{username}</span>
            <span>{local}</span>
        </div>
        <p className={styles.tipos}>
            {tipos && tipos.map((tipo, index) => (
                <span key={index}>{tipo}</span>
            ))}
        </p>
        <div className={styles.textarea}>
            <div>
                {desc}
            </div>
        </div>
        <div className={styles.btn}>
            {auth && (<button onClick={handleContact}><AiFillPhone/>Entrar em contato</button>)}
            {!auth && (<Link to="/login"><AiFillPhone/>Entrar em contato</Link>)}
        </div>
    </div>
  )
}

export default CardPedido