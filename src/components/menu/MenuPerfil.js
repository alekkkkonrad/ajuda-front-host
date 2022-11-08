import React from 'react'
import './MenuPerfil.css'
import { uploads } from '../../utils/config';
//ICONS
import { FiLogOut } from "react-icons/fi";
import { BsFillPencilFill, BsClipboardPlus } from "react-icons/bs";
import { MdDashboardCustomize } from "react-icons/md";

//ROUTER
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom'
//hooks
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react';
//redux
import {logout, reset} from '../../slices/authSlice'
import {profile} from '../../slices/userSlice'

const MenuPerfil = () => {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset())
    console.log("deslog")
    navigate('/')
  }

  const {user} = useSelector((state) => state.user)
  
  //load user data
  useEffect(() => {
    dispatch(profile())
  }, [dispatch])

  const dataAtual = new Date();
  const anoAtual = dataAtual.getFullYear();
  const idade = anoAtual - user.ano;

  return (
    <div className="hamburger-menu">
        <input id="menu__toggle" type="checkbox"/>
        <label className="menu__btn" htmlFor="menu__toggle">
            <span></span>
        </label>
      <div className="menu__box">
        <div className='menu_box_container'>
          <div className='menu_box_content'>
            <div className='menu_box_content_img'>
              <img
                src={`${uploads}/users/${user.profileImage}`}
                alt="perfil"
              />
              </div>
              <div className='menu_box_content_user'>
                <p>{user.nome}</p>
                  <div className='menu_box_content_user_sub'>
                    <p><span>{user.local}</span></p> -
                    <p>{idade} anos</p> -
                    <p>{user.tipoSangue}</p>
                  </div>
                    <p className='email'>{user.email}</p>
                  </div>
              <div className='menu_box_content_actions'>
                <Link to="/profile"><BsFillPencilFill/> Editar perfil</Link>
                <Link to="/novopedido"><BsClipboardPlus/> Realizar pedido</Link>
                <Link to={`/dashboard/${user._id}`}><MdDashboardCustomize/> Meus pedidos</Link>
                <button className='btn_global' onClick={handleLogout}><FiLogOut/> Sair</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default MenuPerfil