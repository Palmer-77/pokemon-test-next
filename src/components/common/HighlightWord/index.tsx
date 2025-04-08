'use client'

import { useMemo } from 'react'

import { cn } from '@/lib/utils'

export function HighlightWord({ message, highlightClass }: { message: string; highlightClass?: string }) {
  const parts = message.split(/(“[^”]+”)/g)

  return parts.map((part, index) =>
    part.startsWith('“') && part.endsWith('”') ? (
      <span
        key={index}
        className={cn('text-t-brand font-bold', highlightClass)}
      >
        {part}
      </span>
    ) : (
      part
    ),
  )
}

interface HighlightWordProps {
  message: string
  highlightWords: string[]
  highlightClass?: string
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export function HighlightWordByWords({ message, highlightWords, highlightClass }: HighlightWordProps) {
  const escapedHighlightWords = highlightWords.map((word) => escapeRegExp(word))
  const parts = useMemo(
    () => message.split(new RegExp(`(${escapedHighlightWords.join('|')})`, 'gi')),
    [message, highlightWords],
  )

  return (
    <>
      {parts.map((part, index) =>
        highlightWords.some((word) => word.toLowerCase() === part.toLowerCase()) ? (
          <span
            key={index}
            className={cn('text-t-brand font-bold', highlightClass)}
          >
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  )
}
