'use client'

import {Listbox} from '@headlessui/react'
import clsx from 'clsx'
import React from 'react'

export interface OptionProps {
  label: string
  value: string
}

export const Option: React.FC<OptionProps> = ({label, value}) => (
  <Listbox.Option key={value} value={value}>
    {({selected, active}) => (
      <div
        className={clsx(
          selected
            ? 'text-pink-400 dark:text-pink-400'
            : 'text-slate-900 dark:text-white',
          active ? 'bg-pink-900/5 dark:bg-white/3 dark:text-white' : '',
          `relative cursor-pointer select-none rounded-md px-3 py-2 text-sm leading-none`,
        )}
        title={label}
      >
        <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>
          {label}
        </span>
      </div>
    )}
  </Listbox.Option>
)
