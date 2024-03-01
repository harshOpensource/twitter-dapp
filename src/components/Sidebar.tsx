"use client";

import {
  BellIcon,
  BookmarkIcon,
  ClipboardDocumentListIcon,
  EllipsisHorizontalCircleIcon,
  EllipsisVerticalIcon,
  HashtagIcon,
  InboxIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import SidebarItem from "./sidebar-item";

type Props = {
  account: string;
  balance: string;
  connectMetamask: () => void;
  correctNetwork: boolean;
};

const Sidebar = ({
  account,
  balance,
  connectMetamask,
  correctNetwork,
}: Props) => {
  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
      <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
        <Image src="/logo.png" width={30} height={30} alt="logo" />
      </div>
      <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
        <SidebarItem text="Home" Icon={HomeIcon} active />
        <SidebarItem text="Explore" Icon={HashtagIcon} />
        <SidebarItem text="Notifications" Icon={BellIcon} />
        <SidebarItem text="Messages" Icon={InboxIcon} />
        <SidebarItem text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarItem text="Lists" Icon={ClipboardDocumentListIcon} />
        <SidebarItem text="Profile" Icon={UserIcon} />
        <SidebarItem text="More" Icon={EllipsisHorizontalCircleIcon} />
      </div>
      <button className="hidden xl:inline ml-auto bg-[#1d9bf0] text-white rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#1a8cd8]">
        Tweet
      </button>
      <div
        className="text-[#d9d9d9] flex items-center justify-center mt-auto hoverAnimation xl:ml-auto xl:-mr-5"
        onClick={() => {
          !correctNetwork && connectMetamask();
        }}
      >
        <Image
          className="mr-4"
          src="/ethereum-blue.svg"
          width={30}
          height={30}
          alt="logo avatar"
        />

        <div className="hidden xl:inline leading-5">
          <h4 className="font-bold">
            {account.length > 10 ? (
              <>
                {account.slice(0, 8)}...{account.slice(-8, -1)}
              </>
            ) : (
              <>Connect Wallet</>
            )}
          </h4>
          <p className="text-[#6e767d]">
            {correctNetwork ? <>{balance} SepoliaETH</> : <>0.00 ETH</>}
          </p>
        </div>
        <EllipsisVerticalIcon className="h-5 hidden xl:inline ml-10" />
      </div>
    </div>
  );
};

export default Sidebar;
