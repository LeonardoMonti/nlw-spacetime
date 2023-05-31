'use client'

import classNames from 'classnames'
import Link from 'next/link'
import { useState } from 'react'

export default function HandleToggleMemories() {
  const [selectedButton, setSelectedButton] = useState(null)

  const handleButtonClick = (buttonId: any) => {
    setSelectedButton(buttonId)
  }

  return (
    <div>
      <Link
        href="/"
        className={classNames(
          'font-alt inline-block rounded-full rounded-r-none bg-purple-600 px-5 py-3 text-sm uppercase leading-none text-black hover:bg-purple-500',
          {
            'bg-purple-500': selectedButton === 'first',
          },
        )}
        onClick={() => handleButtonClick('first')}
      >
        Minhas Lembranças
      </Link>
      <Link
        href="/"
        className={classNames(
          'font-alt inline-block rounded-full rounded-l-none bg-purple-600 px-5 py-3 text-sm uppercase leading-none text-black hover:bg-purple-500',
          {
            'bg-purple-500': selectedButton === 'second',
          },
        )}
        onClick={() => handleButtonClick('second')}
      >
        Todas Lembranças
      </Link>
    </div>
  )
}
