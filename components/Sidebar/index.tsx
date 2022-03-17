import { HiTrash } from 'react-icons/hi'
import { FaRegHospital, FaUserInjured } from 'react-icons/fa'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ImStatsDots } from 'react-icons/im'

const Sidebar = () => {
  const router = useRouter()
  const urlString = router.pathname

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
        <li>
          <Link href={'/pasien'} passHref>
            <a className={urlString == '/pasien' ? 'active' : ''}>
              <FaUserInjured />
              Data Pasien
            </a>
          </Link>
        </li>
        <li>
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
