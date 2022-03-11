import { ReactNode } from 'react'

const LabelForm = ({ children }: { children: ReactNode }) => {
  return (
    <label className="label">
      <span className="label-text font-semibold">{children}</span>
    </label>
  )
}

export default LabelForm
