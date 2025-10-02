import { Router } from 'express'
import { db } from '../db'
const r = Router()

r.get('/ping', (_,res)=> res.json({ ok:true }))

r.post('/save', (req,res)=>{
  try{
    const { name, category, amount } = req.body
    if(!name || !category || !Number.isFinite(amount) || amount<=0)
      return res.status(400).json({ message:'Datos inválidos' })
    const userId = (req as any).user?.sub || 'anon'
    db.data.push({ id: Date.now().toString(), name, category, amount, user:userId })
    res.status(201).json({ ok:true })
  }catch{
    res.status(500).json({ message:'Error' })
  }
})

export default r