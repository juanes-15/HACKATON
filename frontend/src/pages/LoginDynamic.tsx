import { useState } from 'react'
import { api, setToken } from '@/services/api'
import { useNavigate } from 'react-router-dom'

export default function LoginDynamic(){
  const [u,setU] = useState('')
  const [p,setP] = useState('')
  const n = useNavigate()
  const [s,setS] = useState('')
  const [h,setH] = useState(false)

  const login = async ()=>{
    setH(true); setS('')
    try{
      const r = await api.post('/auth/login',{ email:u, password:p })
      const t = r.data.token
      localStorage.setItem('token',t)
      setToken(t)
      n('/dashboard')
    }catch(e:any){
      setS(e?.response?.data?.message || 'Error de autenticación')
    }finally{ setH(false) }
  }

  return (
    <div className="container py-4">
      <h3>Login Dinámico</h3>
      <form className="col-md-4" onSubmit={e=>{e.preventDefault(); login()}}>
        <input className="form-control mb-2" type="email" placeholder="Email" value={u} onChange={e=>setU(e.target.value)} required/>
        <input className="form-control mb-2" type="password" placeholder="Clave" value={p} onChange={e=>setP(e.target.value)} required/>
        <button disabled={h} className="btn btn-primary w-100" type="submit">{h?'Entrando...':'Entrar'}</button>
        {s && <div className="alert alert-danger mt-2">{s}</div>}
      </form>
    </div>
  )
}