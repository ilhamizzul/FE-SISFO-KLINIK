import React from 'react'
import { HiOutlineHome } from 'react-icons/hi'
import { FaRegHospital } from 'react-icons/fa'

const Sidebar = () => {
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-2" className="drawer-overlay" />
      <ul className="menu w-80 space-y-1 overflow-y-auto bg-base-200 p-4 text-base-content">
        {/* Sidebar content here */}
        <li>
          <div className="flex">
            <FaRegHospital className="text-2xl" />
            <p className="ml-2 text-xl font-bold">Sisfo Klinik</p>
          </div>
        </li>
        <li>
          <a className="active">
            <HiOutlineHome />
            Dashboard
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
