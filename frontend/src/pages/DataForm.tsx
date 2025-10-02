import { useState } from 'react'
import { api } from '@/services/api'

export default function DataForm(){
  const [n,setN] = useState('')
  const [c,setC] = useState('')
  const [m,setM] = useState<number>(0)
  const [s,setS] = useState('')
  const [h,setH] = useState(false)

  const submit = async()=>{
    setH(true); setS('')
    try{
      if(!n || !c || m<=0) throw new Error('Datos inválidos')
      const [r1,r2] = await Promise.all([
        api.post('/data/save',{ name:n, category:c, amount:m }),
        api.get('/data/ping')
      ])
      setS('Guardado '+r1.status+' • Ping '+r2.status)
    }catch(e:any){
      setS(e?.response?.data?.message || e.message || 'Error')
    }finally{ setH(false) }
  }

  return (
    <div className="container py-4">
      <h3>Formulario de ingreso</h3>
      <form className="col-md-6" onSubmit={e=>{e.preventDefault(); submit()}}>
        <input className="form-control mb-2" placeholder="Nombre" value={n} onChange={e=>setN(e.target.value)}/>
        <input className="form-control mb-2" placeholder="Categoría" value={c} onChange={e=>setC(e.target.value)}/>
        <input className="form-control mb-2" type="number" placeholder="Monto" value={m} onChange={e=>setM(parseFloat(e.target.value))}/>
        <button disabled={h} className="btn btn-primary">Enviar</button>
        {s && <div className="alert alert-info mt-2">{s}</div>}
      </form>
    </div>
  )
}