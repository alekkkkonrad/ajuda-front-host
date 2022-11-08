import styles from './Login.module.css'
import img from '../../assets/imgs/log.png'

//components
import Message from '../../components/message/Message'

//hooks
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
//redux
import {login, reset} from '../../slices/authSlice'

const Login = () => {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const dispatch = useDispatch()
    const {loading, error} = useSelector((state) => state.auth)

    const handleSubmit = (e) => {
        e.preventDefault()

        const user = {
            email,
            senha
        }
        dispatch(login(user))
    }

    //clean all of states
    useEffect(() => {
        dispatch(reset())
    }, [dispatch])

    return (
        <div className={styles.container_Log}>
           <div className={styles.img_Log}>
                <img src={img} alt="bg"/>
           </div>
            <form onSubmit={handleSubmit} className={styles.form_Log}>
                <label>
                    <span>Email:</span>
                        <input
                            type="email"
                            placeholder="Digite seu E-mail"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                </label>
                    <label>
                        <span>Senha:</span>
                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            onChange={(e) => setSenha(e.target.value)}
                            value={senha}
                        />
                </label>
                {!loading && <button onClick={() => handleSubmit} className='btn_global'>Entrar</button>}
                {loading && <button onClick={() => handleSubmit} className='btn_global' disabled="disabled">Aguarde...</button>}
                <Link to="/recupera">Esqueceu a senha?</Link>
                {error && <Message msg={error} type="error"/>}
            </form>
        </div>
    )
}

export default Login