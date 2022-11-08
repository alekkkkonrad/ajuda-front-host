import React from 'react'
import styles from './ViewPedido.module.css'

//hooks
import {useParams, useNavigate} from 'react-router-dom'
import { useEffect } from 'react'

//redux
import { useDispatch, useSelector } from 'react-redux'
import { getPedidoById, deletePedido, resetMessage } from '../../slices/pedidoSlice'

//components
import CardPedido from '../../components/cardpedido/CardPedido'
import Message from '../../components/message/Message'

const ViewPedido = () => {

  const navigate = useNavigate()
  const {id} = useParams()
  const dispatch = useDispatch()
  const {pedido, message} = useSelector((state) => state.pedido)

  useEffect(() => {
    dispatch(getPedidoById(id))
  }, [dispatch, id])

  setTimeout(() => {
    dispatch(resetMessage())
  }, 3000)

  const handleDelete = (id) => {
    var bool = window.confirm("Deseja excluir o pedido?")
    if(!bool){
      return 
    }
    dispatch(deletePedido(id))
    navigate(-1)
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <CardPedido
          url={pedido.image}
          username={pedido.username}
          local={pedido.local}
          tipos={pedido.tipos}
          desc={pedido.desc}
        />
        <section className={styles.actions}>
          <button onClick={() => navigate(-1)}>Voltar</button>
          <button onClick={() => navigate(`/editpedido/${id}`)}>Editar</button>
          <button className={styles.delete} onClick={() => handleDelete(id)}>Excluir</button>
        </section>
        {message && <Message msg={message} type='success'/>}
      </div>
    </div>
  )
}

export default ViewPedido