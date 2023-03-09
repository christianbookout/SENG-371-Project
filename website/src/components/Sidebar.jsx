import { logout } from "../firebase";
import { SidebarLink } from "./SidebarLink";

export const Sidebar = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex h-full w-64 flex-col bg-blue-500">
        <div className="w-100 text-wrap flex justify-center px-4 pt-8 pb-2 text-2xl font-bold text-white">
          <a href="/">Investment Trainer</a>
        </div>
        <div className="w-100 mx-4 mb-8 h-0.5 rounded bg-white" />
        <div class="block h-full px-4 pb-2 pb-0 text-white">
          <SidebarLink text="My Stocks" link="/stocks" />
          <SidebarLink text="Buy" link="/buy" />
          <SidebarLink text="Sell" link="/sell" />
          <SidebarLink text="View Progress" link="/progress" />
          <SidebarLink text="News" link="/news" />
          <SidebarLink text="Settings" link="/settins" />
          <button
            onClick={() => logout()}
            className="w-full rounded-lg p-2 text-left text-white hover:bg-blue-400 focus:bg-blue-700"
          >
            Sign Out
          </button>
        </div>
        <div className="flex w-full self-end p-4">
          <div className="h-16 w-16 rounded-2xl bg-white text-white">hi</div>
          <div className="flex items-center px-2 text-left text-lg text-white">
            <p className="w-full">$22 907.32</p>
          </div>
        </div>
      </div>
    </div>
  );
};
