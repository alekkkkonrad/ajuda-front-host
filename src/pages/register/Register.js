import styles from './Register.module.css'
import image from '../../assets/imgs/4-vidas.png'

//components
import Message from '../../components/message/Message'

//hooks
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

//redux
import {register, reset} from "../../slices/authSlice"

const Register = () => {

    const [nome, setNome] = useState("")
    const [sobrenome, setSobrenome] = useState("")
    const [email, setEmail] = useState("")
    const [ano, setAno] = useState("")
    const [tipoSangue, setTiposangue] = useState("")
    const [celular, setCelular] = useState("")
    const [local, setLocal] = useState("")
    const [senha, setSenha] = useState("")
    const [confirmaSenha, setConfirmaSenha] = useState("")

    const tipos = [
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-"
    ]

    const dispatch = useDispatch()

    const {loading, error} = useSelector((state) => state.auth)

    const handleSubmit = (e) => {
        e.preventDefault()

        const user = {
            nome,
            sobrenome,
            email,
            ano,
            tipoSangue,
            celular,
            local,
            senha,
            confirmaSenha
        }
        dispatch(register(user))
    }

    useEffect(() => {
        dispatch(reset)
    }, [dispatch])

    return(
        <div className = {styles.container}>
            <div>
                <h2>Cadastre-se</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label>
                        <span>Nome:</span>
                        <input
                            type="text"
                            name='nome'
                            placeholder='Nome'
                            required="required"
                            onChange={(e) => setNome(e.target.value)}
                            value={nome}
                        />
                    </label>
                    <label>
                        <span>Sobrenome:</span>
                        <input
                            type="text"
                            name='sobrenome'
                            placeholder='Sobrenome'
                            required="required"
                            onChange={(e) => setSobrenome(e.target.value)}
                            value={sobrenome}
                        />
                    </label>
                    <label className={styles.row}>
                        <span>E-mail:</span>
                        <input
                            type="email"
                            name='email'
                            placeholder='E-mail'
                            required="required"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </label>
                    <label>
                        <span>Ano de nascimento:</span>
                        <input
                            type="text"
                            name="ano"
                            placeholder="Ano de nascimento"
                            required="required"
                            onChange={(e) => setAno(e.target.value)}
                            value={ano}
                        />
                    </label>
                    <label>
                        <span>Tipo sanguíneo:</span>
                        <select
                            name="sangue"
                            text="Tipo sanguineo"
                            className={styles.select}
                            onChange={(e) => setTiposangue(e.target.value)}
                        >
                            <option disabled selected>Selecione</option>
                            {
                                tipos && tipos.map(
                                    (tipo) => (<option key={tipos.indexOf(tipo)} value={tipo}>{tipo}</option>)
                                )
                            }
                        </select>
                    </label>
                    <label className={styles.row}>
                        <span>Celular:</span>
                        <input
                            className={styles.celular}
                            type="tel"
                            name="phone"
                            placeholder="Celular - ex: DD9xxxxxxxx"
                            onChange={(e) => setCelular(e.target.value)}
                            value={celular}
                        />
                    </label>
                    <label className={styles.row}>
                        <span>Localização:</span>
                        <input
                            className={styles.local}
                            type="text"
                            name="local"
                            placeholder="Localização - ex: Porto Alegre, RS"
                            onChange={(e) => setLocal(e.target.value)}
                            value={local}
                        />
                    </label>
                    <label>
                        <span>Senha:</span>
                        <input
                            type="password"
                            name="senha"
                            placeholder="Digite uma senha"
                            onChange={(e) => setSenha(e.target.value)}
                            value={senha}
                        />
                    </label>
                    <label>
                        <span>Confirmar senha:</span>
                        <input
                            type="password"
                            name="confirmasenha"
                            placeholder="Confirme sua senha"
                            onChange={(e) => setConfirmaSenha(e.target.value)}
                            value={confirmaSenha}
                        />
                    </label>
                    {!loading && <button onClick={() => handleSubmit} className='btn_global row'>Cadastrar</button>}
                    {loading && <button onClick={() => handleSubmit} className='btn_global row' disabled="disabled">Aguarde...</button>}
                    
                </form>
                {error && <Message msg={error} type="error"/>}
            </div>
        <div className={styles.img}>
            <img src={image} alt="4 vidas"/>
        </div>
    </div>
    )
}

export default Register