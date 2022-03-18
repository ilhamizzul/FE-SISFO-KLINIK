import { HiTrash, HiOutlineClipboardList } from 'react-icons/hi'
import { FaRegHospital, FaUserInjured } from 'react-icons/fa'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ImStatsDots } from 'react-icons/im'
import { useState } from 'react'

const Sidebar = () => {
  const router = useRouter()
  const urlString = router.pathname
  const [isOPen, setIsOPen] = useState(false)
  const collapse = () => {
    setIsOPen(!isOPen)
  }
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
          <Link href={'/'} passHref>
            <a className={urlString == '/' ? 'active' : ''}>
              <ImStatsDots />
              Dashboard
            </a>
          </Link>
        </li>
        {/* <li onClick={collapse} className={isOPen ? 'bordered' : ''}> */}
        <li onClick={collapse}>
          <a>
            <FaUserInjured />
            <span>Pasien</span>
          </a>
        </li>
        <li className={isOPen ? 'ml-3 block' : 'hidden'}>
          <Link href={'/pasien'} passHref>
            <a className={urlString == '/pasien' ? 'active' : ''}>
              <HiOutlineClipboardList />
              Data Pasien
            </a>
          </Link>
        </li>
        <li className={isOPen ? 'ml-3 block' : 'hidden'}>
          <Link href={'/recycle'} passHref>
            <a className={urlString == '/recycle' ? 'active' : ''}>
              <HiTrash />
              Recycle
            </a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
