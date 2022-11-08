import React from 'react'
import styles from './Search.module.css'

//components
import CardPedido from '../../components/cardpedido/CardPedido'

//hooks
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useQuery } from '../../hooks/useQuery'
import { useNavigate } from 'react-router-dom'

//redux
import { searchByLocal } from '../../slices/pedidoSlice'

const Search = () => {

  const navigate = useNavigate()
  const query = useQuery()
  const search = query.get('q')

  const dispatch = useDispatch()
  const {pedidos} = useSelector((state) => state.pedido)

  //load pedidos
  useEffect(() => {
    dispatch(searchByLocal(search))
  }, [dispatch, search])

  return (
    <div className={styles.container}>
        <div className={styles.pedidos}>
          {pedidos && 
          pedidos.map((pedido) => (
            <CardPedido
              key={pedido._id}
              url={pedido.image}
              username={pedido.username}
              local={pedido.local}
              tipos={pedido.tipos}
              desc={pedido.desc}
            />
          ))}
        </div>
          {pedidos.length === 0 && (
            <div className={styles.none}>
              <p>Nenhum resultado encontrado</p>
              <button className='btn_global'onClick={() => navigate(-1)}>Voltar</button>
            </div>
          )}
    </div>
  )
}

export default Search