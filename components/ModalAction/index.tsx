import { ReactNode } from "react"

const ModalAction = ({ children }: {children: ReactNode}) => {
  return (
    <div className="modal-action">
      {children}
    </div>
  )
}

export default ModalAction
