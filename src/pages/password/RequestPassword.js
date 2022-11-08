import React, { useState } from 'react'
import './Password.css'

import Message from '../../components/message/Message'
import {useDispatch} from 'react-redux'
import { requestPassword } from '../../slices/passwordSlice'

const RequestPassword = () => {

  const dispatch = useDispatch()

  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault()

    const data = {
      email,
    }
    
    dispatch(requestPassword(data))

    setTimeout(() => {
      setLoading(false)
      setMessage("E-mail enviado!!!")
    }, 2000)

    setTimeout(() => {
      setMessage("")
    }, 4000)
  }
  
  return (
    <div className="request-container">
        <form onSubmit={handleSubmit}>
          <h2>Informe seu E-mail para recuperar sua senha</h2>
            <label>
              <span>E-mail:</span>
              <input type="email" placeholder="Digite seu E-mail" required onChange={(e) => setEmail(e.target.value)}/>
            </label>
            {!loading && <button onClick={() => handleSubmit} className='btn_global'>Enviar</button>}
            {loading && <button onClick={() => handleSubmit} className='btn_global'>aguarde...</button>}
            {message && <Message type='success' msg={message}/>}
        </form>
    </div>
  )
}

export default RequestPassword