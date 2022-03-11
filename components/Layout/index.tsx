import { ReactNode } from "react"
import Navbar from "../Navbar"
import Sidebar from "../Sidebar"

const Layout = ({children}: {children: ReactNode}) => {
  return (
    <div className="drawer-mobile drawer h-screen w-full">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col p-4">
        <Navbar />
        {children}
      </div>
      <Sidebar />
    </div>
  )
}

export default Layout