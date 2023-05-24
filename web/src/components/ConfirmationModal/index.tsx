import React from 'react'

export default function ConfirmationModal({
  isOpen,
  onCancel,
  onConfirm,
}: any) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center backdrop-blur-sm">
      <div className="rounded-lg bg-gray-900 p-8">
        <h2 className="mb-4 text-xl">Confirmação de exclusão</h2>
        <p>Você tem certeza que deseja excluir?</p>
        <div className="mt-8 flex justify-end">
          <button
            className="mr-2 rounded border border-gray-300 px-4 py-2 transition-all hover:bg-gray-300"
            onClick={onCancel}
          >
            Não
          </button>
          <button
            className="rounded bg-red-500 px-4 py-2 text-white transition-all hover:bg-red-400"
            onClick={onConfirm}
          >
            Sim
          </button>
        </div>
      </div>
    </div>
  )
}
