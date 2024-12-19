import Link from "next/link";
import {
  ArrowLeftOnRectangleIcon,
  ClockIcon,
  CogIcon,
  CubeIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

const Sidebar = ({ isOpen, isMobile, setIsOpen }) => {
  return (
    <>
      {/* Background Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white shadow-md transition-transform duration-300 z-40 ${
          isMobile
            ? isOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0"
        } w-[200px] md:w-[250px]`}
      >
        {/* Header */}
        <h2 className="text-[30px] md:text-[35px] text-center font-russo text-[#205FFF] font-[600] md:mt-[20px]">
          Posify
        </h2>
        <p className="text-[14px] md:text-[18px] text-center font-[500] text-[#747474] mb-[50px] hidden md:block">
          Your POS assistant
        </p>

        {/* Links */}
        <div className="mt-4">
          <SidebarLink href="/history-page" Icon={ClockIcon} label="History" />
          <SidebarLink href="/product-page" Icon={CubeIcon} label="Product" />
          <SidebarLink
            href="/cashier-page"
            Icon={ShoppingCartIcon}
            label="Cashier"
          />
          <SidebarLink href="/settings-page" Icon={CogIcon} label="Settings" />
        </div>

        {/* Logout Button */}
        <div className="absolute bottom-[80px] md:bottom-[40px] left-0 w-full">
          <Link href="/">
            <button className="flex items-center justify-center md:ml-[15px] md:py-[12px] md:px-[40px] py-[10px] px-[15px] ml-[15px] text-[14px] text-white bg-[#000000] hover:bg-gray-800 rounded-lg transition-all duration-300">
              <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-[5px]" />
              Log Out
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

const SidebarLink = ({ href, Icon, label }) => (
  <Link
    href={href}
    className="flex items-center text-[16px] md:text-[18px] mb-[10px] px-[15px] py-[10px] text-[#575757] font-[500] hover:text-white hover:bg-[#205FFF] hover:w-[90%] hover:ml-[5%] rounded-lg transition-all duration-300"
  >
    <Icon className="h-5 md:h-6 w-5 md:w-6 mr-[8px]" />
    {label}
  </Link>
);

export default Sidebar;
