import styles from './Home.module.css'
import frasco from '../../assets/imgs/frasco.png'

import {Link} from 'react-router-dom'

const Home = () => {
    return (
        <div className={styles.container}>
            <div className={styles.img}>
                <img src={frasco} alt="frasco"/>
            </div>
            <div className={styles.subcontainer}>
                <div className={styles.content}>
                    <p>Faça parte da 
                        <span> comunidade</span>
                    </p>
                    <p>Cadastre-se e veja as vidas que você pode salvar</p>
                </div>
                <div className={styles.action}>
                    <Link className='btn_global' to='/cadastro'>Cadastre-se</Link>
                    <Link className='btn_global' to='/login'>Entrar</Link>
                </div>
            </div>
        </div>
    )
}

export default Home