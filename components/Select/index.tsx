const Select = ({ children, ...rest }:any) => {
  return (
    <select className="select select-bordered select-sm" {...rest}>
      {children}
    </select>
  )
}

export default Select
