import { HiMenu } from 'react-icons/hi'

const Navbar = () => {
  return (
    <div className="navbar rounded-md mb-4 bg-base-100 px-4 shadow-md">
      <div className="navbar-start">
        <div className="block lg:hidden">
          <label className="btn btn-circle btn-ghost" htmlFor="my-drawer-2">
            <HiMenu className="h-5 w-5" />
          </label>
        </div>
        <div className="hidden lg:block">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered input-sm w-full max-w-xs"
          />
        </div>
      </div>
      <div className="navbar-center">
        <div className="block lg:hidden">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered input-sm w-full max-w-xs"
          />
        </div>
      </div>
      <div className="navbar-end">
        <div className="flex items-center justify-start space-x-1">
          <div className="avatar btn btn-circle btn-ghost">
            <div className="w-10 rounded-full">
              <img src="https://api.lorem.space/image/face?hash=33791" />
            </div>
          </div>
          <span className="font-semibold hidden lg:block">Admin</span>
        </div>
      </div>
    </div>
  )
}

export default Navbar
