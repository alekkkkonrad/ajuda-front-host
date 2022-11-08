import styles from './Dashboard.module.css'
import {Link, useParams} from 'react-router-dom'
import Message from '../../components/message/Message'

import { useSelector, useDispatch} from 'react-redux'
import {getUserPedidos, deletePedido} from '../../slices/pedidoSlice'
import { useEffect } from 'react'
import { resetMessage } from '../../slices/pedidoSlice'
import { useAuth } from '../../hooks/useAuth'
import MenuPerfil from '../../components/menu/MenuPerfil'
import { BsClipboardPlus } from "react-icons/bs";

const Dashboard = () => {

  const {id} = useParams()
  const dispatch = useDispatch()
  const {auth} = useAuth()

  const {
    pedidos,
    loading,
    message,
  } = useSelector((state) => state.pedido)

  useEffect(() => {
    dispatch(getUserPedidos(id))
  }, [dispatch, id])

  const handleDelete = (id) => {
    var bool = window.confirm("Deseja excluir o pedido?")
    if(!bool){
      return 
    }
    dispatch(deletePedido(id))
  }
  setTimeout(() => {
    dispatch(resetMessage())
  }, 3000)

  return (
    <>
      <div className={styles.container}>
      {auth && (
        <>
          <MenuPerfil />
        </>
      )}
        <div className={styles.content}>
        {message && <Message msg={message} type='success'/>}
          <div className={styles.pedidos_header}>
            <span>Pedidos</span>
            <span>Ações</span>
          </div>
          {!loading && pedidos.length === 0 && (
            <div className={styles.nopedidos}>
              <p>Você ainda não realizou nenhum pedido.</p>
              <Link to='/novopedido' className='btn_global'><BsClipboardPlus/> Novo pedido</Link>
            </div>
          )}
          {!loading && pedidos && pedidos.map((pedido) => (
            <>
              <div key={pedido._id} className={styles.pedido_row}>
                <p>Pedido: {pedido.titulo}</p>
                <div className={styles.actions}>
                  <Link to={`/pedido/${pedido._id}`} className=''>Ver</Link>
                  <Link to={`/editpedido/${pedido._id}`}>Editar</Link>
                  <button className="btn_global" onClick={() => handleDelete(pedido._id)}>
                    Excluir
                  </button>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  )
}

export default Dashboard