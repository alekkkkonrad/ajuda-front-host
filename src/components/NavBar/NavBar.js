import styles from './NavBar.module.css'
//icons
import { FiLogOut } from "react-icons/fi";

//router
import {NavLink, useNavigate} from 'react-router-dom'

//hooks
import {useAuth} from '../../hooks/useAuth'

import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react'
//redux
import {logout, reset} from '../../slices/authSlice'
import {profile} from '../../slices/userSlice'

const NavBar = () => {

    const {auth} = useAuth()

    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.user)
    // load user data
    useEffect(() => {
        dispatch(profile())
    }, [dispatch])

    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }
    return (
        <nav className = {styles.navbar}>
            {auth && (
                        <>
                            <NavLink to = '/pedidos' className = {styles.logo}>
                                Ajud<span>A+</span>
                            </NavLink>
                        </>
                    )
            }
            {!auth && (
                        <>
                            <NavLink to = '/' className = {styles.logo}> 
                                Ajud<span>A+</span>
                            </NavLink>
                        </>
                    )
            }
            <ul className = {styles.list}>
            {!auth ? (
                        <>
                            <li>
                                < NavLink to = '/' className = {({isActive}) => (isActive ? styles.active : "")}> 
                                    Inicio
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to = '/cadastro' className = {({isActive}) => (isActive ? styles.active : "")}>
                                    Cadastrar
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to = '/login' className = {({isActive}) => (isActive ? styles.active : "")}>
                                    Entrar
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to = '/pedidos' className = {({isActive}) => (isActive ? styles.active : "")}>
                                    Pedidos
                                </NavLink>
                            </li>
                        </>
                    ) : (
                            <>
                                <li>
                                    <NavLink to = '/pedidos' className = {({isActive}) => (isActive ? styles.active : "")}>
                                        Inicio
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={`/dashboard/${user._id}`} className = {({isActive}) => (isActive ? styles.active : "")}>
                                        Meus pedidos
                                    </NavLink>
                                </li>
                            </>
                        )
            }
            <li>
                <NavLink to = '/sobre' className = {({isActive}) => (isActive ? styles.active : "")}>
                    Sobre a doação
                </NavLink>
            </li>
            {auth && (
                        <>
                            <li>
                                <button onClick = {handleLogout} className = 'btn_global'>
                                    <FiLogOut/> Sair
                                </button>
                            </li>
                        </>
                    )
            }
            </ul>
        </nav>)
}

export default NavBar