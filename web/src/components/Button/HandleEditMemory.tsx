'use client'

import { useState } from 'react'
import { Edit3 } from 'lucide-react'

import EditMemoryModal from '../EditMemoryModal'

interface props {
  currencyMemory: {
    id: string
    content: string
    coverUrl: string
  }
}

export default function HandleEditMemory({ currencyMemory }: props) {
  const [modalOpen, setModalOpen] = useState(false)

  const handleOpenModalEditMemory = async () => {
    setModalOpen(true)
  }

  return (
    <>
      <button
        onClick={handleOpenModalEditMemory}
        className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
      >
        Editar
        <Edit3 className="h-4 w-4" />
      </button>
      <EditMemoryModal
        isOpen={modalOpen}
        onCancel={() => setModalOpen(false)}
        onConfirm={handleOpenModalEditMemory}
        memory={currencyMemory}
      />
    </>
  )
}
