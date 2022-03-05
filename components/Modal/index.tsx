const Modal = ({ children, title, id }: any) => {
  return (
    <div>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">{title}</h3>
          <div className="py-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
