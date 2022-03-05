import { ChangeEvent, ReactNode } from 'react'

type SelectProps = {
  children: ReactNode
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

const Select = ({ children, onChange, ...rest }: SelectProps) => {
  return (
    <select
      className="select select-bordered select-sm"
      onChange={onChange}
      {...rest}
    >
      {children}
    </select>
  )
}

export default Select
