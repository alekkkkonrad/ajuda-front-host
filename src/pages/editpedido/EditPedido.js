import React, { useEffect, useState } from 'react'
import styles from './EditPedido.module.css'

//hooks
import { useAuth } from '../../hooks/useAuth'

//components
import MenuPerfil from '../../components/menu/MenuPerfil'
import Message from '../../components/message/Message'

//
import { useDispatch, useSelector } from 'react-redux'
//redux
import { getPedidoById, updatePedido, resetMessage } from '../../slices/pedidoSlice'
import { useParams } from 'react-router-dom'

const EditPedido = () => {

  const {id} = useParams()
  const {auth} = useAuth()
  const dispatch = useDispatch()
  const {pedido, message, error, loading} = useSelector((state) => state.pedido)

  useEffect(() => {
    dispatch(getPedidoById(id))
  }, [dispatch, id])

  const [title, setTitle] = useState("")
  const [local, setLocal] = useState("")
  const [tipos, setTipos] = useState("")
  const [types, setTypes] = useState("")
  const [desc, setDesc] = useState("")
  const [sangue, setSangue] = useState([])

  useEffect(() => {
    setTitle(pedido.titulo)
    setLocal(pedido.local)
    setTipos(pedido.tipos)
    setDesc(pedido.desc)

  }, [pedido])

  useEffect(() => {
    if(tipos){
      setTypes(tipos.join(','))
    }
  }, [tipos])

  useEffect(() => {
    if(types){
      setSangue(types.split(','))
    }
  }, [types])

  setTimeout(() => {
    dispatch(resetMessage(message))
  }, 2000)

  const addType = (type) => {
    //limpa seleção
    if(type===''){
      setTypes(type)
    }
    //não deixa duas vezes o mesmo tipo
    if(types.includes(type)){
      console.log('idem')
      return
    }
    if(types === ""){
      setTypes(types + `${type}`)
      return
    }
    setTypes(types + `, ${type}`)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newPedido = {
      id,
      titulo: title,
      local,
      tipos: sangue,
      desc,
    }

    dispatch(updatePedido(newPedido))

    setTimeout(() => {
      dispatch(resetMessage())
    }, 2000)
  }
  return (
    <div className={styles.container}>
       {auth && (
          <>
            <MenuPerfil />
          </>
        )}
      <div className={styles.formEditPedido}>
        <h2>Edite aquilo que desejar</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Título:</span>
            <input 
              type="text"
              placeholder="Digite um título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            <span>Local:</span>
            <input 
              type="text"
              placeholder="Digite um local"
              value={local}
              onChange={(e) => setLocal(e.target.value)}
            />
          </label>
          <label>
            <span>Tipos sanguineos:</span>
            <input 
              type="text" 
              disabled
              required
              placeholder="Selecione as opçoes abaixo"
              value={types || ""}
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
          <div className={styles.submit}>
            {!loading && <button onClick={() => handleSubmit} className='btn_global'>Salvar</button>}
            {loading && <button className='btn_global' disabled="disabled">Aguarde...</button>}
          </div>
        </form>
        {error && <Message msg={error} type="error"/>}
        {message && <Message msg={message} type="success"/>}
      </div>
    </div>
  )
}

export default EditPedido