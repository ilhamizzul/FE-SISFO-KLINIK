import { ReactNode } from "react"

const Form = ({ children }: {children: ReactNode}) => {
  return <div className="form-control w-full">{children}</div>
}

export default Form

