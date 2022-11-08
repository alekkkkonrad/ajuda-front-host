import styles from './Footer.module.css'
import { Link } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'

const Footer = () => {

  const {auth} = useAuth()

  return (
    <footer className={styles.footer_container}>
      <div className={styles.footer}>
      {!auth && (
        <>
          <h3>Cadastre-se e salve vidas</h3>
          <Link className='btn_global 'to='/cadastro'>Cadastre-se</Link>
        </>
      )}
      {auth && (
        <>
          <Link className='btn_global 'to='/novopedido'>Novo Pedido</Link>
        </>
      )}
        <p>© 2022 · <span>AjudA+</span> - Todos os direitos reservados</p>
        </div>
    </footer>
  )
}

export default Footer