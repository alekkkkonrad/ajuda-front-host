import styles from './EditProfile.module.css'

import { uploads } from '../../utils/config'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { useAuth } from '../../hooks/useAuth'

import {profile, resetMessage, updateProfile} from '../../slices/userSlice'

import Message from '../../components/message/Message'
import MenuPerfil from '../../components/menu/MenuPerfil'

const EditProfile = () => {

    const dispatch = useDispatch()
    const {user, message, loading, error} = useSelector((state) => state.user)
    const {auth} = useAuth()

    //states
    const [nome, setNome] = useState("")
    const [sobrenome, setSobrenome] = useState("")
    const [profileImage, setProfileImage] = useState("")
    const [tipoSangue, setTiposangue] = useState("")
    const [celular, setCelular] = useState("")
    const [local, setLocal] = useState("")
    const [senhaNova, setSenhaNova] = useState("")
    const [confirmaSenha, setConfirmaSenha] = useState("")

    const [previewImage, setPreviewImage] = useState("")

    // load user data
    useEffect(() => {
        dispatch(profile())
    }, [dispatch])

    //fill form with user data
    useEffect(() => {
        if(user){
            setNome(user.nome)
            setSobrenome(user.sobrenome)
            setTiposangue(user.tipoSangue)
            setCelular(user.celular)
            setLocal(user.local)
        }
    }, [user])

    const [trocarSenha, setTrocarSenha] = useState(false)

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

    const handleSubmit = async(e) => {
        e.preventDefault()

        const userData = {
            nome,
        }
        if(profileImage){
            userData.profileImage = profileImage
        }
        if(sobrenome){
            userData.sobrenome = sobrenome
        }
        if(tipoSangue){
            userData.tipoSangue = tipoSangue
        }
        if(celular){
            userData.celular = celular
        }
        if(local){
            userData.local = local
        }

        if(senhaNova){
            if(senhaNova !== confirmaSenha){
                return window.alert('As senhas não coincidem!!!')
            }
            userData.senha = senhaNova
        }

        const formData = new FormData()
        const userFormData = Object.keys(userData).forEach((key) => formData.append(key, userData[key]))
        formData.append('user', userFormData)

        await dispatch(updateProfile(formData))

        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)
    }
    const handleFile = (e) => {
        // image preview
        const image = e.target.files[0]
        setPreviewImage(image)

        //update
        setProfileImage(image)
    }

    const toggleTrocarSenha = (e) => {
        e.preventDefault()
        setTrocarSenha(!trocarSenha)
        if(!trocarSenha){
            setSenhaNova("")
            setConfirmaSenha("")
        }
    }

  return (
    <div className={styles.container_Edit}>
        {auth && (
        <>
          <MenuPerfil />
        </>
      )}
        <div className={styles.header}>
            <h2>Edite seu perfil</h2>
            <p className={styles.subtitle}>Adicione uma foto e altere o que quiser!</p>
        </div>
        <div className={styles.img_Edit}>
            {(user.profileImage || previewImage) && (
                <img
                    className={styles.image_Edit}
                    src={
                        previewImage ? URL.createObjectURL(previewImage) : `${uploads}/users/${user.profileImage}`
                    }
                    alt={user.nome}
                />
            )}
        </div>
            <div className={styles.content_form}>
                <form onSubmit={handleSubmit} encType="multipart/form-data" className={styles.form_Edit}>
                    <label>
                        <span>Nome:</span>
                        <input
                            type="text"
                            placeholder='Digite seu nome'
                            onChange={(e) => setNome(e.target.value)}
                            value={nome || ""}
                        />
                    </label>
                    <label>
                        <span>Sobrenome:</span>
                        <input
                            type="text"
                            placeholder='Digite seu sobrenome'
                            onChange={(e) => setSobrenome(e.target.value)}
                            value={sobrenome || ""}
                        />
                    </label>
                    <div className={styles.upload}>
                        <label>
                            <span>Imagem do perfil:</span>
                            <input
                                type="file"
                                onChange={handleFile}
                            />
                        </label>
                    </div>
                    <div className={styles.tipo}>
                        <label>
                            <span>Tipo sanguíneo:</span>
                            <select
                                name="sangue"
                                text="Tipo sanguineo"
                                onChange={(e) => setTiposangue(e.target.value)}
                                value={tipoSangue || ""}
                            >
                                <option disabled>Selecione uma opção</option>
                                    {
                                        tipos && tipos.map(
                                            (tipo) => (<option key={tipos.indexOf(tipo)} value={tipo}>{tipo}</option>)
                                        )
                                    }
                            </select>
                        </label>
                    </div>
                   <label>
                        <span>Celular:</span>
                        <input
                            type="text"
                            placeholder='Digite seu celular'
                            onChange={(e) => setCelular(e.target.value)}
                            value={celular || ""}
                        />
                   </label>
                   <label>
                        <span>Localização:</span>
                        <input
                            type="text"
                            placeholder='Digite sua localização'
                            onChange={(e) => setLocal(e.target.value)}
                            value={local || ""}
                        />
                   </label>
                   {trocarSenha && (
                        <>
                            <label>
                                <span>Senha:</span>
                                <input
                                    type="password"
                                    placeholder="Digite a nova senha"
                                    onChange={(e) => setSenhaNova(e.target.value)}
                                    value={senhaNova || ""}
                                />
                            </label>
                            <label>
                                <span>Nova senha:</span>
                                <input
                                    type="password"
                                    placeholder="Confirme a senha"
                                    onChange={(e) => setConfirmaSenha(e.target.value)}
                                    value={confirmaSenha || ""}
                                />
                            </label>
                        </>
                    )}
                    <div className={styles.actions}>
                        <div className={styles.trade}>
                            {!trocarSenha ? <p>Clique no botão abaixo para alterar sua senha</p> : <p>Clique no botão para cancelar</p>}
                            <button onClick={toggleTrocarSenha}>{!trocarSenha ? "Trocar senha" : "Fechar"}</button>
                        </div>
                    </div>
                    {!loading && <button onClick={() => handleSubmit} className='btn_global'>Atualizar</button>}
                    {loading && <button className='btn_global' disabled="disabled">Aguarde...</button>}
                    {error && <Message msg={error} type='error'/>}
                    {message && <Message msg={message} type="success"/>}
                </form>
            </div>
    </div>
  )
}

export default EditProfile