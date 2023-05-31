'use client'

import { api } from '@/lib/api'
import React, {
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
  useRef,
} from 'react'
import { useRouter } from 'next/navigation'
import Cookie from 'js-cookie'
import { Camera } from 'lucide-react'

export default function EditMemoryModal({
  isOpen,
  onCancel,
  onConfirm,
  memory,
}: any) {
  const router = useRouter()
  const [content, setContent] = useState(memory.content)
  const [coverUrl, setCoverUrl] = useState(memory.coverUrl)
  const [isPublic, setIsPublic] = useState(memory.isPublic)
  const [preview, setPreview] = useState<string | null>(null)
  const [hasChanged, setHasChanged] = useState(false)
  const initialFormState = useRef({
    content: memory.content,
    coverUrl: memory.coverUrl,
    isPublic: memory.isPublic,
  })

  useEffect(() => {
    setHasChanged(
      content !== initialFormState.current.content ||
        coverUrl !== initialFormState.current.coverUrl ||
        isPublic !== initialFormState.current.isPublic,
    )
  }, [content, coverUrl, isPublic])

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) {
      return
    }

    const previewURL = URL.createObjectURL(files[0])

    setPreview(previewURL)
    setCoverUrl(previewURL)
  }

  async function handleEditMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const fileToUpload = formData.get('coverUrl')

    const token = Cookie.get('token')

    try {
      const response = await api.put(
        `/memories/${memory.id}`,
        {
          coverUrl,
          content,
          isPublic: formData.get('isPublic'),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (fileToUpload) {
        const uploadFormData = new FormData()
        uploadFormData.set('file', fileToUpload)

        const uploadResponse = await api.post('/upload', uploadFormData)

        setCoverUrl(uploadResponse.data.fileUrl)
      }

      if (response.status === 200) {
        router.push(`/memories/${memory.id}`)
        router.refresh()
      } else {
        console.error('Erro ao editar a memória.')
      }
    } catch (error) {
      console.error('Ocorreu um erro na requisição: ', error)
    } finally {
      onCancel()
      router.refresh()
    }
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-10  flex items-center justify-center backdrop-blur-sm">
      <div className="mx-auto w-1/3 rounded-lg bg-gray-900 p-8">
        <h2 className="mb-4 text-xl">Editar memoria</h2>
        <form
          onSubmit={handleEditMemory}
          className="flex flex-1 flex-col gap-2"
        >
          <div className="flex items-center gap-4">
            <label
              htmlFor="media"
              className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
            >
              <Camera className="h-4 w-4" />
              Anexar mídia
            </label>

            <label
              htmlFor="isPublic"
              className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
            >
              <input
                type="checkbox"
                name="isPublic"
                id="isPublic"
                onChange={(e) => setIsPublic(e.target.checked)}
                value={isPublic}
                className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
              />
              Tornar memória pública
            </label>
          </div>

          <>
            <input
              onChange={onFileSelected}
              name="coverUrl"
              type="file"
              id="media"
              accept="image/*"
              className="invisible h-0 w-0"
            />
            {
              // eslint-disable-next-line
              <img
                src={preview || coverUrl}
                data-value={coverUrl}
                className="aspect-video rounded-lg object-cover"
                alt=""
              />
            }
          </>

          <textarea
            name="content"
            value={content}
            spellCheck={false}
            onChange={(e) => setContent(e.target.value)}
            className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
            placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
          />

          <button
            className="mr-2 rounded border border-gray-300 px-4 py-2 transition-all hover:bg-gray-300"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            type="submit"
            onClick={onConfirm}
            className={`rounded bg-green-500 px-4 py-2 text-white transition-all hover:bg-green-400 ${
              !hasChanged && 'cursor-not-allowed opacity-50'
            }`}
            disabled={!hasChanged}
          >
            Salvar
          </button>
        </form>
      </div>
    </div>
  )
}
