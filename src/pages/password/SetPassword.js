import React, { useState } from 'react'
import Message from '../../components/message/Message'
import { useDispatch } from 'react-redux'
import { setPassword } from '../../slices/passwordSlice'
import { useNavigate } from 'react-router-dom'

const SetPassword = () => {

  const dispatch = useDispatch()

  const [email, setEmail] = useState("")
  const [token, setToken] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmaSenha, setConfirmaSenha] = useState("")

  const [message, setMessage] = useState("")
  const [type, setType] = useState("")

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    setLoading(true)

    if(senha.length < 6){
      setType("error")
      setMessage("A senha deve ter no minimo 6 caracteres.")
      return
    }
    if(senha !== confirmaSenha){
      setType("error")
      setMessage("As senhas devem ser iguais.")
      return
    }

    const data = {
      email,
      token,
      senha
    }

    dispatch(setPassword(data))
    setType("success")
    setMessage("Senha atualizada com sucesso!!!")

    setTimeout(() => {
      setMessage("")
      setType("")
      setLoading(false)
      navigate("/login")
    }, 2000)
  }

  return (
    <div className="request-container">
        <form onSubmit={handleSubmit}>
          <h2>Preencha os campos com seu E-mail, token enviado e sua nova senha</h2>
            <label>
              <span>E-mail:</span>
              <input type="email" placeholder="Digite seu E-mail" required onChange={(e) => setEmail(e.target.value)}/>
            </label>
            <label>
              <span>Token:</span>
              <input type="text" placeholder="Digite seu token" required onChange={(e) => setToken(e.target.value)}/>
            </label>
            <label>
              <span>Senha:</span>
              <input type="password" placeholder="Digite sua nova senha" required onChange={(e) => setSenha(e.target.value)}/>
            </label>
            <label>
              <span>Confirma senha:</span>
              <input type="password" placeholder="Confirme sua senha" required onChange={(e) => setConfirmaSenha(e.target.value)}/>
            </label>
            {!loading && <button onClick={() => handleSubmit} className='btn_global'>Enviar</button>}
            {loading && <button onClick={() => handleSubmit} className='btn_global' disabled>Aguarde...</button>}
            {message && <Message type={type} msg={message}/>}
        </form>
    </div>
  )
}

export default SetPassword