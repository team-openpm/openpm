'use client'

import clsx from 'clsx'
import React from 'react'

interface Props {
  name?: string
  value?: string
  onChange?: (value: string) => void
  required?: boolean
  autoComplete?: string
  error?: boolean
  placeholder?: string
  className?: string
  rows?: number
}

export const TextareaInput: React.FC<Props> = ({
  name,
  value,
  onChange,
  required,
  autoComplete,
  placeholder,
  className,
  rows,
  error = false,
}) => (
  <textarea
    name={name}
    required={required}
    value={value}
    autoComplete={autoComplete}
    onChange={(event) => onChange?.(event.target.value)}
    placeholder={placeholder}
    rows={rows}
    className={clsx(
      `block w-full rounded-md border border-pink-900/20 bg-white px-3
      py-2 text-sm text-black shadow-sm outline-none
      transition-all duration-300 focus:border-pink-300
      focus:ring focus:ring-pink-200/50 dark:border-gray-800 dark:bg-gray-900
      dark:text-white dark:focus:border-pink-600 dark:focus:ring-pink-900/50`,

      error &&
        'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500',
      className,
    )}
  />
)
