import Link from 'next/link';
import { ClockIcon, CogIcon, CubeIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

const Sidebar = ({ isOpen, isMobile }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-white shadow-md transition-transform duration-300 z-40 ${
        isMobile
          ? isOpen
            ? 'translate-x-0'
            : '-translate-x-full'
          : 'translate-x-0'
      } w-[300px] md:w-[250px]`}
    >
      <h2 className="text-[35px] text-center font-russo text-[#205FFF] font-[600]">tePOS</h2>
      <p className="text-[18px] text-center font-[500] text-[#747474] mb-[50px] hidden md:block">Your POS assistant</p>
      <div className="mt-4">
        <Link
          href=""
          className="flex items-center text-[18px] mb-[5px] px-[15px] py-[8px] text-[#575757] hover:text-white hover:bg-[#205FFF] rounded transition-all duration-300"
        >
          <ClockIcon className="h-6 w-6 mr-[8px]" />
          History
        </Link>
        <Link
          href="/product-page"
          className="flex items-center text-[18px] mb-[5px] px-[15px] py-[8px] text-[#575757] hover:text-white hover:bg-[#205FFF] rounded transition-all duration-300"
        >
          <CubeIcon className="h-6 w-6 mr-[8px]" />
          Product
        </Link>
        <Link
          href=""
          className="flex items-center text-[18px] mb-[5px] px-[15px] py-[8px] text-[#575757] hover:text-white hover:bg-[#205FFF] rounded transition-all duration-300"
        >
          <ShoppingCartIcon className="h-6 w-6 mr-[8px]" />
          Cashier
        </Link>
        <Link
          href="/settings-page"
          className="flex items-center text-[18px] mb-[5px] px-[15px] py-[8px] text-[#575757] hover:text-white hover:bg-[#205FFF] rounded transition-all duration-300"
        >
          <CogIcon className="h-6 w-6 mr-[8px]" />
          Settings
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
