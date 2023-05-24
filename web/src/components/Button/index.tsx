'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { Trash2 } from 'lucide-react'

import Cookie from 'js-cookie'
import ConfirmationModal from '../ConfirmationModal'

interface props {
  id: string
}

export default function Button({ id }: props) {
  const [deleting, setDeleting] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const router = useRouter()

  const token = Cookie.get('token')

  const handleDeleteMemory = async () => {
    setModalOpen(true)

    if (modalOpen) {
      setDeleting(true)

      try {
        const response = await api.delete(`/memories/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.status === 200) {
          router.push('/')
        } else {
          console.error('Erro ao deletar a memória.')
        }
      } catch (error) {
        console.error('Ocorreu um erro na requisição: ', error)
      } finally {
        setDeleting(false)
      }
    }
  }
  return (
    <>
      <button
        onClick={handleDeleteMemory}
        disabled={deleting}
        className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
      >
        Excluir
        <Trash2 className="h-4 w-4" />
      </button>
      <ConfirmationModal
        isOpen={modalOpen}
        onCancel={() => setModalOpen(false)}
        onConfirm={handleDeleteMemory}
      />
    </>
  )
}
