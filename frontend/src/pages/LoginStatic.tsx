import { useState } from 'react'
export default function LoginStatic(){
  const [u,setU] = useState('')
  const [p,setP] = useState('')
  const ok = u==='admin' && p==='admin'
  return (
    <div className="container py-4">
      <h3>Login Estático</h3>
      <form className="col-md-4" onSubmit={e=>e.preventDefault()}>
        <input className="form-control mb-2" placeholder="Usuario" value={u} onChange={e=>setU(e.target.value)}/>
        <input className="form-control mb-2" placeholder="Clave" type="password" value={p} onChange={e=>setP(e.target.value)}/>
        <button className="btn btn-primary w-100" onClick={()=>alert(ok?'Acceso permitido':'Credenciales inválidas')}>Entrar</button>
      </form>
    </div>
  )
}