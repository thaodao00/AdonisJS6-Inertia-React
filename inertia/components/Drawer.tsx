import { Button, Drawer, Sidebar, TextInput } from 'flowbite-react'
import { useState } from 'react'
import {
  HiChartPie,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
  HiLogin,
  HiPencil,
  HiSearch,
  HiShoppingBag,
  HiUsers,
  HiArrowSmRight,
  HiInbox,
  HiTable,
  HiUser,
  HiViewBoards,
} from 'react-icons/hi'
import { IoIosMenu } from 'react-icons/io'
export function DrawerComponent() {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => setIsOpen(false)

  return (
    <div className="z-40 ">
      {/* Hiển thị button trên mobile */}
      <div className="fixed h-[70px] md:hidden">
        <Button onClick={() => setIsOpen(true)} className="bg-slate-50 m-3">
          <IoIosMenu color="#000" size={25} />
        </Button>
      </div>

      {/* Drawer cho mobile */}
      <div className="md:hidden">
        <Drawer open={isOpen} onClose={handleClose}>
          <Drawer.Header title="MENU" titleIcon={() => <></>} />
          <Drawer.Items>
            <Sidebar
              aria-label="Sidebar with multi-level dropdown example"
              className="[&>div]:bg-transparent [&>div]:p-0"
            >
              <div className="flex h-full flex-col justify-between py-2">
                <div>
                  <form className="pb-3 md:hidden">
                    <TextInput
                      icon={HiSearch}
                      type="search"
                      placeholder="Search"
                      required
                      size={32}
                    />
                  </form>
                  <Sidebar.Items>
                    <Sidebar.ItemGroup>
                      <Sidebar.Item href="/admin" icon={HiChartPie}>
                        Dashboard
                      </Sidebar.Item>
                      <Sidebar.Item href="/admin/categories" icon={HiShoppingBag}>
                        Category
                      </Sidebar.Item>
                      <Sidebar.Item href="/admin/product" icon={HiShoppingBag}>
                        Products
                      </Sidebar.Item>
                      <Sidebar.Item href="/admin/users" icon={HiUsers}>
                        Users list
                      </Sidebar.Item>
                      <Sidebar.Item href="/logout" icon={HiLogin}>
                        Logout
                      </Sidebar.Item>
                    </Sidebar.ItemGroup>
                  </Sidebar.Items>
                </div>
              </div>
            </Sidebar>
          </Drawer.Items>
        </Drawer>
      </div>

      {/* Sidebar cho desktop */}
      <div className="hidden md:block fixed top-0 left-0 bottom-0 border border-r-2">
        <Sidebar aria-label="Default sidebar example">
          <div className="">
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Sidebar.Item href="/admin" icon={HiChartPie}>
                  Dashboard
                </Sidebar.Item>

                <Sidebar.Item href="/admin/users" icon={HiUser}>
                  Users List
                </Sidebar.Item>
                <Sidebar.Item href="/admin/categories" icon={HiShoppingBag}>
                  Categories
                </Sidebar.Item>
                <Sidebar.Item href="/admin/product" icon={HiShoppingBag}>
                  Products
                </Sidebar.Item>
                <Sidebar.Item href="/logout" icon={HiArrowSmRight}>
                  Logout
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </div>
        </Sidebar>
      </div>
    </div>
  )
}
