'use client'

import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'
import { Pokemon } from '@/modules/pokemon/services/pokemon'

interface PokemonFormData {
  name: string
  type: string[]
  height: string
  weight: string
  weaknesses: string[]
  img: string
}

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  handleSubmit: (data: Omit<Pokemon, 'id'>) => void
  initialData?: Omit<Pokemon, 'id'>
  mode?: 'create' | 'update'
}

export default function ModalCreatePokemon({ handleSubmit, isOpen = false, onClose, initialData, mode = 'create' }: ModalProps) {
  const [formData, setFormData] = useState<PokemonFormData>({
    name: '',
    type: [],
    height: '',
    weight: '',
    weaknesses: [],
    img: ''
  })

  useEffect(() => {
    if (initialData && mode === 'update') {
      setFormData({
        name: initialData.name,
        type: initialData.type,
        height: initialData.height,
        weight: initialData.weight,
        weaknesses: initialData.weaknesses,
        img: initialData.img
      })
    } else {
      setFormData({
        name: '',
        type: [],
        height: '',
        weight: '',
        weaknesses: [],
        img: ''
      })
    }
  }, [isOpen, initialData, mode])

  const handleChange = (field: keyof PokemonFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData(prev => ({
      ...prev,
      [field]: field === 'type' || field === 'weaknesses'
        ? value.split(',').map(item => item.trim())
        : value
    }))
  }

  const isFormValid = formData.name && formData.type.length && formData.height && formData.weight && formData.weaknesses.length && formData.img

  const handleFormSubmit = () => {
    handleSubmit({
      ...formData,
      num: '',
      candy: '',
      egg: '',
      multipliers: null,
      spawn_chance: 0,
      avg_spawns: 0,
      spawn_time: '',
    })
  }

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{mode === 'create' ? 'สร้างโปเกมอนใหม่' : 'แก้ไขโปเกมอน'}</AlertDialogTitle>
          <AlertDialogDescription>
            กรอกข้อมูลโปเกมอนที่ต้องการ{mode === 'create' ? 'สร้าง' : 'แก้ไข'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">ชื่อโปเกมอน</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleChange('name')}
              placeholder="เช่น Pikachu"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="type">ประเภท</Label>
            <Input
              id="type"
              value={formData.type.join(', ')}
              onChange={handleChange('type')}
              placeholder="เช่น Electric, Fire (คั่นด้วยเครื่องหมาย ,)"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="height">ความสูง</Label>
            <Input
              id="height"
              value={formData.height}
              onChange={handleChange('height')}
              placeholder="เช่น 0.4 m"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="weight">น้ำหนัก</Label>
            <Input
              id="weight"
              value={formData.weight}
              onChange={handleChange('weight')}
              placeholder="เช่น 6.0 kg"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="weaknesses">จุดอ่อน</Label>
            <Input
              id="weaknesses"
              value={formData.weaknesses.join(', ')}
              onChange={handleChange('weaknesses')}
              placeholder="เช่น Ground, Rock (คั่นด้วยเครื่องหมาย ,)"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="img">ลิงค์รูปภาพ</Label>
            <Input
              id="img"
              value={formData.img}
              onChange={handleChange('img')}
              placeholder="ใส่ลิงค์รูปภาพของโปเกมอน"
            />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>ยกเลิก</AlertDialogCancel>
          <AlertDialogAction disabled={!isFormValid} onClick={handleFormSubmit}>
            {mode === 'create' ? 'สร้าง' : 'บันทึก'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}