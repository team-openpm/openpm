'use client'

import {Listbox, Transition} from '@headlessui/react'
import {ChevronUpDownIcon} from '@heroicons/react/20/solid'
import React from 'react'

import {Option} from './option'

export interface SelectProps {
  label?: string
  selectedValue?: string
  onChange: (value: string) => void
  options: [value: string, label: string][]
  className?: string
}

export const Select: React.FC<SelectProps> = ({
  label,
  selectedValue,
  options,
  onChange,
  className = '',
}) => {
  const selectedOption = options.find(([value]) => value === selectedValue)
  const [, selectedLabel] = selectedOption || []

  return (
    <Listbox
      as="div"
      className={`space-y-1 ${className}`}
      value={selectedValue}
      onChange={(value: string) => onChange(value)}
    >
      {({open}) => (
        <>
          {label && (
            <Listbox.Label className="dark:text-near-white block text-2xs font-medium leading-5 text-slate-700">
              {label}
            </Listbox.Label>
          )}

          <div className="relative">
            <Listbox.Button
              className="
                relative w-full cursor-default
                rounded-md border border-pink-900/20 bg-white
                px-3 py-2 pr-10 text-left text-sm
                shadow-sm outline-none 
                transition-all
                duration-300
                focus:border-pink-300
                focus:ring focus:ring-pink-200/50
              dark:border-gray-800 dark:bg-gray-900
              dark:focus:border-pink-600 dark:focus:ring-pink-900/50
              "
            >
              <span className="block truncate">{selectedLabel}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-slate-400" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="z-popover absolute mt-1 w-full rounded-md bg-white shadow-lg"
            >
              <Listbox.Options
                static
                className="
                  max-h-60 overflow-auto rounded-md px-1
                  py-1 text-2xs leading-6
                  shadow-sm ring-1 ring-slate-900/10
                  focus:outline-none dark:bg-gray-900 dark:ring-gray-800
                "
              >
                {options.map(([value, label]) => (
                  <Option key={value} value={value} label={label} />
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
