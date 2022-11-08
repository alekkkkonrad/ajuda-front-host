import './index.css'
import './App.css'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

//hooks
import { useAuth } from './hooks/useAuth'

//pages
import Home from './pages/home/Home'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import Pedidos from './pages/pedidos/Pedidos'
import About from './pages/about/About'
import Dashboard from './pages/dashboard/Dashboard'
import NovoPedido from './pages/novopedido/NovoPedido'
import ViewPedido from './pages/viewpedido/ViewPedido'
import EditPedido from './pages/editpedido/EditPedido'
import RequestPassword from './pages/password/RequestPassword'
import SetPassword from './pages/password/SetPassword'

//components
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer'
import EditProfile from './pages/editprofile/EditProfile'
import Search from './pages/search/Search'

function App() {

  const {auth, loading} = useAuth()

  if(loading){
    return <p>Carregando</p>
  }
  
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="container">
          <Routes>
            <Route exact path='/' element={!auth ? <Home/> : <Navigate to="/"/>}/>
            <Route path='/cadastro' element={!auth ? <Register/> : <Navigate to="/pedidos"/>}/>
            <Route path='/login' element={!auth ? <Login/> : <Navigate to="/pedidos"/>}/>
            <Route path='/pedidos' element={<Pedidos />}/>
            <Route path='/sobre' element={<About />}/>
            <Route path='/novopedido' element={auth ? <NovoPedido/> : <Navigate to="/"/>}/>
            <Route path='/profile' element={auth ? <EditProfile/> : <Navigate to="/"/>}/>
            <Route path='/search' element={<Search />}/>
            <Route path='/recupera' element={<RequestPassword />}/>
            <Route path='/reseta' element={<SetPassword />}/>
            <Route path='/dashboard/:id' element={auth ? <Dashboard/> : <Navigate to="/"/>}/>
            <Route path='/pedido/:id' element={auth ? <ViewPedido/> : <Navigate to="/"/>}/>
            <Route path='/editpedido/:id' element={auth ? <EditPedido/> : <Navigate to="/"/>}/>
            <Route path='*' element={auth ? <Pedidos/> : <Home />}/>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
