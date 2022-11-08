import styles from './NovoPedido.module.css'

//components
import Message from '../../components/message/Message'
import MenuPerfil from '../../components/menu/MenuPerfil'

//hooks
import { useState, useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { useAuth } from '../../hooks/useAuth'

//redux
import {profile} from '../../slices/userSlice'
import { publishPedido, resetMessage } from '../../slices/pedidoSlice'

const NovoPedido = () => {

  const {auth} = useAuth()

  // load user data
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.user)
  
  useEffect(() => {
    dispatch(profile())
  }, [dispatch])

  const {
    loading: loadingPedido, 
    message: messagePedido, 
    error: errorPedido
  } = useSelector((state) => state.pedido)

  //states form
  const [titulo, setTitulo] = useState("")
  const [local, setLocal] = useState("")
  const [sangue, setSangue] = useState([])
  const [desc, setDesc] = useState("")

  //states pedido user
  const [username, setUserName] = useState("")
  const [image, setImage] = useState("")
  const [userId, setUserId] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    setUserName(user.nome)
    setImage(user.profileImage)
    setUserId(user._id)
    setEmail(user.email)
  }, [user])

  //aux
  const [tipos, setTipos] = useState("")
  useEffect(() => {
    setSangue(tipos.split(','))
  }, [tipos])

  const handleSubmit = (e) => {
    e.preventDefault()

    const pedidoData = {
      email,
      titulo,
      username,
      image,
      userId,
      local,
      tipos: [],
      desc,
    }

    //build data
    pedidoData.titulo = titulo
    pedidoData.local = local
    pedidoData.tipos = sangue
    pedidoData.desc = desc

    console.log(pedidoData)

    //slice
    dispatch(publishPedido(pedidoData))

    setTitulo("")
    setLocal("")
    setTipos("")
    setDesc("")

    setTimeout(() => {
      dispatch(resetMessage())
    }, 2000)
  }

  const addType = (type) => {
    //limpa seleção
    if(type===''){
      setTipos(type)
    }
    //não deixa duas vezes o mesmo tipo
    if(tipos.includes(type)){
      return
    }
    if(tipos === ""){
      setTipos(tipos + `${type}`)
      return
    }
    setTipos(tipos + `, ${type}`)
  }

  return (
    <div className={styles.container}>
      {auth && (
        <>
          <MenuPerfil />
        </>
      )}
      <div className={styles.new_pedido}>
        <h2>Preencha o formulário e poste o seu pedido</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            <span>Título:</span>
            <input
              type="text"
              placeholder='Digite um título'
              required
              onChange={(e) => setTitulo(e.target.value)}
              value={titulo}
            />
          </label>
          <label>
            <span>Local da doação:</span>
            <input
              type="text"
              required
              placeholder='Digite o local de doação'
              onChange={(e) => setLocal(e.target.value)}
              value={local}
            />
          </label>
          <label>
            <span>Tipos sanguineos:</span>
            <input 
              type="text" 
              disabled
              required
              value={tipos} 
              placeholder="Selecione as opçoes abaixo"
            />
            <div className={styles.actions}>
              <input type="button" onClick={() => addType('A+')} value="A+"/>
              <input type="button" onClick={() => addType('A-')} value="A-"/>
              <input type="button" onClick={() => addType('B+')} value="B+"/>
              <input type="button" onClick={() => addType('B-')} value="B-"/>
              <input type="button" onClick={() => addType('AB+')} value="AB+"/>
              <input type="button" onClick={() => addType('AB-')} value="AB-"/>
              <input type="button" onClick={() => addType('O+')} value="O+"/>
              <input type="button" onClick={() => addType('O-')} value="O-"/>
              <input type="button" onClick={() => addType('')} value="Limpar seleção"/>
            </div>
          </label>
          <label>
            <span>Descrição:</span>
            <textarea
              cols="30"
              rows="10"
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            ></textarea>
          </label>
          {!loadingPedido && <button onClick={() => handleSubmit} className='btn_global'>Realizar pedido</button>}
          {loadingPedido && <button className='btn_global' disabled="disabled">Aguarde...</button>}
        </form>
        {errorPedido && <Message msg={errorPedido} type="error"/>}
        {messagePedido && <Message msg={messagePedido} type="success"/>}
      </div>
    </div>
  )
}

export default NovoPedido