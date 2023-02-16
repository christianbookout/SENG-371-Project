import { logout } from "../firebase";
import { SidebarLink } from "./SidebarLink";

export const Sidebar = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex h-screen w-64 flex-col bg-blue-500">
        <div className="w-100 text-wrap flex justify-center px-4 pt-8 pb-2 text-2xl font-bold text-white">
          <a>Investment Trainer</a>
        </div>
        <div className="w-100 mx-4 mb-8 h-0.5 rounded bg-white" />
        <div class="block px-4 pb-2 pb-0 text-white">
          <SidebarLink text="My Stocks" link="" />
          <SidebarLink text="Buy" link="" />
          <SidebarLink text="Sell" link="" />
          <SidebarLink text="View Progress" link="" />
          <SidebarLink text="News" link="" />
          <SidebarLink text="Settings" link="" />
          <button
            onClick={() => logout()}
            className="w-full rounded-lg p-2 text-left text-white hover:bg-blue-400 focus:bg-blue-700"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};
