import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Menu(){
  const n = useNavigate();
  const [t, setT] = useState<string|null>(null);
  useEffect(()=>{ setT(localStorage.getItem('token')) },[])

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">SistemaWeb-IS</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link to="/" className="nav-link">Inicio</Link></li>
            <li className="nav-item"><Link to="/form" className="nav-link">Formulario</Link></li>
            <li className="nav-item"><a className="nav-link" href="#lineas">Líneas</a></li>
          </ul>
          <div className="d-flex gap-2">
            {t ? (<>
              <Link className="btn btn-outline-light" to="/dashboard">Dashboard</Link>
              <button className="btn btn-danger" onClick={()=>{localStorage.removeItem('token'); n('/')}}>Salir</button>
            </>) : (<>
              <Link className="btn btn-outline-light" to="/login-static">Login Estático</Link>
              <Link className="btn btn-primary" to="/login">Login Dinámico</Link>
              <Link className="btn btn-success" to="/register">Registro</Link>
            </>)}
          </div>
        </div>
      </div>
    </nav>
  )
}