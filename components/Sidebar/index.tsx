import { HiTrash, HiOutlineClipboardList } from 'react-icons/hi'
import {
  FaRegHospital,
  FaUserInjured,
  FaBriefcaseMedical,
} from 'react-icons/fa'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ImStatsDots } from 'react-icons/im'
import { useSelector, useDispatch } from 'react-redux'
import { changeSidebar, selectSidebarValue } from '../../redux/sidebarSlice'

const Sidebar = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const urlString = router.pathname
  const sidebarValue = useSelector(selectSidebarValue)

  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-2" className="drawer-overlay" />
      <ul className="menu w-80 space-y-1 overflow-y-auto bg-base-200 p-4 text-base-content">
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
        <li
          onClick={() => {
            dispatch(
              changeSidebar({
                pasien: !sidebarValue.pasien,
                obat: sidebarValue.obat,
              })
            )
          }}
        >
          <a>
            <FaUserInjured />
            <span>Pasien</span>
          </a>
        </li>
        <div
          className={
            sidebarValue.pasien ||
            urlString == '/pasien' ||
            urlString == '/recycle'
              ? 'block'
              : 'hidden'
          }
        >
          <li className={'ml-3'}>
            <Link href={'/pasien'} passHref>
              <a className={urlString == '/pasien' ? 'active' : ''}>
                <HiOutlineClipboardList />
                Data Pasien
              </a>
            </Link>
          </li>
          <li className={'ml-3'}>
            <Link href={'/recycle'} passHref>
              <a className={urlString == '/recycle' ? 'active' : ''}>
                <HiTrash />
                Recycle
              </a>
            </Link>
          </li>
        </div>
        <li
          onClick={() => {
            dispatch(
              changeSidebar({
                pasien: sidebarValue.pasien,
                obat: !sidebarValue.obat,
              })
            )
          }}
        >
          <a>
            <FaBriefcaseMedical />
            <span>Obat</span>
          </a>
        </li>
        <div
          className={
            sidebarValue.obat || urlString == '/obat' ? 'block' : 'hidden'
          }
        >
          <li className={'ml-3'}>
            <Link href={'/pasien'} passHref>
              <a className={urlString == '/pasien' ? 'active' : ''}>
                <HiOutlineClipboardList />
                Data Obat
              </a>
            </Link>
          </li>
        </div>
      </ul>
    </div>
  )
}

export default Sidebar
