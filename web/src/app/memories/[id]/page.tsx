import { api } from '@/lib/api'
import dayjs from 'dayjs'
import { ArrowLeft } from 'lucide-react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

import HandleDeleteMemory from '@/components/Button/HandleDeleteMemory'
import HandleEditMemory from '@/components/Button/HandleEditMemory'
import { EmptyMemories } from '@/components/EmptyMemories'

interface Params {
  params: {
    id: string
  }
}

interface Memory {
  id: string
  coverUrl: string
  content: string
  createdAt: string
}

export default async function MemoryDetailsPage({ params: { id } }: Params) {
  const isAuthenticated = cookies().has('token')

  if (!isAuthenticated) {
    return <EmptyMemories />
  }

  const token = cookies().get('token')?.value

  const response = await api.get(`/memories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memory: Memory = response.data

  return (
    <div key={memory.id} className="space-y-5 p-8">
      <Image
        src={memory.coverUrl}
        width={592}
        height={280}
        alt=""
        className="aspect-video w-full rounded-lg object-cover"
      />
      <time className="flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
        {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
      </time>
      <p className="text-lg leading-relaxed text-gray-100">{memory.content}</p>

      <hr />

      <div className="flex items-center justify-around text-gray-100">
        <Link
          href={`/`}
          className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
        >
          Voltar
          <ArrowLeft className="h-4 w-4" />
        </Link>

        <HandleEditMemory currencyMemory={memory} />
        <HandleDeleteMemory id={memory.id} />
      </div>
    </div>
  )
}
