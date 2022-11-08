import styles from './Pedidos.module.css'

//components
import CardPedido from '../../components/cardpedido/CardPedido'
import MenuPerfil from '../../components/menu/MenuPerfil'
import { BsClipboardPlus } from "react-icons/bs";
import {AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai'
import FormSearch from '../../components/formsearch/FormSearch';
import Buttons from '../../components/buttons/Buttons'

//hooks
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom' 
import { useAuth } from '../../hooks/useAuth'

//redux
import { getAllPedidos, makeContact } from '../../slices/pedidoSlice';
import { profile } from '../../slices/userSlice'

const Pedidos = () => {

  const [skip, setSkip] = useState(0)
  const {auth} = useAuth()
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const {pedidos, loading} = useSelector((state) => state.pedido)
  const {user} = useSelector((state) => state.user)

  useEffect(() => {
    navigate(`/pedidos?q=${skip}`)
  }, [navigate, skip])

  //load all pedidos
  useEffect(() => {
    dispatch(getAllPedidos(skip))
  }, [dispatch, skip])
  
  //load user data
  useEffect(() => {
    dispatch(profile())
  }, [dispatch])


  if(loading){
    return <p>Carregando...</p>
  }

  const handleSearchByLocal = (query) => {
    if(!query){
      return
    }
    return navigate(`/search?q=${query}`)
  }
  const handleSearchByType = (query) => {
    if(!query){
      return
    }
    return navigate(`/search?q=${query}`)
  }

  //make contact between users
  const handleContact = (email) => {
    if(email === user.email){
      window.alert('Não é possivel realizar contato consigo mesmo!!!')
      return
    }

    const data = {
      destino: email,
      origem: user.email
    }

    let bool = window.confirm('Deseja realmente entrar em contato?')
    if(!bool){
      return
    }
    dispatch(makeContact(data))
    window.alert('E-mail enviado!!!')
  }

  const handlePlus = () => {
    setSkip(skip+100)
  }
  const handleMines = () => {
    if(skip === 0){
      return
    }
    setSkip(skip-100)
  }

  
  return (
    <>
    {!auth && (
      <>
        <header className={styles.headerOut}>
          <div className={styles.teste}>
            <FormSearch 
              handle={handleSearchByLocal}
            />
            <div className={styles.types}>
              <Buttons 
                handle={handleSearchByType}
              />
            </div>
          </div>
          <Link to='/login' className='btn_global'><BsClipboardPlus/> Novo pedido</Link>
        </header>
      </>
    )}
    {auth && (
      <>
        <header className={styles.header}>
          <div className={styles.menu}>
            <MenuPerfil />
          </div>
          <div className={styles.teste}>
            <FormSearch 
              handle={handleSearchByLocal}
            />
            <div className={styles.types}>
              <Buttons 
                handle={handleSearchByType}
              />
            </div>
          </div>
          <div className={styles.link}>
            <Link to='/novopedido' className='btn_global'><BsClipboardPlus/> Novo pedido</Link>
          </div>
        </header>
      </>
    )}
    <div className={styles.container}>
      {pedidos.length === 0 && (
              <div className={styles.none}>
                <p>Nenhum pedido a mostra</p>
                <button className='btn_global'onClick={() => navigate("/novopedido")}>Realizar pedido</button>
              </div>
      )}
      <div className={styles.pedidos}>
        {pedidos && 
          pedidos.map((pedido) => (
            <CardPedido
              key={pedido._id}
              id={pedido.userId}
              email={pedido.email}
              url={pedido.image}
              username={pedido.username}
              local={pedido.local}
              tipos={pedido.tipos}
              desc={pedido.desc}
              contact={handleContact}
            />
          ))}
      </div>
      {pedidos.length > 50 && (
        <footer className={styles.footer}>
          <button onClick={handleMines}>
              <AiOutlineMinus />
          </button>
          <button onClick={handlePlus}>
              <AiOutlinePlus />
          </button>
        </footer>
      )}
    </div>
  </>
  )
}
export default Pedidos